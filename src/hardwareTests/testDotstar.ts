import * as dotstar from '../LEDs/dotstar';

// does work
import { SPI, Mode, Order } from 'spi-node';

/* connect SPI 0 to the demultiplexer. CS doesn't matter */
let spi: SPI;
try {
  spi = SPI.fromDevicePath('/dev/spidev0.0')
    .setMode(Mode.M0) // M0 or M3
    .setOrder(Order.MSB_FIRST)
    .setSpeed(4194304); // 2097152, 4194304

  console.log('SPI', spi);
} catch (error) {
  console.log('ERROR', error);
  process.exit(1);
}

const testStrip = new dotstar.Dotstar(spi, { length: 14 });
// console.log('TESTSTRIP', testStrip);
// const testStrip = new dotstar.Dotstar(spiInstance, { length: 144 });

testStrip.off();
testStrip.all(0, 255, 0, 1);
testStrip.sync();

const interval = setInterval(() => {
  // console.log('running...');
  // testStrip.all(0, 0, 0, 0);
  testStrip.all(0, 255, 0, 0.2);
  // console.log(0, 255, 0, 0.2);

  testStrip.sync();
}, 500);

function shutdown() {
  // testStrip.all(0, 0, 0, 0)
  clearInterval(interval);
  testStrip.off();
  // testStrip.sync();
  // testStrip.sync();
  setTimeout(() => {
    console.log('spi.close()');
    spi.close();
  }, 800);
  // spiInstance.closeSync();
}

process.on('SIGINT', () => {
  shutdown();
});

process.on('SIGTERM', () => {
  shutdown();
});
