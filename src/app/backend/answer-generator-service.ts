import {Injectable} from '@angular/core';
import {StorageService} from "./storage-service";
import {POSSIBLE_ANSWERS} from "./words/possible-answers";

@Injectable({
  providedIn: 'root'
})
export class AnswerGeneratorService {

  constructor(private storageService: StorageService) {
  }

  next(): String {
    const randomizedAnswers = this.getOrCreateRandomizedAnswers()
    const answer = randomizedAnswers.pop()

    if (answer === undefined) {
      // This should never happen, since getOrCreateRandomizedAnswers ensures the list is always filled.
      throw new Error('No item could be popped from randomizedAnswers')
    }

    this.storageService.setRandomizedAnswers(randomizedAnswers)
    return answer
  }

  private getOrCreateRandomizedAnswers(): String[] {
    let randomizedAnswers = this.storageService.getRandomizedAnswers()
    if (randomizedAnswers.length > 0) {
      return randomizedAnswers
    }

    // We create a list of all words and shuffle this.
    randomizedAnswers = POSSIBLE_ANSWERS.slice()
    this.shuffle(randomizedAnswers)
    return randomizedAnswers
  }

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  private shuffle(array: String[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
}
