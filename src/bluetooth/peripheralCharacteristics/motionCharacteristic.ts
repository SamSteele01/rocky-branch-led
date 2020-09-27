/// <reference types="node" />
/// <reference types="bleno" />

//import * as bleno from '@abandonware/bleno';

//import * as bleno from '@abandonware/bleno';

var bleno = require('@abandonware/bleno');
// var util = require('util');

function motionOnSubscribe(
  maxValueSize: any,
  updateValueCallback: () => any,
): void {
  console.log('subscribed to MotionCharacteristic');
  console.log('motion maxValueSize: ' + maxValueSize);
}

function motionOnNotify(data: Buffer): void {
  console.log('Notfying from motion sensor');
}

function motionOnReadRequest(offset: any, callback: () => any): void {
  console.log('read request for motion sensor');
}

export const motionCharacteristic = new bleno.Characteristic({
  uuid: '72eadb17-c120-42ac-a983-484834b0faf9',
  // uuid: 'fb4d273c-ff58-11ea-adc1-0242ac120002',
  properties: ['read', 'subscribe', 'notify'],
  // secure: []     - do we need security?
  //value is buffer?  Where is this assigned?

  // need to define ---
value: null, // Buffer.alloc(1), // [ toWest, toEast, zero ] == [ -1 , 0, 1 ]
  onSubscribe: motionOnSubscribe,
  onNotify: motionOnNotify,
  onReadRequest: motionOnReadRequest,
});

// motionCharacteristic

// var MotionCharacteristic = function() {
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

// util.inherits(MotionCharacteristic, bleno.Characteristic);

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
