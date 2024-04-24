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
import {
  Observable,
  filter,
  last,
  from,
  mergeMap,
  map,
  concatMap,
  tap,
  takeLast,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  authService = inject(AuthService);
  firestore = inject(Firestore);
  router = inject(Router);
  gamesColl = collection(this.firestore, 'games');
  gamesPlayersColl = collection(this.firestore, 'games_players');

  getMyCurrentGame(): Observable<Game | undefined> {
    const me = this.authService.currentUserSig()!;

    return collectionData(this.gamesColl).pipe(
      map((records) => {
        return (records as Game[])
          .filter((record) => {
            return record.players.some((player) => player.id === me.id);
          })
          .at(-1);
      })
    );
  }

  createGame(): Promise<void> {
    const me = this.authService.currentUserSig()!;

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
