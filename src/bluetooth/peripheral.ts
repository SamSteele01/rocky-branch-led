/// <reference types="node" />

var bleno = require('@abandonware/bleno');

// var bleno = new Bleno();

//var MotionCharacteristic = require("./peripheralCharacteristics/motionCharacteristic.js");

import { motionCharacteristic } from "./peripheralCharacteristics/motionCharacteristic.js";

import { sensorsService } from "./services/sensorsService.js";


//constructor, then create 'new'
var PrimaryService = bleno.PrimaryService;


//var MotionCharacteristic = require("./peripheralCharacteristics/motionCharacteristic");

// var motionCharacteristic = new (motionCharacteristic as any)();

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

var serviceName = "rb-0"; //uuid- rb-0 through rb-5 for each pi
//UUID generated from guidgenerator.com
// unsure if we are using a pre-defined UUID or generating one ourselves
// eventually will be in process.env?
// var serviceUuids = ["fffffffffffffffffffffffffffffff0"];
//define characteristics and then add to services
// export const testService
//export characteristics
// const testService = new PrimaryService({
//   uuid: 'rb00', // should get as env.var
//   characteristics: [   
// see Characteristic for data type
//   ]
// });

//address- b8:27:eb:f6:c6:a2

const serviceUUID = 'rb00';

var errorCallBack = function(err: any) {
  if(err) {
    console.log(err);
  }
}

var broadcastInterval: NodeJS.Timeout;

function broadcast(message: String) {
  broadcastInterval = setInterval(() => {
    console.log(`${message}\n`);
  }, 10000);
}

function stopBroadcast() {
  clearInterval(broadcastInterval);
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
// var testCharacteristic = new bleno.Characteristic({
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

// var testService = new PrimaryService({
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

//b8:27:eb:f6:c6:a2


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
    // console.log(JSON.stringify(testService));
    broadcast("advertising ");
  }
})

bleno.on('accept', (clientAddress: String) => {
  console.log(`clientAddress ${clientAddress} accepted`);
  stopBroadcast();
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
