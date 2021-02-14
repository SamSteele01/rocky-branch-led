import { SPI, Mode, Order } from 'spi-node';

/* connect SPI 0 to the demultiplexer. CS doesn't matter */
const spi = SPI.fromDevicePath('/dev/spidev0.0')
  .setMode(Mode.M0)
  .setOrder(Order.MSB_FIRST)
  .setSpeed(1e7);

const testBuffer = Buffer.from('test');
console.log('TESTBUFFER', testBuffer);

const t = spi.transfer(testBuffer, 1);
console.log('T', t);

spi.read(5).then((data) => {
  console.log(data);
});
