const { promisify } = require('util');
const fs = require('fs');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

module.exports = {
  readFs: function (filename, folder = 'data') {
    const origin = `${process.cwd()}/${folder}/${filename}.json`;

    return readFileAsync(origin, 'utf-8')
      .then(json => JSON.parse(json));
  },

  writeFs: function (obj, filename, folder = 'data') {
    const destination = `${process.cwd()}/${folder}/${filename}.json`;

    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(destination)) {
          fs.writeFile(destination, JSON.stringify([]));
        }
        return readFileAsync(destination, 'utf-8')
          .then(json => resolve(writeFileAsync(destination, JSON.stringify([ ...JSON.parse(json), obj ], null, 2))));
      } catch (e) {
        return reject(e);
      }
    });
  },

  resetFs: function (filename) {
    const origin = `${process.cwd()}/base/${filename}.json`;
    const destination = `${process.cwd()}/data/${filename}.json`;

    return readFileAsync(origin, 'utf-8')
      .then(json => writeFileAsync(destination, json));
  }
};
