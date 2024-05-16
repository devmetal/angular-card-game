import { Incoming } from './incoming.interface';

export interface Game {
  code: string;
  host: string;
  incoming: Incoming | null;
  started: boolean;
}
