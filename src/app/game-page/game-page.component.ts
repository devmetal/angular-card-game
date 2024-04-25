import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { AnswersComponent } from '../answers/answers.component';
import { FirebaseGameService } from '../firebase-game.service';
import { AuthService } from '../auth.service';
import { GameComponent } from '../game/game.component';
import { FirestoreGame } from '../types/firestore-game.type';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [ProjectCardComponent, AnswersComponent, GameComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent implements OnInit {
  gameService = inject(FirebaseGameService);
  authService = inject(AuthService);

  myGame$ = this.gameService.getMyCurrentGame();

  myGameSig = signal<FirestoreGame | null | undefined>(undefined);

  imHostSig = computed(
    () => this.myGameSig()?.host === this.authService.currentUserSig()?.id
  );

  gameStarted = computed(() => this.myGameSig()?.turn ?? 0 >= 0);

  loadingSig = computed(() => this.myGameSig() === undefined);

  ngOnInit(): void {
    this.myGame$.subscribe((game) => {
      console.log(game);
      this.myGameSig.set(game);
    });
  }

  onStartGame() {
    this.gameService.startGame(this.myGameSig()!);
  }
}
