import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Firestore, addDoc, collection, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from './types/game.type';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  authService = inject(AuthService);
  firestore = inject(Firestore);
  router = inject(Router);
  gamesColl = collection(this.firestore, 'games');
  gamesPlayersColl = collection(this.firestore, 'games_players');

  createGame(): Promise<void | boolean> {
    const me = this.authService.currentUserSig();

    if (!me) {
      return this.router.navigateByUrl('/login');
    }

    const game: Game = {
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
