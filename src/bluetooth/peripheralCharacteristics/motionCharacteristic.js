var bleno = require('bleno');

var MotionCharacteristic = new bleno.Characteristic({
  uuid: 'fffffffffffffffffffffffffffffff0',
  properties: ["read", "subscribe", "notify"],
  // secure: []     - do we need security?
  //value is buffer?  Where is this assigned?
  value: Buffer.alloc(1),
  onSubscribe: motionOnSubscribe,
  onNotify: motionOnNotify,
  onReadRequest: motionOnReadRequest
})

function motionOnSubscribe(maxValueSize, updateValueCallback) {
  console.log("subscribed to MotionCharacteristic");
  console.log("motion maxValueSize: " + maxValueSize);
}

function motionOnNotify() {
  console.log("Notfying from motion sensor");
}

function motionOnReadRequest(offset, callback) {
  console.log("read request for motion sensor");
}

module.exports = MotionCharacteristic;
