

const bleno = require('@abandonware/bleno');

// Only require works here, not sure why. Import syntax threw errors and wouldn't build.

import { motionCharacteristic } from "./peripheralCharacteristics/motionCharacteristic.js";

import { sensorsService } from "./services/sensorsService.js";


//constructor, then create 'new'
const PrimaryService = bleno.PrimaryService;


//const MotionCharacteristic = require("./peripheralCharacteristics/motionCharacteristic");

// const motionCharacteristic = new (motionCharacteristic as any)();

// state = <"unknown" | "resetting" | "unsupported" | "unauthorized" | "poweredOff" | "poweredOn">
//
// bleno.on('stateChange', callback(state));
//
// bleno.on('advertisingStart', callback(error));
//
// bleno.on('advertisingStartError', callback(error));
//
// bleno.on('advertisingStop', callback);
//
// bleno.on('advertisingStop', callback);
//
// bleno.on('servicesSet', callback(error));
//
// bleno.on('servicesSetError', callback(error));
//
// bleno.on('accept', callback(clientAddress)); // not available on OS X 10.9
//
//
// bleno.on('disconnect', callback(clientAddress)); // Linux only
//
// bleno.on('rssiUpdate', callback(rssi)); // not available on OS X 10.9

const serviceName = "rb-0"; //uuid- rb-0 through rb-5 for each pi
//UUID generated from guidgenerator.com
// eventually will be in process.env?


//address- b8:27:eb:f6:c6:a2

const serviceUUID = 'rb00';


let messageInterval: NodeJS.Timeout;

function logMessageOnInterval(message: String) {
  messageInterval = setInterval(() => {
    console.log(`${message}\n`);
  }, 10000);
}

function stopLogging() {
  clearInterval(messageInterval);
}


// rb-0 - distance, ambient light, motion
// rb-1 - rb-4 - motion
// rb-5 - distance, ambient light, motion

// state must be poweredOn to start advertising
bleno.on('stateChange', (state: String) => {
  
  console.log('on stateChange ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising(serviceName, [serviceUUID], function(err: any) {
      if(err) {
        console.log(err);
	}
    });
} else {
    console.log("stopping advertising");
    bleno.stopAdvertising();
  }
});

// const testCharacteristic = new bleno.Characteristic({
//   uuid: 'ffff',
//   properties: ["read", "subscribe", "notify"],
//   // secure: []     - do we need security?
//   //value is buffer?  Where is this assigned?
//   // value: Buffer.alloc(1) 
//   onSubscribe: motionOnSubscribe,
//   onNotify: motionOnNotify,
//   onReadRequest: motionOnReadRequest
// })

// function motionOnSubscribe(maxValueSize: number, updateValueCallback: () => any) {
//   console.log("subscribed to MotionCharacteristic");
//   console.log("motion maxValueSize: " + maxValueSize);
// }

// function motionOnNotify() {
//   console.log("Notfying from motion sensor");
// }

// function motionOnReadRequest(offset: number, callback: () => any) {
//   console.log("read request for motion sensor");
// }

// const testService = new PrimaryService({
//   uuid: serviceUUID, // should get as env.var
//   characteristics: [
// //    testCharacteristic,
//     motionCharacteristic
//   ]
// })

bleno.on('servicesSet', (error: any) => {
  if(error) {
    console.log(error);
  }
  console.log("setting service");
})

bleno.on('servicesSetError', (error: any) => {
  if(error) {
    console.log(error);
  }
  console.log("ERROR SETTING SERVICE");
})



bleno.on('advertisingStart', (err: any) => {
  if (err) {
    console.log(err);
  } else {
    bleno.setServices([
      sensorsService
    ])
    console.log(sensorsService.uuid);
    console.log(sensorsService);
    console.log(bleno.services);
    logMessageOnInterval("advertising ");
  }
})

bleno.on('accept', (clientAddress: String) => {
  console.log(`clientAddress ${clientAddress} accepted`);
  stopLogging();
  console.log("accepted");
bleno.stopAdvertising(() => { 
  console.log("stopped advertising");
})
  //stop advertising? (is automatic?)
})

bleno.on('disconnect', (clientAddress: String) => {
  console.log(`clientAddress ${clientAddress} disconnected`);
  //try to reconnect
})

bleno.on('connect', () => {
  console.log("connected");
})

//module.exports = bleno;
