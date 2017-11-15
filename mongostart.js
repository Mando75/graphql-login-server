import { spawn } from 'child_process';

function mongodstart () {
  const mongod = spawn('mongod');

  mongod.on('error', (code, sig) => {
    console.log(`error when running mongod process with ${code} and ${sig}`);
  }).on('exit', (code, sig) => {
    console.log(`mongod process exited with code ${code} and signal ${sig}`);
  });
}
export {mongodstart};