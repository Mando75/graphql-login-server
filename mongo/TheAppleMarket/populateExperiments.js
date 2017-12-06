const spawn = require('spawngo');
const param = process.argv[2];


switch(param) {
  case '-i':
    importFiles();
    break;
  case '-h':
    console.log('This utility will import Experiments into the local mongodb Experiments collection');
    console.log('These Experiment definitions must be formatted as valid JSON file.');
    console.log('\nUse the -i flag to import a set of files. It is not necessary to add the .json extension, just the name will do');
    console.log('\n\tExample: node populateExperiments -i test test1 test2 test3.json');
    break;
}



function importFiles() {
  const files = process.argv.slice(3);
  const buildExp = new spawn({
    db: 'econ-sim',
    collection: 'Experiments'
  });
  files.map((file) => {
    file = checkExtension(file);
    console.log(file);
    const childProcess = buildExp.import(file);
    childProcess.stdout.on('data', function (data) {
      // console.log(data)
    });

    childProcess.stderr.on('data', function (data) {
      console.log(data.toString('utf8'));
      console.log('Error when importing files. Please check your file names, and that they contain valid JSON. Use -h for help');
      process.exit();
    });


    childProcess.on('close', function (data) {
      console.log('Imported file')
    });

  });
}


function checkExtension(file) {
  const regexJsonFile = new RegExp(".json$", "i");
  return regexJsonFile.test(file) ? file : file + '.json';
}
// mongoimport --db econ-sim --collection expTemplates --file applemarket.json --json;