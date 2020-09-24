/// <reference types="node" />
/// <reference types="bleno" />

//import * as bleno from '@abandonware/bleno';

//import bleno from "@abandonware/bleno";

var bleno = require("@abandonware/bleno");
var util = require('util');

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


function MotionCharacteristic() {
  bleno.PrimaryService.call(this, {
    uuid: '0000',
    properties: ["read", "subscribe", "notify"],
    // secure: []     - do we need security?
    //value is buffer?  Where is this assigned?
    //value: Buffer.alloc(1)
    // onSubscribe: motionOnSubscribe,
    // onNotify: motionOnNotify,
    // onReadRequest: motionOnReadRequest
  });
  this._value = Buffer.alloc(1);

}

util.inherits(MotionCharacteristic, bleno.Characteristic);

// console.log(bleno.Characteristic);

// export class MotionCharacteristic extends bleno.Characteristic {
//   uuid: string;
//   properties: string[];
//   value: Buffer;
  

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

MotionCharacteristic.prototype.onSubscribe = function(maxValueSize: any, updateValueCallback: () => any) {
   console.log("subscribed to MotionCharacteristic");
   console.log("motion maxValueSize: " + maxValueSize);
 }

 MotionCharacteristic.prototype.onNotify = function() {
   console.log("Notfying from motion sensor");
 }

MotionCharacteristic.prototype.onReadRequest = function(offset: any, callback: () => any) {
   console.log("read request for motion sensor");
 }


export {  MotionCharacteristic };

