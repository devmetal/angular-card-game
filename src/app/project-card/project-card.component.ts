import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { MessageComponent } from '../message/message.component';
import {
  matArrowBackRound,
  matSupervisedUserCircleRound,
  matPhoneForwardedRound,
  matVideocamRound,
  matInfoRound,
  matFavoriteRound,
} from '@ng-icons/material-icons/round';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgIconComponent, MessageComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
  viewProviders: [
    provideIcons({
      matArrowBackRound,
      matSupervisedUserCircleRound,
      matPhoneForwardedRound,
      matVideocamRound,
      matInfoRound,
      matFavoriteRound,
    }),
  ],
})
export class ProjectCardComponent {}
