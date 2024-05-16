import { Injectable, computed, inject, signal } from '@angular/core';
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
import { Game } from './types/game.interface';
import { Observable, map } from 'rxjs';

type GamesAndPlayers = {
  gameId: string;
  playerId: string;
};

@Injectable({
  providedIn: 'root',
})
export class FirebaseGameService {
  authService = inject(AuthService);
  firestore = inject(Firestore);
  router = inject(Router);

  gamesCollection = collection(this.firestore, 'games');
  gamesPlayersCollection = collection(this.firestore, 'games_players');

  game$ = this.getMyCurrentGame();

  gameSig = signal<Game | null | undefined>(undefined);

  getMyCurrentGame(): Observable<Game | null> {
    const me = this.authService.currentUserSig()!;

    return collectionData(this.gamesPlayersCollection, { idField: 'id' }).pipe(
      map((records) => {
        return (
          records
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

    return addDoc(this.gamesCollection, game)
      .then((ref) => {
        const gameId = ref.id;
        const playerId = me.id;

        return addDoc(this.gamesPlayersCollection, {
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
