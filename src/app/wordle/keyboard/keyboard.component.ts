import {Component, EventEmitter, Input, Output} from '@angular/core';
import {KeyboardKeyComponent} from "../keyboard-key/keyboard-key.component";
import {NgForOf} from "@angular/common";
import {Game} from "../../backend/game";

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [
    KeyboardKeyComponent,
    NgForOf
  ],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent {
  @Input() game: Game;
  @Output() pressedKey: EventEmitter<String> = new EventEmitter();

  getLetterStateFor(c: String) {
    return this.game.determineStateOfLetterInAlphabet(c);
  }
}
