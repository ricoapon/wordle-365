export type WordleSingleDay = {
  day: Date,
  // If the day was not guessed correctly, the word is not part of the guesses.
  answer: String,
  guessedWords: String[],
}