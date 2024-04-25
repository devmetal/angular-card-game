import { Injectable, computed, inject, signal } from '@angular/core';
import { Game } from './types/game.type';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  authService = inject(AuthService);

  myCurrentGameSig = signal<Game | null>(null);

  imTheHostSig = computed(() => {
    const game = this.myCurrentGameSig();
    const me = this.authService.currentUserSig();

    if (!game || !me) {
      return false;
    }

    return game.host === me.id;
  });

  setMyCurrentGame(game: Game) {
    this.myCurrentGameSig.set(game);
  }
}
