import { Component } from '@angular/core';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [MessageBoxComponent],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.css',
})
export class AnswersComponent {
  replies: string[] = [
    "I'd love to, but my bed has a strict one-person policy.",
    "I'm practicing my interpretive dance moves. Maybe next time?",
    "I'd join you, but my couch has already claimed dibs on my evening.",
    "I'm busy perfecting my pillow fort architecture. Rain check?",
    "I'm currently busy negotiating peace between my couch cushions.",
    "I'm in the middle of a very important staring contest with my ceiling.",
    "I'm in the middle of a heated debate with my microwave. Can't leave now.",
    'I have a hot date... with my bed and a tub of ice cream.',
  ];
}
