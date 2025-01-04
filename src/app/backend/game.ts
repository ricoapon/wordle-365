import {LetterState} from "../wordle/letter-state";
import {ALL_EXISTING_WORDS} from "./words/all-existing-words";
import {WordleSingleDay} from "./wordle-single-day";
import {StorageService} from "./storage-service";

const MAX_NR_OF_GUESSES = 6
const WORD_LENGTH = 5

export type GameLetter = {
  content: String,
  state: LetterState,
}

export class Game {
  private readonly answer: String;
  public readonly guessedWords: GameLetter[][];
  private currentGuessingWord = 0;
  private currentGuessingLetter = 0;
  // Using sets because we are fancy. Lists would have sufficed, but I find duplicates ugly and I don't want to
  // write code to avoid it.
  private incorrectLetters: Set<String> = new Set()
  private correctLetters: Set<String> = new Set()
  private almostCorrectLetters: Set<String> = new Set()
  // We keep an instance of the StorageService, so that we automatically update the values after guessing a word.
  private readonly wordleSingleDay: WordleSingleDay
  private storageService: StorageService

  constructor(wordleSingleDay: WordleSingleDay, storageService: StorageService) {
    this.answer = wordleSingleDay.answer
    this.wordleSingleDay = wordleSingleDay
    this.storageService = storageService

    this.guessedWords = []
    for (let i = 0; i < MAX_NR_OF_GUESSES; i++) {
      let guessedLetters: GameLetter[] = [];
      for (let j = 0; j < WORD_LENGTH; j++) {
        guessedLetters.push({
          content: '',
          state: LetterState.UNKNOWN
        })
      }
      this.guessedWords.push(guessedLetters)
    }

    // We already have words that are guessed. So we need to implement those. We do this by running through the game.
    for (let word of wordleSingleDay.guessedWords) {
      for (let letter of word.split('')) {
        this.addLetter(letter);
      }
      this.finalizeGuess(false);
    }
  }

  addLetter(letter: String) {
    if (this.currentGuessingLetter >= WORD_LENGTH) {
      return
    }

    this.guessedWords[this.currentGuessingWord][this.currentGuessingLetter].content = letter
    this.currentGuessingLetter++
  }

  deleteLastLetter() {
    if (this.currentGuessingLetter <= 0) {
      return
    }

    this.currentGuessingLetter--
    this.guessedWords[this.currentGuessingWord][this.currentGuessingLetter].content = ''
  }

  _getAllIndicesOfOccurrence(word: String, letter: String) {
    let indices = [];
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        indices.push(i);
      }
    }
    return indices
  }

  _arrayFrom0ToExcludingNWithout(n: number, withoutArray: number[]) {
    return [...Array(n).keys()].filter((el) => !withoutArray.includes(el))
  }

  public finalizeGuess(commitToStorage: boolean = true) {
    if (this.currentGuessingLetter < WORD_LENGTH) {
      return
    }

    let guessedWord = this.guessedWords[this.currentGuessingWord].map(l => l.content).join("")
    // When we initialize the game, we reply existing games. If we ever change the dictionary, it can happen that words
    // that were guessed before do not exist anymore. To avoid any issues, we just allow that.
    if (!ALL_EXISTING_WORDS.includes(guessedWord) && commitToStorage) {
      alert('This word does not exist')
      return
    }

    let guessedLetters = this.guessedWords[this.currentGuessingWord]

    let isCorrect = true

    // The only tricky part in this section is related to double letters. Each letter can only light up as often as
    // it occurs in the answer. So if a letter occurs once in the answer and twice in the guess, only one of the
    // guess letters should get a state. The correct state should always be preferred over the almost correct state.
    // And this should be generalized (e.g. if the letter occurs X times in the answer).
    for (let letter of new Set(this.answer.split(""))) {
      let correctIndices: number[] = this._getAllIndicesOfOccurrence(this.answer, letter)
      console.log('Letter ' + letter + ' has correct indices ' + correctIndices)
      let nrOfStatesToSet = correctIndices.length
      for (let index of correctIndices) {
        if (guessedLetters[index].content === letter) {
          guessedLetters[index].state = LetterState.CORRECT
          this.correctLetters.add(letter)
          nrOfStatesToSet--
        }
      }
      // Loop over all indices that are not correct.
      for (let index of this._arrayFrom0ToExcludingNWithout(WORD_LENGTH, correctIndices)) {
        console.log('Checking index ' + index)
        if (nrOfStatesToSet === 0) {
          break;
        }

        if (guessedLetters[index].content === letter) {
          guessedLetters[index].state = LetterState.ALMOST_CORRECT
          this.almostCorrectLetters.add(letter)
          nrOfStatesToSet--
          isCorrect = false
        }
      }
    }
    // All (almost) correct letters have their state. So now we have the incorrect letters left.
    for (let guessedLetter of guessedLetters) {
      if (guessedLetter.state === LetterState.UNKNOWN) {
        guessedLetter.state = LetterState.INCORRECT
        this.incorrectLetters.add(guessedLetter.content)
        isCorrect = false
      }
    }

    if (commitToStorage) {
      const guessedWordAsString = guessedLetters.map(l => l.content).join('')
      this.wordleSingleDay.guessedWords.push(guessedWordAsString)
      this.storageService.addOrOverwrite(this.wordleSingleDay)
    }

    if (isCorrect) {
      // Delay the page switch to have the letters light green first.
      setTimeout(() => {
        alert('You got it!')
      }, 2000)
      return
    }

    this.currentGuessingWord++
    this.currentGuessingLetter = 0

    if (this.currentGuessingWord === MAX_NR_OF_GUESSES) {
      alert('You ran out of guesses. Try again tomorrow!')
    }
  }

  determineStateOfLetterInAlphabet(letter: String) {
    if (this.correctLetters.has(letter)) {
      return LetterState.CORRECT
    } else if (this.almostCorrectLetters.has(letter)) {
      return LetterState.ALMOST_CORRECT
    } else if (this.incorrectLetters.has(letter)) {
      return LetterState.INCORRECT
    }
    return LetterState.UNKNOWN
  }
}
