import { Component } from '@angular/core';
import {KeyboardKeyComponent} from "../keyboard-key/keyboard-key.component";
import {NgForOf} from "@angular/common";

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

}
