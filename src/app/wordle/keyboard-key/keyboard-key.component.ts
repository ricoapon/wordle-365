import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LetterState} from "../letter-state";

@Component({
  selector: 'app-keyboard-key',
  standalone: true,
  imports: [],
  templateUrl: './keyboard-key.component.html',
  styleUrl: './keyboard-key.component.css'
})
export class KeyboardKeyComponent {
  @Input() key: String;
  @Input() letterState: LetterState;
  @Output() pressed: EventEmitter<String> = new EventEmitter();

  determineCssClass(): String {
    switch(this.letterState) {
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
