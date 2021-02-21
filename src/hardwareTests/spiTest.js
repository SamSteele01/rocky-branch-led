var rpio = require('rpio');

rpio.spiBegin();

var tx = Buffer.from('HELLOSPI');
var rx = Buffer.alloc(tx.length);
//
// var rxBuffer = rpio.spiTransfer(txbuf, rxbuf, txbuf.length);
// var rxBuffer = rpio.spiTransfer(new Buffer('HELLOSPI'),  8);

// for (var i = 0; i <= 7; i++) {
//   process.stdout.write(
//     String.fromCharCode(rxBuffer[i]) + (i == 7 ? '\n' : ' '),
//   );
// }

// var tx = new Buffer([0x3, 0x0, 0x0, 0x0]);
// var rx = new Buffer(4);
// var out;
// var i,
//   j = 0;
//
// for (i = 0; i < 128; i++, ++j) {
//   tx[1] = i;
//   rpio.spiTransfer(tx, rx, tx.length);
//   out = (rx[2] << 1) | (rx[3] >> 7);
//   process.stdout.write(out.toString(16) + (j % 16 == 0 ? '\n' : ' '));
// }

/* works */
// console.log('RX', rx);
// rpio.spiTransfer(tx, rx, tx.length);
// console.log('RX', rx);
// console.log('RX', rx.toString());

while (true) {
  rpio.spiWrite(tx, tx.length);
}

process.on('SIGINT', () => {
  rpio.spiEnd();
});
