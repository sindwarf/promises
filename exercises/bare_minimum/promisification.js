/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

var fs = require('fs');
var request = require('needle');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
var getGitHubProfile = function (user, callback) {
  var url = 'https://api.github.com/users/' + user;
  var options = {
    headers: { 'User-Agent': 'request' },
  };

  request.get(url, options, function (err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(
        new Error('Failed to get GitHub profile: ' + body.message),
        null
      );
    } else {
      callback(null, body);
    }
  });
};

var getGitHubProfileAsync = Promise.promisify(getGitHubProfile); // TODO


// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

var generateRandomTokenAsync = Promise.promisify(generateRandomToken); // TODO


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }

    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(funnyFile);
  });
};

var readFileAndMakeItFunnyAsync = function (filePath) {
  // console.log(readFileAndMakeItFunny);
  // let args = [...arguments];

  return new Promise((resolve, reject) => {
    //console.log('args is,' , args);
    readFileAndMakeItFunny(filePath, (errOrfile) => {
      if (errOrfile instanceof Error) {
        reject(errOrfile);
      } else {
        resolve(errOrfile);
      }
    });
  });

  // return function(...args) {
  //   console.log('args is,', args);
  //   return new Promise((resolve, reject) => {
  //     function callback(err, result) {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(result);
  //       }
  //     }

  //     args.push(callback);

  //     readFileAndMakeItFunny.call(this, ...args);
  //   });
  // };
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
