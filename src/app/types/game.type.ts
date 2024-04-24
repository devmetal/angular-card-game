import { Player } from './player.type';

export type Game = {
  code: string;
  players: Array<Player>;
  activePlayer: string;
  activeIncoming: string;
  activeReplies: Array<{
    player: string;
    reply: string;
  }>;
  turn: number;
  host: string;
};
