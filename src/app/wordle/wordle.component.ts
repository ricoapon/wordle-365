import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {KeyboardComponent} from "./keyboard/keyboard.component";
import {WordComponent} from "./word/word.component";
import {NgForOf} from "@angular/common";

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
  // TODO: eventually remove this implemented value with a dynamic value.
  protected answer: String = "hallo";
  protected guessedWords: String[] = ['error', 'bezig', 'aa', '', '', '']

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const dateParam = this.route.snapshot.queryParams['date'];
    if (dateParam) {
      this.date = new Date(dateParam);
    }
  }

  print(value: String) {
    console.log(value);
  }
}
