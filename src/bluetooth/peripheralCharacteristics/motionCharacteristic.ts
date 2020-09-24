/// <reference types="node" />

var bleno = require('@abandonware/bleno');

// var MotionCharacteristic = new bleno.Characteristic({
//   uuid: 'fffffffffffffffffffffffffffffff0',
//   properties: ["read", "subscribe", "notify"],
//   // secure: []     - do we need security?
//   //value is buffer?  Where is this assigned?
//   value: Buffer.alloc(1) 
//   // onSubscribe: motionOnSubscribe,
//   // onNotify: motionOnNotify,
//   // onReadRequest: motionOnReadRequest
// })


// function MotionCharacteristic() {
//   bleno.PrimaryService.call(this, {
//     uuid: 'fffffffffffffffffffffffffffffff0',
//     properties: ["read", "subscribe", "notify"],
//     // secure: []     - do we need security?
//     //value is buffer?  Where is this assigned?
//     value: Buffer.alloc(1)
//     // onSubscribe: motionOnSubscribe,
//     // onNotify: motionOnNotify,
//     // onReadRequest: motionOnReadRequest
//   })
// }

console.log(bleno.Characteristic);

export default class MotionCharacteristic extends bleno.Characteristic {
  uuid: string;
  properties: string[];
  value: Buffer;


  constructor(uuid: string) {
    super(onReadRequest, onNotify, onSubscribe);
    this.uuid = uuid;
    this.properties = ["read", "subscribe", "notify"];
    this.value = Buffer.alloc(1);
    this.onSubscribe = motionOnSubscribe;
    this.onNotify = motionOnNotify;
    this.onReadRequest = motionOnReadRequest;
  }
}

// function motionOnSubscribe(maxValueSize, updateValueCallback) {
//   console.log("subscribed to MotionCharacteristic");
//   console.log("motion maxValueSize: " + maxValueSize);
// }

// function motionOnNotify() {
//   console.log("Notfying from motion sensor");
// }

// function motionOnReadRequest(offset, callback) {
//   console.log("read request for motion sensor");
// }

// module.exports = new MotionCharacteristic();
