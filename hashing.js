const {SHA256} = require('crypto-js');

var message='hey i am Amina';
var hash =SHA256(message);
 console.log(`message : ${message}`);
 console.log(`hash : ${hash}`);
