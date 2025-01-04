import {Injectable} from '@angular/core';
import {WordleSingleDay} from "./wordle-single-day";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // We store everything in a single value under this key.
  private readonly key = "WORDLE";

  constructor() {
  }

  public add(wordleSingleDay: WordleSingleDay) {
    const allItems = this.get();
    allItems.push(wordleSingleDay);
    localStorage.setItem(this.key, JSON.stringify(allItems));
  }

  public get(): WordleSingleDay[] {
    const value = localStorage.getItem(this.key);
    if (value == null) {
      return [];
    }
    return JSON.parse(value);
  }
}
