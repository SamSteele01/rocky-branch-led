const bleno = require('bleno');

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
var serviceUuids = ["ca039092-a517-4c2b-90b5-0976fc2e8726"]; //UUID generated from guidgenerator.com

// state must be poweredOn to start advertising
bleno.on('stateChange', (state) => {
  console.log('on stateChange ' + state);

  if(state === 'poweredOn') {
    bleno.startAdvertising(name, serviceUUids[, (error) => if(error) console.log(error)]);
    
  }
})
