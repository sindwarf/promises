/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('./promiseConstructor.js');
var promisification = require('./promisification.js');
var writeFileAsync = Promise.promisify(fs.writeFile);



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return (promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then(promisification.getGitHubProfileAsync)
    .then((body) => {
      return writeFileAsync(writeFilePath, JSON.stringify(body));
      // //console.log('body looks like:', JSON.stringify(body));
      // //console.log(writeFilePath);
      // body = JSON.stringify(body);
      // fs.writeFile(writeFilePath, body, (err) =>{
      //   if (err) {
      //     console.log('error writing to file');
      //   } else {
      //     console.log('success the following was written: ');
      //     console.log(fs.readFileSync(writeFilePath, "utf8"));
      //   }
      // });
    }).catch(err => {
      console.log('ERROR', err);
    })
  );
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
