import { Worker, MessageChannel, isMainThread } from 'worker_threads'
import { frameClock, clockEmitter } from './effects/frameClock'

if (isMainThread) {
  console.log(`Main process: ${process.pid}`)
}

/* led */
const ledTestWorker = new Worker('./LEDs/ledTestWorker.js', {
  workerData: 'Worker Data 2',
})
const ledChannel = new MessageChannel()
ledTestWorker.postMessage(
  {
    hereIsYourPort: ledChannel.port1,
  },
  [ledChannel.port1]
)
ledChannel.port2.once('message', (message) => {
  console.log(message)
  frameClock() // only call one time, once all workers and ports are created
})

clockEmitter.emit('attached')

clockEmitter.on('tick', () => {
  // console.log('main TICK')
  ledChannel.port2.postMessage('tick')
})

console.log('tick listeners', clockEmitter.listeners('tick'))

function shutdown(): void {
  ledTestWorker.terminate()
  ledChannel.port2.close()
}

process.on('exit', () => {
  shutdown()
})
