const Spawngo = require('spawngo');

const buildApple = new Spawngo({
  'db': 'econ-sim',
  'collection': 'Experiments'
});

const childProcess = buildApple.import('applemarket.json');

// handle events as needed
childProcess.stdout.on('data', function (data) {
  console.log(data)
});

childProcess.stderr.on('data', function (data) {
  // block to handle stderr
  console.log(data)
});

childProcess.on('close', function (data) {
  // block to handle close
  console.log(data)
});



// mongoimport --db econ-sim --collection expTemplates --file applemarket.json --json;