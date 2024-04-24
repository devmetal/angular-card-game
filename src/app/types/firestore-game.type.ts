import { Game } from './game.type';

export type FirestoreGame = Game & {
  id: string;
};
