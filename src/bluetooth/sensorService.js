var bleno = require('bleno');

var PrimaryService = bleno.PrimaryService;

// function SensorService(name) {
//   switch(name) {
//     case "rb-0":
//     case "rb-5":
//       bleno.setServices([
//         new PrimaryService({
//           //will get UUID from process.env
//           uuid: 'fffffffffffffffffffffffffffffff0',
//
//         })
//       ])
//   }
//
// }

class SensorService extends PrimaryService {
  constructor(uuid) {
    super();
    this.uuid = uuid;
    this.characteristics = characteristics;
  }
}

module.exports = SensorService;


// switch statement for choosing prototype characteristics?
