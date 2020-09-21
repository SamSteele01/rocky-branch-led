// var bleno = require('../peripherals.ts');

// // var DistanceCharacteristic = new bleno.Characteristic({
// //   uuid: 'fffffffffffffffffffffffffffffff0',
// //   properties: ["read", "subscribe", "notify"],
// //   value: Buffer.alloc(1),
// //   onSubscribe: distanceOnSubscribe,
// //   onNotify: distanceOnNotify,
// //   onReadRequest: distanceOnReadRequest
// // })

// class DistanceCharacteristic extends bleno.Characteristic {
//   constructor(uuid) {
//     super();
//     this.uuid = uuid;
//     this.properties = ["read", "subscribe", "notify"];
//     this.value = Buffer.alloc(1);
//     this.onSubscribe = distanceOnSubscribe;
//     this.onNotify = distanceOnNotify;
//     this.onReadRequest = distanceOnReadRequest;
//   }
// }


// function distanceOnSubscribe(maxValueSize, updateValueCallback) {
//   console.log("subscribed to distance characteristic");
//   console.log("distance maxValueSize: " + maxValueSize);
// }

// function distanceOnNotify() {
//   console.log("Notifying from distance sensor");
// }

// function distanceOnReadRequest(offset, callback) {
//   console.log("read request for distance sensor");
// }

// module.exports = DistanceCharacteristic;
