const assert = require('assert')
import { MessagePort, parentPort } from 'worker_threads'

let channelToMain: MessagePort

// get port to main thread
parentPort.once('message', (value: { hereIsYourPort: MessagePort }) => {
  console.log('VALUE', value)
  assert(value.hereIsYourPort instanceof MessagePort)
  channelToMain = value.hereIsYourPort
  channelToMain.postMessage('worker is running')
})

// testing !!
setInterval(() => {
  channelToMain.postMessage('buzz')
}, 5000)

process.on('exit', () => {
  channelToMain.close()
})
