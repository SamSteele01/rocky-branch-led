import { Worker, MessageChannel, isMainThread } from 'worker_threads'

/* launch processes on worker threads to utilize multiple cores of the processor */
if (isMainThread) {
  console.log(`Main process: ${process.pid}`)
}

/* ble */
const bluetoothWorker = new Worker('./bluetooth/bleTestWorker.js')
bluetoothWorker.on('online', () =>
  console.log(`Bluetooth process: ${bluetoothWorker.threadId}`)
)

// Creating a shared buffer
const length: number = 100 * 4
// Get the size we want in bytes for the buffer
const size = Uint8Array.BYTES_PER_ELEMENT * length
// Create a buffer for 100 LEDs/pixels
const sharedBluetoothBuffer = new SharedArrayBuffer(size)
const sharedBluetoothArray = new Uint8Array(sharedBluetoothBuffer)

const bluetoothChannel = new MessageChannel()
bluetoothWorker.postMessage(
  {
    hereIsYourPort: bluetoothChannel.port1,
    sharedBuffer: sharedBluetoothBuffer,
  },
  [bluetoothChannel.port1]
)

bluetoothChannel.port2.on('message', (value) => {
  console.log('message from bluetooth thread:', value)
})

const interval = setInterval(() => {
  // read shared Buffer
  console.log('SHAREDBLUETOOTHARRAY', sharedBluetoothArray)
}, 250)

function shutdown(): void {
  bluetoothWorker.terminate()
  clearInterval(interval)
  bluetoothChannel.port1.close()
}

process.on('exit', () => {
  shutdown()
})
