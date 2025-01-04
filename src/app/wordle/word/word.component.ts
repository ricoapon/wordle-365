import {Component, Input} from '@angular/core';
import {WordLetterComponent} from "../word-letter/word-letter.component";
import {NgForOf} from "@angular/common";
import {GameLetter} from "../../backend/game";

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
  @Input() word: GameLetter[];
}
