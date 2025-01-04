export type WordleSingleDay = {
  // The date is annoying with JSON.stringify. So to make it easier for myself, I just always use String format.
  // The format is always yyyy-MM-dd.
  date: String,
  // If the day was not guessed correctly, the word is not part of the guesses.
  answer: String,
  guessedWords: String[],
}
