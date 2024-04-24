import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from './types/game.type';
import { Observable, map } from 'rxjs';
import { FirestoreGame } from './types/firestore-game.type';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  authService = inject(AuthService);
  firestore = inject(Firestore);
  router = inject(Router);
  gamesColl = collection(this.firestore, 'games');
  gamesPlayersColl = collection(this.firestore, 'games_players');

  getMyCurrentGame(): Observable<FirestoreGame | null> {
    const me = this.authService.currentUserSig()!;

    return collectionData(this.gamesColl, { idField: 'id' }).pipe(
      map((records) => {
        return (
          (records as FirestoreGame[])
            .filter((record) => {
              return record.players.some((player) => player.id === me.id);
            })
            .at(-1) ?? null
        );
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

  startGame(game: FirestoreGame): Promise<void> {
    return updateDoc(doc(this.firestore, `games/${game.id}`), { turn: 1 });
  }

  private genCode(): string {
    return crypto.randomUUID().substring(0, 6);
  }
}
