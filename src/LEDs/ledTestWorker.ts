const assert = require('assert')
import { MessagePort, parentPort } from 'worker_threads'

let channelToMain: MessagePort

// get port to main thread
parentPort.once('message', (value: { hereIsYourPort: MessagePort }) => {
  console.log('VALUE', value)
  assert(value.hereIsYourPort instanceof MessagePort)
  channelToMain = value.hereIsYourPort
  channelToMain.postMessage('worker is running')
  // testing !!
  channelToMain.on('message', (string) => {
    console.log('message: ', string)
  })
})

process.on('exit', () => {
  channelToMain.close()
})
