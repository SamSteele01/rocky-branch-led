const noble = require('@abandonware/noble');


var serviceUUIDs = []; // default: [] => all
var allowDuplicates = false;


noble.on('stateChange', async (state: String) => {
  if (state === 'poweredOn') {
    //should I use startScanningAsync or startScanning?
    noble.startScanning(serviceUUIDs, allowDuplicates[, (error: any) => {
      if (error) {
        console.log(error);
      }

    }
    ]);
  }
});


noble.on('discover', (peripheral: object) => {
  console.log(`peripheral discovered (${peripheral.id} with address <${peripheral.address}, ${peripheral.addressType}>, connectable ${peripheral.connectable}, RSSI ${peripheral.rssi}:`);
  console.log(`${peripheral.advertisement.localName}`);
  console.log(`${JSON.stringify(peripheral.advertisement.serviceUuids)}`);
})


// noble.on('scanStart', callback);
// noble.stopScanning();
// noble.on('scanStop', callback);
// noble.on('discover', callback(peripheral));
// noble.on('warning', callback(message));
// peripheral.connect([callback(error)]);
// peripheral.once('connect', callback);
// peripheral.disconnect([callback(error)]);
// peripheral.once('disconnect', callback);
// peripheral.updateRssi([callback(error, rssi)]);
// peripheral.once('rssiUpdate', callback(rssi));
// peripheral.discoverServices(); // any service UUID
//
// var serviceUUIDs = ['<service UUID 1>', ...];
// peripheral.discoverServices(serviceUUIDs[, callback(error, services)]); // particular UUIDs
// peripheral.discoverAllServicesAndCharacteristics([callback(error, services, characteristics)]);
// var serviceUUIDs = ['<service UUID 1>', ...];
// var characteristicUUIDs = ['<characteristic UUID 1>', ...];
// peripheral.discoverSomeServicesAndCharacteristics(serviceUUIDs, characteristicUUIDs, [callback(error, services, characteristics));
