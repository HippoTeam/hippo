'use strict';

// Calculates Percent Correct Of an Array
// Percentage correct is based on first param matching, and second param array


module.exports = function(name, guessesArr) {
  var totalGuessesCount;
  var wrongGuesses;
  var wrongGuessesCount;

  wrongGuesses = guessesArr.filter(function(elem) { return elem !== name; });
  wrongGuessesCount = wrongGuesses.length;

  // return percent correct
  return (totalGuessesCount - wrongGuessesCount) / totalGuessesCount;
};
