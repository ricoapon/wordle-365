import {AfterViewInit, Component, Input} from '@angular/core';
import {GameLetter} from "../../backend/game";
import {LetterState} from "../letter-state";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

function createTransitionWithColor(state: LetterState, color: string): any {
  return transition('* => ' + state, [
    animate('500ms ease-in', keyframes([
      style({transform: 'rotateY(0)', offset: 0}),
      style({transform: 'rotateY(90deg)', offset: 0.5}),
      style({transform: 'rotateY(0)', offset: 1, backgroundColor: color, borderColor: color}),
    ]))
  ])
}

@Component({
  selector: 'app-word-letter',
  standalone: true,
  imports: [],
  templateUrl: './word-letter.component.html',
  styleUrl: './word-letter.component.css',
  animations: [
    trigger('textChange', [
      transition('* => empty', [
        animate('0ms ease-in')
      ]),
      transition('* => *', [
        animate('300ms ease-in', keyframes([
          style({transform: 'scale(0)', offset: 0}),
          style({transform: 'scale(1.25)', offset: 0.5}),
          style({transform: 'scale(1)', offset: 1}),
        ]))
      ]),
    ]),
    trigger('stateChange', [
      state(String(LetterState.CORRECT), style({backgroundColor: "#538d4e", borderColor: "#538d4e"})),
      state(String(LetterState.ALMOST_CORRECT), style({backgroundColor: "#b59f3b", borderColor: "#b59f3b"})),
      state(String(LetterState.INCORRECT), style({backgroundColor: "#3a3a3c", borderColor: "#3a3a3c"})),

      createTransitionWithColor(LetterState.CORRECT, "#538d4e"),
      createTransitionWithColor(LetterState.ALMOST_CORRECT, "#b59f3b"),
      createTransitionWithColor(LetterState.INCORRECT, "#3a3a3c"),
    ])
  ]
})
export class WordLetterComponent implements AfterViewInit {
  @Input() gameLetter: GameLetter;

  // Make sure that animations only start after the page is loaded.
  animationDisabled: boolean = true;

  ngAfterViewInit(): void {
    this.animationDisabled = false;
  }
}
