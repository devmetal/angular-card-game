import { Component, OnInit, computed, inject } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { AnswersComponent } from '../answers/answers.component';
import { AuthService } from '../auth.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [ProjectCardComponent, AnswersComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent implements OnInit {
  authService = inject(AuthService);
  gameService = inject(GameService);

  ngOnInit(): void {}

  game = computed(() => this.gameService.game());

  hostedByMe = computed(() => this.gameService.hostedByMe() === true);

  gameIsReady = computed(() => this.game() !== null);

  gameStarted = computed(() => this.game()?.started === true);

  onStartGame() {
    this.gameService.startGame();
  }
}
