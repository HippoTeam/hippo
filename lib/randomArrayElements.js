'use strict';

//Returns a function that takes an array and a number
//That function returns an array with num random elements from that array
//That function returns the original array if there are not enough elements in the array
module.exports = function(array, num) {
  if (num > array.length) {return array;}
  var returnArray = [];
  while (returnArray.length < num) {
    var randomNum = Math.floor(Math.random()*array.length);
    returnArray.push(array.splice(randomNum, 1));
  }
  return returnArray;
}
