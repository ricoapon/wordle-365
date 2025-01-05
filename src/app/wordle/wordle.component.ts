import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {KeyboardComponent} from "./keyboard/keyboard.component";
import {WordComponent} from "./word/word.component";
import {NgForOf, NgIf} from "@angular/common";
import {Game, GameLetter} from "../backend/game";
import {StorageService} from "../backend/storage-service";
import {DateUtilService} from "../backend/date-util-service";
import {AnswerGeneratorService} from "../backend/answer-generator-service";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {TranslationService} from "../backend/translation-service";
import {LetterState} from "./letter-state";

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [
    RouterLink,
    KeyboardComponent,
    WordComponent,
    NgForOf,
    NgbToast,
    NgIf,
  ],
  templateUrl: './wordle.component.html',
  styleUrl: './wordle.component.css'
})
export class WordleComponent implements OnInit {
  protected date: String;
  protected game: Game;
  protected toasts: String[]

  constructor(private route: ActivatedRoute,
              private storageService: StorageService,
              private dateUtilService: DateUtilService,
              private answerGeneratorService: AnswerGeneratorService,
              private translationService: TranslationService) {
  }

  ngOnInit() {
    this.toasts = []

    const dateParam = this.route.snapshot.queryParams['date'];
    if (dateParam) {
      this.date = dateParam;
    } else {
      this.date = this.dateUtilService.convertDateToIsoFormatString(new Date());
    }

    let wordleSingleDay = this.storageService.getForDate(this.date);
    if (wordleSingleDay == undefined) {
      wordleSingleDay = {
        date: this.date,
        answer: this.answerGeneratorService.next(),
        guessedWords: [],
      }
      this.storageService.addOrOverwrite(wordleSingleDay);
    }

    this.game = new Game(wordleSingleDay, this.storageService);
    this.game.errorMessage.subscribe((message) => this.toasts.push(message))
  }

  pressKey(value: String) {
    if (value == "Enter") {
      this.game.finalizeGuess();
      return;
    }
    if (value == "Del") {
      this.game.deleteLastLetter();
      return;
    }

    this.game.addLetter(value);
  }

  translate(word: GameLetter[]) {
    // Only allow translation of filled in words.
    if (word[0].state === LetterState.UNKNOWN) {
      return
    }

    const wordAsString = word.map(l => l.content).join('')
    this.translationService.translate(wordAsString)
      .then(translatedWord => this.toasts.push('NL "' + wordAsString + '" EN "' + translatedWord + '"'));
  }

  createGameLettersFromAnswer(): GameLetter[] {
    return this.game.answer.split('').map(s => ({content: s, state: LetterState.CORRECT}))
  }
}
