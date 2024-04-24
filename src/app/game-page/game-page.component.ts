import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { AnswersComponent } from '../answers/answers.component';
import { GameService } from '../game-service.service';
import { Game } from '../types/game.type';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [ProjectCardComponent, AnswersComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent implements OnInit {
  gameService = inject(GameService);
  authService = inject(AuthService);

  myGame$ = this.gameService.getMyCurrentGame();

  myGameSig = signal<Game | null | undefined>(undefined);

  imHostSig = computed(
    () => this.myGameSig()?.host === this.authService.currentUserSig()?.id
  );

  ngOnInit(): void {
    this.myGame$.subscribe((game) => {
      console.log(game);
      this.myGameSig.set(game);
    });
  }
}
