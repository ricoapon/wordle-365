import {Component, Input} from '@angular/core';
import {GameLetter} from "../../backend/game";
import {LetterState} from "../letter-state";

@Component({
  selector: 'app-word-letter',
  standalone: true,
  imports: [],
  templateUrl: './word-letter.component.html',
  styleUrl: './word-letter.component.css'
})
export class WordLetterComponent {
  @Input() gameLetter: GameLetter;

  determineCssClass(): String {
    switch(this.gameLetter.state) {
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
