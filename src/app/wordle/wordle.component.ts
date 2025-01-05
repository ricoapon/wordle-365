import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {KeyboardComponent} from "./keyboard/keyboard.component";
import {WordComponent} from "./word/word.component";
import {NgForOf} from "@angular/common";
import {Game} from "../backend/game";
import {StorageService} from "../backend/storage-service";
import {DateUtilService} from "../backend/date-util-service";
import {AnswerGeneratorService} from "../backend/answer-generator-service";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [
    RouterLink,
    KeyboardComponent,
    WordComponent,
    NgForOf,
    NgbToast
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
              private answerGeneratorService: AnswerGeneratorService) {
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
}
