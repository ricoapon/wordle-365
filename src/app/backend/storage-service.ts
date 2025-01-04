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

  constructor() {
    localStorage.setItem(this.KEY_VERSION, this.VERSION);

    const value = localStorage.getItem(this.KEY_DATA);
    if (value == null) {
      this.data = [];
    } else {
      this.data = JSON.parse(value);
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

    this.save();
  }

  public getAll(): WordleSingleDay[] {
    return this.data;
  }

  private save() {
    localStorage.setItem(this.KEY_DATA, JSON.stringify(this.data));
  }
}
