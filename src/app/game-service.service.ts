import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from './types/game.type';
import { Observable, filter, from, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  authService = inject(AuthService);
  firestore = inject(Firestore);
  router = inject(Router);
  gamesColl = collection(this.firestore, 'games');
  gamesPlayersColl = collection(this.firestore, 'games_players');

  getMyCurrentGame(): Observable<Game> {
    const me = this.authService.currentUserSig()!;

    return collectionData(this.gamesPlayersColl).pipe(
      map((records) => {
        return (records as Array<{ playerId: string; gameId: string }>)
          .filter((record) => record.playerId === me.id)
          .at(-1);
      }),
      filter((record) => !!record),
      mergeMap((record) => {
        const promise = getDoc(
          doc(this.firestore, `games/${record!.gameId}`)
        ).then((snap) => snap.data());

        return from(promise);
      })
    ) as Observable<Game>;
  }

  createGame(): Promise<void | boolean> {
    const me = this.authService.currentUserSig();

    if (!me) {
      return this.router.navigateByUrl('/login');
    }

    const game: Game = {
      host: me.id,
      code: this.genCode(),
      activePlayer: me.id,
      activeIncoming: '',
      activeReplies: [],
      turn: 0,
      players: [
        {
          score: 0,
          replies: [],
          id: me.id,
        },
      ],
    };

    return addDoc(this.gamesColl, game)
      .then((ref) => {
        const gameId = ref.id;
        const playerId = me.id;

        return addDoc(this.gamesPlayersColl, {
          gameId,
          playerId,
          host: true,
        });
      })
      .then(() => {});
  }

  private genCode(): string {
    return crypto.randomUUID().substring(0, 6);
  }
}
