import assert = require('assert');
import { MessagePort, parentPort } from 'worker_threads';

//fixture 4- centralModule
// 1-3, 5, 6 - peripherals
// process.env to get fixture number
// charcteristic.onread, write, subscribe, notify etc. (this file)

let channelToMain: MessagePort;

// get port to main thread
parentPort.once('message', (value: { hereIsYourPort: MessagePort }) => {
  console.log('VALUE', value);
  assert(value.hereIsYourPort instanceof MessagePort);
  channelToMain = value.hereIsYourPort;
  channelToMain.postMessage('worker is running');
});

// testing !!
setInterval(() => {
  channelToMain.postMessage('fizz');
}, 3000);

process.on('exit', () => {
  channelToMain.close();
})
