import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'game', component: GamePageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
