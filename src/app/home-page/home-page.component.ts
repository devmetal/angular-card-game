import { Component } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matLoginRound } from '@ng-icons/material-icons/round';

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
export class HomePageComponent {}
