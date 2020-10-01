/// <reference types="node" />
/// <reference types="bleno" />

// import * as bleno from '@abandonware/bleno';

// import bleno from '@abandonware/bleno';

//"require" works and the import syntax throws errors.
const bleno = require('@abandonware/bleno');
// var util = require('util');

function motionOnSubscribe(
  maxValueSize: any,
  updateValueCallback: (data: Buffer) => any,
): void {
  console.log('subscribed to MotionCharacteristic');
  //creating a buffer -> <1 1 1 1>
  const myBuffer1 = Buffer.alloc(4, 1);
  //Docs said I needed to pass this result code to the updateValueCallback function as a parameter.
  // Function only worked when I passed in the buffer as the only parameter. 
  let result = this.RESULT_SUCCESS;
  console.log(myBuffer1);
  //updateValueCallback sends the value to the centralModule
  //This correctly sends the buffer to the centralModule, but I don't think this is how we will normall send data.
  updateValueCallback(myBuffer1);
  
  // console.log('motion maxValueSize: ' + maxValueSize);
}

function motionOnNotify() : void {
    let myBuffer2 = Buffer.alloc(10, 0);
    console.log('Notfying from motion sensor');
    
}

function motionOnReadRequest(offset: any, callback: (result: any, data: Buffer) => any)
: void {
  let myBuffer3 = Buffer.alloc(10, 1);
  console.log('Read request');
  callback(bleno.Characteristic.RESULT_SUCCESS, myBuffer3);
}

export const motionCharacteristic = new bleno.Characteristic({
  uuid: '72eadb17-c120-42ac-a983-484834b0faf9',
  // uuid: 'fb4d273c-ff58-11ea-adc1-0242ac120002',
  properties: ['read', 'notify', 'subscribe'],
  // secure: []     - do we need security?
  onSubscribe: motionOnSubscribe,
  onNotify: motionOnNotify,
  onReadRequest: motionOnReadRequest,
});

//Below are the iterations from when I was trying to figure out the best syntax for creating the Characteristic instance.


// motionCharacteristic

// const MotionCharacteristic = function() {
//   MotionCharacteristic.super_.call(this, {
//     uuid: '0001',
//     properties: ['read', 'subscribe', 'notify'],
//     // secure: []     - do we need security?
//     //value is buffer?  Where is this assigned?
//     //value: Buffer.alloc(1)
//     // onSubscribe: motionOnSubscribe,
//     // onNotify: motionOnNotify,
//     // onReadRequest: motionOnReadRequest
//   });
//   this._value = Buffer.alloc(1);
//
// }


// console.log(bleno.Characteristic);

// export class MotionCharacteristic extends bleno.Characteristic {
//   uuid: string;
//   properties: string[];
//   value: Buffer;
//
//   constructor(uuid: string) {
//     super(uuid, onSubscribe, onNotify, onReadRequest);
//     this.uuid = uuid;
//     this.properties = ["read", "subscribe", "notify"];
//     this.value = Buffer.alloc(1);
// //  this.onSubscribe = motionOnSubscribe;
// //  this.onNotify = motionOnNotify;
// //  this.onReadRequest = motionOnReadRequest;
//   }
// }

// MotionCharacteristic.prototype.onSubscribe = function (
//   maxValueSize: any,
//   updateValueCallback: () => any,
// ) {
//   console.log('subscribed to MotionCharacteristic');
//   console.log('motion maxValueSize: ' + maxValueSize);
// };
//
// MotionCharacteristic.prototype.onNotify = function () {
//   console.log('Notfying from motion sensor');
// };
//
// MotionCharacteristic.prototype.onReadRequest = function (
//   offset: any,
//   callback: () => any,
// ) {
//   console.log('read request for motion sensor');
// };

// export motionCharacteristic ;
