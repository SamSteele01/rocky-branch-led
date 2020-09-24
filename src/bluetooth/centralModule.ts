/// <reference types="node" />
/// <reference types="noble" />

//var noble = require('@abandonware/noble');
//import * as noble from "@abadonware/noble";

import * as noble from "@abandonware/noble";

var serviceUUIDs = ['rb00']; // default: [] => all
const peripheralUUIDs = ['b827ebf6c6a2', 'b827ebec8b5d'];
const characteristicUUIDs = ['ffff'];
var allowDuplicates = false;


noble.on('stateChange', (state: string) => {
  if (state === 'poweredOn') {
    
    //should I use startScanningAsync or startScanning?
    // noble.startScanning(['e6a3e7ac605043a49e945af9c81ed6c3'], allowDuplicates, (error: any) => {
    //   if (error) {
    //     console.log(error);
    //   }
    //   console.log("Starting scanning");

    // }
    // );
    console.log("started scanning");
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});


noble.on('discover', (peripheral: noble.Peripheral) => {
  console.log(`peripheral discovered (${peripheral.id} with address <${peripheral.address}, ${peripheral.addressType}>, connectable ${peripheral.connectable}, RSSI ${peripheral.rssi}:`);
  console.log(`${peripheral.advertisement.localName}`);
  console.log("peripheral uuid: " + peripheral.uuid);
  // console.log(`FULL PERIPHERAL: ${JSON.stringify(peripheral)}`);
  if(peripheralUUIDs.indexOf(peripheral.id) > -1) {
    console.log("Service found.");
    peripheral.connect((error: any) => {
      console.log("connecting");
      if(error) {
        console.log(error);
      }

      peripheral.discoverSomeServicesAndCharacteristics(
        serviceUUIDs,
        characteristicUUIDs
      );
    })

  }
})

// function onServicesAndCharacteristicsDiscovered(error: any, services: noble.Peripheral.Servic, characteristics) {

// }





// // noble.on('scanStart', callback);
// // noble.stopScanning();
// // noble.on('scanStop', callback);
// // noble.on('discover', callback(peripheral));
// // noble.on('warning', callback(message));
// // peripheral.connect([callback(error)]);
// // peripheral.once('connect', callback);
// // peripheral.disconnect([callback(error)]);
// // peripheral.once('disconnect', callback);
// // peripheral.updateRssi([callback(error, rssi)]);
// // peripheral.once('rssiUpdate', callback(rssi));
// // peripheral.discoverServices(); // any service UUID
// //
// // var serviceUUIDs = ['<service UUID 1>', ...];
// // peripheral.discoverServices(serviceUUIDs[, callback(error, services)]); // particular UUIDs
// // peripheral.discoverAllServicesAndCharacteristics([callback(error, services, characteristics)]);
// // var serviceUUIDs = ['<service UUID 1>', ...];
// // var characteristicUUIDs = ['<characteristic UUID 1>', ...];
// // peripheral.discoverSomeServicesAndCharacteristics(serviceUUIDs, characteristicUUIDs, [callback(error, services, characteristics));
