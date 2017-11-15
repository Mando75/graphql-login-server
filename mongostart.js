import { spawn } from 'child_process';
function mongodstart () {
  const mongod = spawn('mongod');

  mongod.on('data', ()=> {
    console.info('connected?')
  }).on('error', (code, sig) => {
    console.warn(`error when running mongod process with ${code} and ${sig}`);
  }).on('exit', (code) => {
    console.warn("\x1b[33m", `[mongostart] WARNING: mongod process exited with code ${code}.
    If you received a 'Connected to MongoDB' message prior to this warning, Mongo may already be running, meaning 
    the application should function normally. 
    
    If you received a connection error, check your MongoDB install\x1b[0m`);
  });
}
export {mongodstart};
