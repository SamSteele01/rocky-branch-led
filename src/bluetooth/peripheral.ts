const bleno = require('bleno');

state = <"unknown" | "resetting" | "unsupported" | "unauthorized" | "poweredOff" | "poweredOn">

bleno.on('stateChange', callback(state));

bleno.on('advertisingStart', callback(error));

bleno.on('advertisingStartError', callback(error));

bleno.on('advertisingStop', callback);

bleno.on('advertisingStop', callback);

bleno.on('servicesSet', callback(error));

bleno.on('servicesSetError', callback(error));

bleno.on('accept', callback(clientAddress)); // not available on OS X 10.9


bleno.on('disconnect', callback(clientAddress)); // Linux only

bleno.on('rssiUpdate', callback(rssi)); // not available on OS X 10.9
