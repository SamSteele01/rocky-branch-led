var bleno = require('bleno');

var PrimaryService = bleno.PrimaryService;

function SensorService(name) {
  switch(name) {
    case "rb-0":
    case "rb-5":
      bleno.setServices([
        new PrimaryService({
          //will get UUID from process.env
          uuid: 'fffffffffffffffffffffffffffffff0',

        })
      ])
  }

}
