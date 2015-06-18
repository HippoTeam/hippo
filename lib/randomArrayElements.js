'use strict';

//Returns a function that takes an array and a number
//That function returns an array with num random elements from that array
//If there are not enough elements in the array, the function returns the original array but randomized
module.exports = function(array, num) {
  if (!num || num > array.length) {
    num = array.length;
  }
  var returnArray = [];
  while (returnArray.length < num) {
    var randomNum = Math.floor(Math.random()*array.length);
    returnArray.push(array.splice(randomNum, 1)[0]);
  }
  return returnArray;
}
