var bleno = require('@abandonware/bleno');

// var bleno = new Bleno();


//constructor, then create 'new'
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

var serviceName = "rb-0"; //uuid- rb-0 through rb-5 for each pi
//UUID generated from guidgenerator.com
// unsure if we are using a pre-defined UUID or generating one ourselves
// eventually will be in process.env?
// var serviceUuids = ["fffffffffffffffffffffffffffffff0"];
//define characteristics and then add to services
// export const testService
//export characteristics
const testService = new PrimaryService({
  uuid: 'e6a3e7ac-6050-43a4-9e94-5af9c81ed6c3', // should get as env.var
  characteristics: [
    // see Characteristic for data type
  ]
});

var errorCallBack = function(err: any) {
  if(err) {
    console.log(err);
  }
}

var shouldPrint = false;

function broadcast(message: String) {
  shouldPrint = true;
  var broadcastInterval = setInterval(() => {
    if(!shouldPrint) {
      clearInterval(broadcastInterval);
    }
    console.log(`${message}\n`);
  }, 1000);
}

function stopBroadcast() {
  shouldPrint = false;
}


// rb-0 - distance, ambient light, motion
// rb-1 - rb-4 - motion
// rb-5 - distance, ambient light, motion

// state must be poweredOn to start advertising
bleno.on('stateChange', (state: String) => {
  console.log('on stateChange ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising(serviceName, testService.uuid, function(err: any) {
      if(err) {
        console.log(err);
      }
    });
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', (err: any) => {
  if (err) {
    console.log(err);
  } else {
    broadcast("advertising " + serviceName);
    bleno.setServices([
      testService
    ])
  }
})

bleno.on('accept', (clientAddress: String) => {
  console.log(`clientAddress ${clientAddress} accepted`);
  stopBroadcast();
  console.log("accepted");

  //stop advertising? (is automatic?)
})

bleno.on('disconnect', (clientAddress: String) => {
  console.log(`clientAddress ${clientAddress} disconnected`);
  //try to reconnect
})

module.exports = bleno;
