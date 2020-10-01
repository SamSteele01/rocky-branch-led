// const bleno = require('../peripherals.ts');

// // const AmbientLightCharacteristic = new bleno.Characteristic({
// //   uuid: 'fffffffffffffffffffffffffffffff0',
// //   properties: ["read", "subscribe", "notify"],
// //   value: Buffer.alloc(1),
// //   onSubscribe: ambLightOnSubscribe,
// //   onNotify: ambLightOnNotify,
// //   onReadRequest: ambLightOnReadRequest
// // })

// class AmbientLightCharacteristic extends bleno.Characteristic {
//   constructor(uuid:) {
//     super();
//     this.uuid = uuid;
//     this.properties = ["read", "subscribe", "notify"];
//     this.value = Buffer.alloc(1);
//     this.onSubscribe = ambLightOnSubscribe;
//     this.onNotify = ambLightOnNotify;
//     this.onReadRequest = ambLightOnReadRequest;
//   }
// }

// function ambLightOnSubscribe(maxValueSize, updateValueCallback) {
//   console.log("subscribed to ambient light characteristic");
//   console.log("ambient light maxValueSize: " + maxValueSize);
// }

// function ambLightOnNotify() {
//   console.log("Notifying from ambient light sensor");
// }

// function ambLightOnReadRequest(offset, callback) {
//   console.log("read request for ambient light sensor");
// }

// module.exports = AmbientLightCharacteristic;
