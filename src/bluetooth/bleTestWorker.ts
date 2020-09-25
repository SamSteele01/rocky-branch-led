import assert = require('assert');
import { MessagePort, parentPort } from 'worker_threads';

//fixture 4- centralModule
// 1-3, 5, 6 - peripherals
// process.env to get fixture number
// charcteristic.onread, write, subscribe, notify etc. (this file)

let channelToMain: MessagePort;
let sharedArray: Uint8Array;
const length: number = 100 * 4;

// get port to main thread
parentPort.once(
  'message',
  (value: { hereIsYourPort: MessagePort; sharedBuffer: SharedArrayBuffer }) => {
    console.log('VALUE', value);
    assert(value.hereIsYourPort instanceof MessagePort);
    channelToMain = value.hereIsYourPort;
    channelToMain.postMessage('worker is running');
    sharedArray = new Uint8Array(value.sharedBuffer);
  },
);

/* testing !! */
const interval = setInterval(() => {
  // update shared Buffer
  for (let i = 0; i < length; i++) {
    Atomics.store(sharedArray, i, Math.random() * 255);
  }
}, 250);

process.on('exit', () => {
  clearInterval(interval);
  channelToMain.close();
});
