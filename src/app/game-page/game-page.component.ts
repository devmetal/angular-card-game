import { Component } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { AnswersComponent } from '../answers/answers.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [ProjectCardComponent, AnswersComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent {}
