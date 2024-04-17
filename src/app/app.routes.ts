import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { GamePageComponent } from './game-page/game-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'game', component: GamePageComponent },
];
