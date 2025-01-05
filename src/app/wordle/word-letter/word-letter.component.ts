import {Component, Input} from '@angular/core';
import {GameLetter} from "../../backend/game";
import {LetterState} from "../letter-state";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-word-letter',
  standalone: true,
  imports: [ ],
  templateUrl: './word-letter.component.html',
  styleUrl: './word-letter.component.css',
  animations: [
    trigger('textChange', [
      transition('* => empty', [
        animate('0ms ease-in')
      ]),
      transition('* => *', [
        animate('300ms ease-in', keyframes([
          style({ transform: 'scale(0)', offset: 0 }),
          style({ transform: 'scale(1.25)', offset: 0.5 }),
          style({ transform: 'scale(1)', offset: 1 }),
        ]))
      ]),
    ])
  ]
})
export class WordLetterComponent {
  @Input() gameLetter: GameLetter;

  determineCssClass(): String {
    switch (this.gameLetter.state) {
      case LetterState.ALMOST_CORRECT:
        return 'almost-correct';
      case LetterState.CORRECT:
        return 'correct';
      case LetterState.INCORRECT:
        return 'incorrect';
      default:
        return '';
    }
  }
}
