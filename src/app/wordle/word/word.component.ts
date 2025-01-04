import {Component, Input} from '@angular/core';
import {WordLetterComponent} from "../word-letter/word-letter.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-word',
  standalone: true,
  imports: [
    WordLetterComponent,
    NgForOf
  ],
  templateUrl: './word.component.html',
  styleUrl: './word.component.css'
})
export class WordComponent {
  @Input() word: String;

  letters(): String[] {
    const letters = this.word.split('');
    // We need to make sure that we always have exactly 5 letters on the screen.
    // So we fill the arrays with empty strings until we have 5 total values.
    while (letters.length < 5) {
      letters.push('');
    }

    return letters;
  }
}
