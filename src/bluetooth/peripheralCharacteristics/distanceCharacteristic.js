var bleno = require('bleno');

var DistanceCharacteristic = new bleno.Characteristic({
  uuid: 'fffffffffffffffffffffffffffffff0',
  properties: ["read", "subscribe", "notify"],
  value: Buffer.alloc(1),
  onSubscribe: distanceOnSubscribe,
  onNotify: distanceOnNotify,
  onReadRequest: distanceOnReadRequest
})

function distanceOnSubscribe(maxValueSize, updateValueCallback) {
  console.log("subscribed to distance characteristic");
  console.log("distance maxValueSize: " + maxValueSize);
}

function distanceOnNotify() {
  console.log("Notifying from distance sensor");
}

function distanceOnReadRequest(offset, callback) {
  console.log("read request for distance sensor");
}

module.exports = DistanceCharacteristic;
