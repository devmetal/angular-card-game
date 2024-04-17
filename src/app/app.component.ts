import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectCardComponent } from './project-card/project-card.component';
import { AnswersComponent } from './answers/answers.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProjectCardComponent, AnswersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'project-cards';
}
