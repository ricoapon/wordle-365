import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-word-letter',
  standalone: true,
  imports: [],
  templateUrl: './word-letter.component.html',
  styleUrl: './word-letter.component.css'
})
export class WordLetterComponent {
  @Input() letter: String;
}
