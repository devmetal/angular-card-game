import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matSupervisedUserCircleOutline } from '@ng-icons/material-icons/outline';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass, NgIconComponent, MessageBoxComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
  viewProviders: [
    provideIcons({
      matSupervisedUserCircleOutline,
    }),
  ],
})
export class MessageComponent {
  @Input({ required: true }) incoming = true;
  @Input({ required: true }) message = '';
}
