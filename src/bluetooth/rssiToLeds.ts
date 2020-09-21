// /*  
//   Run this on all of the peripherals ( all fixtures except #4 )
//   Fixture 4 will be the central module.

//   This is used to test signal strength and align reflectors
// */

// // import bleno from "bleno";
// const bleno = require('bleno');

// const PrimaryService = bleno.PrimaryService;

// const testService = new PrimaryService({
//     uuid: 'fffffffffffffffffffffffffffffff0', // should get as env.var
//     characteristics: [
//         // see Characteristic for data type
//     ]
// });

// bleno.on('stateChange', function(state: String) {
//   if (state === 'poweredOn') {
//     // We will also advertise the service ID in the advertising packet, so it's easier to find.
//     bleno.startAdvertising(name, [testService.uuid], function(err: any) {
//       if (err) {
//         console.log(err);
//       }
//     });
//   }
//   else {
//     bleno.stopAdvertising();
//   }
// });

// bleno.on('advertisingStart', function(err: any) {
//   if (!err) {
//     console.log('advertising...');
//     //
//     // Once we are advertising, it's time to set up our services,
//     // along with our characteristics.
//     //
//     bleno.setServices([
//       testService
//     ]);
//   }
// });