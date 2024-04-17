import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectCardComponent } from './project-card/project-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProjectCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'project-cards';
}
