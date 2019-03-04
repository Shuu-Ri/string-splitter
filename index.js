'use strict'

var splitter = require("./string-split.js");

//var input = "This is a BeginnersBook tutorial.";
//var input = "QWERTY UWERIO";
var input = "Hello there!!";
console.log(input);
//var splitter_vals = ["a","e","i","o","u"];
//var splitter_vals = ["RTY","I","WER"];
var splitter_vals = ["ll","lo"];
console.log(splitter_vals);
var output = splitter.str_split(input, splitter_vals);
console.log("Final result: ",output);