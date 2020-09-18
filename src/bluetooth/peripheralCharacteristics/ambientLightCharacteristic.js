var bleno = require('bleno');

var AmbientLightCharacteristic = new bleno.Characteristic({
  uuid: 'fffffffffffffffffffffffffffffff0',
  properties: ["read", "subscribe", "notify"],
  value: Buffer.alloc(1),
  onSubscribe: ambLightOnSubscribe,
  onNotify: ambLightOnNotify,
  onReadRequest: ambLightOnReadRequest
})

function ambLightOnSubscribe(maxValueSize, updateValueCallback) {
  console.log("subscribed to ambient light characteristic");
  console.log("ambient light maxValueSize: " + maxValueSize);
}

function ambLightOnNotify() {
  console.log("Notifying from ambient light sensor");
}

function ambLightOnReadRequest(offset, callback) {
  console.log("read request for ambient light sensor");
}

module.exports = AmbientLightCharacteristic;
