// var bleno = require('bleno');

// const DistanceCharacteristic = require("./bluetooth/DistanceCharacteristic");
// const MotionCharacteristic = require("./bluetooth/MotionCharacteristic");
// const AmbientLightCharacteristic = require("./bluetooth/AmbientLightCharacteristic");


// var PrimaryService = bleno.PrimaryService;

// // function SensorService(name) {
// //   switch(name) {
// //     case "rb-0":
// //     case "rb-5":
// //       bleno.setServices([
// //         new PrimaryService({
// //           //will get UUID from process.env
// //           uuid: 'fffffffffffffffffffffffffffffff0',
// //
// //         })
// //       ])
// //   }
// //
// // }

// class SensorService extends PrimaryService {
//   constructor(uuid, name) {
//     super();
//     this.uuid = uuid;
//     switch (name) {
//       case "rb-0":
//       case "rb-5":
//         this.characteristics = [
//           new DistanceCharacteristic(),
//           new AmbientLightCharacteristic(),
//           new MotionCharacteristic()
//         ];
//         break;
//       case "rb-1":
//       case "rb-2":
//       case "rb-4":
//         this.characteristics = [
//           new MotionCharacteristic()
//         ];
//         break;
//       default:
//         console.log("Unexpected Error")
//     }
//   }
// }

// module.exports = SensorService;


// // switch statement for choosing prototype characteristics?
