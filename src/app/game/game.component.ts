import { Component, Input } from '@angular/core';
import { Game } from '../types/game.type';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  @Input({ required: true }) game!: Game;
}
