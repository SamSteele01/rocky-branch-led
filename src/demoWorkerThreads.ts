const { Worker, MessageChannel, workerData, isMainThread, parentPort } = require('worker_threads');

/* launch processes on worker threads to utilize multiple cores of the processor */
if (isMainThread) {
  console.log(`Main process: ${process.pid}`);
  
  const bluetoothWorker = new Worker('./bluetooth/bluetooth.js');
  bluetoothWorker.on('online', () => console.log(`Bluetooth process: ${bluetoothWorker.threadId}`));
  const bluetoothChannel = new MessageChannel();
  bluetoothWorker.postMessage({ hereIsYourPort: bluetoothChannel.port1 }, [bluetoothChannel.port1]);
  // receive message
  bluetoothChannel.port2.on('message', (value) => {
    console.log('message from bluetooth:', value);
  });
  
  const sensorInputsWorker = new Worker('./sensors/sensors.js');
  sensorInputsWorker.on('online', () => console.log(`Sensors process: ${sensorInputsWorker.threadId}`));
  const sensorChannel = new MessageChannel();
  sensorInputsWorker.postMessage({ hereIsYourPort: sensorChannel.port1 }, [sensorChannel.port1]);
  // receive message
  sensorChannel.port2.on('message', (value) => {
    console.log('message from sensors:', value);
  });
  
  // const ledStripOutputs = new Worker('./LEDs/main', { workerData: 'Worker Data 2' });
  // ledStripOutputs.once('message', message => console.log(message));
  
}

function shutdown() {
  bluetoothWorker.terminate();
  sensorInputsWorker.terminate();
  bluetoothChannel.port1.close();
  sensorChannel.port1.close();
}
