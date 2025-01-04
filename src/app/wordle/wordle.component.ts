import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {KeyboardComponent} from "./keyboard/keyboard.component";
import {WordComponent} from "./word/word.component";
import {NgForOf} from "@angular/common";
import {Game} from "../backend/game";
import {StorageService} from "../backend/storage-service";

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [
    RouterLink,
    KeyboardComponent,
    WordComponent,
    NgForOf
  ],
  templateUrl: './wordle.component.html',
  styleUrl: './wordle.component.css'
})
export class WordleComponent implements OnInit {
  protected date: Date | undefined;
  protected game: Game;

  constructor(private route: ActivatedRoute, private storageService: StorageService) {
  }

  ngOnInit() {
    const dateParam = this.route.snapshot.queryParams['date'];
    if (dateParam) {
      this.date = new Date(dateParam);
    } else {
      this.date = new Date();
    }

    let wordleSingleDay = this.storageService.getForDate(this.date);
    if (wordleSingleDay == undefined) {
      // TODO: generate dynamically!
      wordleSingleDay = {
        date: this.date,
        answer: "hallo",
        guessedWords: [],
      }
      this.storageService.addOrOverwrite(wordleSingleDay);
    }

    this.game = new Game(wordleSingleDay, this.storageService);
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
