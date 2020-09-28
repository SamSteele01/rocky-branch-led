

// var noble = require('@abandonware/noble');
// import { noble } from "@abandonware/noble";

import noble from '@abandonware/noble';

const peripheralUUIDs = ['b827ebf6c6a2', 'b827ebec8b5d'];
const serviceUUIDs = ['rb00']; // default: [] => all
const characteristicUUIDs = ['72eadb17c12042aca983484834b0faf9'];
const allowDuplicates = false;
let connectedPeripherials: noble.Peripheral[] = [];
let usableCharacteristics: IUsableCharacteristics = {};

interface IUsableCharacteristics {
  [key: string]: noble.Characteristic;
}

function routeCharacteristicData(
  peripheralId: string,
  charUuid: string,
  data: Buffer,
) {
  console.log("routing characteristics");
  // switch about characteristics & call respective function
}

// all functions - relay data to all other fixtures

// usableCharacteristics[peripheralId + '-' + charUuid].write(data)

noble.on('stateChange', async (state: string) => {
  if (state === 'poweredOn') {
    //should I use startScanningAsync or startScanning?
    // noble.startScanning(['e6a3e7ac605043a49e945af9c81ed6c3'], allowDuplicates, (error: any) => {
    //   if (error) {
    //     console.log(error);
    //   }
    //   console.log("Starting scanning");

    // }
    // );
    console.log('started scanning');
    //
    await noble.startScanningAsync();
  } else {
    await noble.stopScanningAsync();
  }
});

// noble.on('discover', (peripheral: noble.Peripheral) => {
//   console.log(`peripheral discovered (${peripheral.id} with address <${peripheral.address}, ${peripheral.addressType}>, connectable ${peripheral.connectable}, RSSI ${peripheral.rssi}:`);
//   console.log(`${peripheral.advertisement.localName}`);
//   console.log("peripheral uuid: " + peripheral.uuid);
//   // console.log(`FULL PERIPHERAL: ${JSON.stringify(peripheral)}`);
//   if(peripheralUUIDs.indexOf(peripheral.id) > -1) {
//     console.log("Service found.");
//     peripheral.connect((error: any) => {
//       console.log("connecting");
//       if(error) {
//         console.log(error);
//       }
//
//       peripheral.discoverSomeServicesAndCharacteristics(
//         serviceUUIDs,
//         characteristicUUIDs
//       );
//     })
//
//   }
// })

noble.on('discover', async (peripheral) => {
  // if all peripherals are connected
  if (connectedPeripherials.length === 5) {
    await noble.stopScanningAsync();
  }

  if (peripheralUUIDs.includes(peripheral.id)) {
    await noble.stopScanningAsync();
    console.log("Found peripheral with uuid " + peripheral.id);
    await peripheral.connectAsync();
  }

  peripheral.once('connect', () => {
    console.log(`connected to ${peripheral.id} uuid: ${peripheral.uuid}`);
    console.log(
      `with rssi of: ${peripheral.rssi} and name: ${peripheral.advertisement.localName}`,
    );
    connectedPeripherials.push(peripheral);
  });
  // for type- services, noble.Peripheral.services, noble.Peripheral.Service[] don't work
  // 

  peripheral.once('servicesDiscover', (services: noble.Service[]) => {
    console.log("Discovered services: " + services);
    console.log(services.length);
    services.forEach(service => {
      console.log(service.uuid);
      service.discoverCharacteristics()
      service.once('characteristicsDiscover', (characteristics: noble.Characteristic[]) => {
        console.log("Discovered characteristics: " + characteristics);
        characteristics.forEach(characteristic => {
          characteristic.subscribe((err: any) => {
            if (err) {
              console.log(err)
            }
          })
        })
      });


    })
  });

  // const {
  //   // services,
  //   characteristics,
  // } = await peripheral.discoverSomeServicesAndCharacteristicsAsync(
  //   ['rb00'], // services
  //   ['72eadb17c12042aca983484834b0faf9'], // characteristics
  // );

  const services = await peripheral.discoverServicesAsync();
  console.log("YEET");


  // characteristics.map((char) => {
  //   usableCharacteristics[peripheral.id + '-' + char.uuid] = char;
  //   char.subscribe((error) => {
  //     console.error(
  //       `ERROR with ${peripheral.id}, characteristic: ${char.name}`,
  //       error,
  //     );
  //   });
  //   // char.on('read', (buffer) => {});
  //   char.on('data', (data: any /* Buffer? */, isNotification: Boolean) => {
  //     console.log('DATA', data);
  //     console.log('ISNOTIFICATION', isNotification);
  //     // call a function
  //     // switch here or in function
  //     routeCharacteristicData(peripheral.id, char.uuid, data);
  //   });
  // });
});

function cleanup() {
  // map thourgh listeners
  connectedPeripherials.forEach((periph) => {
    periph.disconnect();
  });
}

process.on('exit', cleanup);
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

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
