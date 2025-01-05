import {Injectable} from '@angular/core';
import {WordleSingleDay} from "./wordle-single-day";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // If we ever need to change the storage service and migrate, then it is useful to know the version.
  // So we store a version right now.
  private readonly KEY_VERSION = "VERSION";
  private readonly VERSION = "0.0.1"

  // We store everything in a single value under this key.
  private readonly KEY_DATA = "WORDLE";
  private readonly data: WordleSingleDay[];

  // We store randomized answers as an array under this key.
  private readonly KEY_RANDOMIZED_ANSWERS = "ANSWERS";
  private randomizedAnswers: String[];

  constructor() {
    localStorage.setItem(this.KEY_VERSION, this.VERSION);

    const value = localStorage.getItem(this.KEY_DATA);
    if (value == null) {
      this.data = [];
    } else {
      this.data = JSON.parse(value);
    }

    const answersValue = localStorage.getItem(this.KEY_RANDOMIZED_ANSWERS);
    if (answersValue == null) {
      this.randomizedAnswers = [];
    } else {
      this.randomizedAnswers = JSON.parse(answersValue);
    }
  }

  public getForDate(date: String): WordleSingleDay | undefined {
    const matching = this.data.filter(w => w.date == date);

    if (matching.length == 0) {
      return undefined;
    } else if (matching.length > 1) {
      throw new Error("Found multiple WorldSingleDay entries for date " + date);
    } else {
      return matching[0];
    }
  }

  public addOrOverwrite(wordleSingleDay: WordleSingleDay) {
    const existing = this.getForDate(wordleSingleDay.date);
    if (existing == undefined) {
      this.data.push(wordleSingleDay)
    } else {
      const index = this.data.indexOf(existing)
      this.data[index] = wordleSingleDay;
    }

    this.saveData();
  }

  public getAll(): WordleSingleDay[] {
    // Return a copy, because we don't want other objects to modify this.
    return this.data.slice();
  }

  private saveData() {
    localStorage.setItem(this.KEY_DATA, JSON.stringify(this.data));
  }

  private saveRandomizedAnswers() {
    localStorage.setItem(this.KEY_RANDOMIZED_ANSWERS, JSON.stringify(this.randomizedAnswers))
  }

  public getRandomizedAnswers(): String[] {
    return this.randomizedAnswers.slice()
  }

  public setRandomizedAnswers(randomizedAnswers: String[]) {
    this.randomizedAnswers = randomizedAnswers
    this.saveRandomizedAnswers()
  }
}
