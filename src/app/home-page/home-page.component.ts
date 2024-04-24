import { Component, inject } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matLoginRound } from '@ng-icons/material-icons/round';
import { GameService } from '../game-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProjectCardComponent, NgIcon],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  viewProviders: [
    provideIcons({
      matLoginRound,
    }),
  ],
})
export class HomePageComponent {
  gameService = inject(GameService);
  router = inject(Router);

  onCreateGame() {
    this.gameService.createGame().then(() => {
      this.router.navigateByUrl('/game');
    });
  }
}
