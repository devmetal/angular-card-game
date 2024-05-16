import { Game } from './game.interface';
import { Reply } from './reply.interface';

export type Player = {
  replies: Array<Reply>;
  selected: Reply | null;
  game: Game;
};
