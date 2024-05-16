import { Injectable, computed, inject, signal } from '@angular/core';
import { Game } from './types/game.interface';
import { AuthService } from './auth.service';
import { Incoming } from './types/incoming.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  authService = inject(AuthService);

  game = signal<Game | null>(null);

  #games: Array<Game> = [
    {
      code: '123456',
      host: 'unknow',
      incoming: null,
      started: true,
    },
    {
      code: '123457',
      host: 'unknow',
      incoming: null,
      started: true,
    },
    {
      code: '123458',
      host: 'unknow',
      incoming: null,
      started: true,
    },
  ];

  #incoming: Array<Incoming> = [
    {
      id: '1',
      text: 'message 1',
    },
    {
      id: '2',
      text: 'message 2',
    },
  ];

  hostedByMe = computed(() => {
    const me = this.authService.currentUserSig()!;
    const game = this.game();
    return game && game.host === me.id;
  });

  createGame() {
    const me = this.authService.currentUserSig()!;

    const game: Game = {
      code: this.#genCode(),
      host: me.id,
      incoming: null,
      started: false,
    };

    this.#games.push(game);
    this.game.set(game);
  }

  joinGame(code: string) {
    this.game.set(this.#games.find((game) => game.code === code) ?? null);
  }

  startGame() {
    const game = this.game();
    if (game) {
      game.started = true;
      game.incoming = this.#incoming[0];
    }
  }

  #genCode(): string {
    return crypto.randomUUID().substring(0, 6);
  }
}
