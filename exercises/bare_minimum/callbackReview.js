/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('needle');
const express = require('express');

const app = express();

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  // i : a filepath
  // o : the first line from file at filepath
  // c : must use callback functions
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      //throw new Error();
      err = new Error();
      //console.log(err.code);
      err.code = 'ENOENT';
      callback(err);
    } else {
      let lineByLine = fileData.toString();
      lineByLine = lineByLine.split('\n');
      callback(null, lineByLine[0]);
    }
  });

};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // TODO
  // i : a url path
  // o : a status code
  request.get(url, (err, res, body) => {
    //console.log('response is', res.statusCode);
    if (err) {
      // let err = new Error();
      // err.msg = 'Invalid URL';
      callback(err);
    } else {
      callback(null, res.statusCode);
    }
  });
  //
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
