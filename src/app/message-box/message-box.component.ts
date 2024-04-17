import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [NgClass],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.css',
})
export class MessageBoxComponent {
  @Input({ required: true }) message = '';
  @Input({ required: true }) incoming = false;
}
