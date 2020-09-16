const bleno = require('bleno');

var PrimaryService = bleno.PrimaryService;

// state = <"unknown" | "resetting" | "unsupported" | "unauthorized" | "poweredOff" | "poweredOn">
//
// bleno.on('stateChange', callback(state));
//
// bleno.on('advertisingStart', callback(error));
//
// bleno.on('advertisingStartError', callback(error));
//
// bleno.on('advertisingStop', callback);
//
// bleno.on('advertisingStop', callback);
//
// bleno.on('servicesSet', callback(error));
//
// bleno.on('servicesSetError', callback(error));
//
// bleno.on('accept', callback(clientAddress)); // not available on OS X 10.9
//
//
// bleno.on('disconnect', callback(clientAddress)); // Linux only
//
// bleno.on('rssiUpdate', callback(rssi)); // not available on OS X 10.9

var name = "rb-0"; //uuid- rb-0 through rb-5 for each pi
//UUID generated from guidgenerator.com
// unsure if we are using a pre-defined UUID or generating one ourselves
// eventually will be in process.env
var serviceUuids = ["ca039092-a517-4c2b-90b5-0976fc2e8726"];

// state must be poweredOn to start advertising
bleno.on('stateChange', (state) => {
  console.log('on stateChange ' + state);

  if(state === 'poweredOn') {
    bleno.startAdvertising(name, serviceUUids[, (error) => if(error) console.log(error)]);

  }
});




var PrimaryService = new PrimaryService({
  uuid: serviceUUids[0],

})
