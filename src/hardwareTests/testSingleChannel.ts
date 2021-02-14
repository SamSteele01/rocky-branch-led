import * as dotstar from '../LEDs/dotstar';

// import LedStrip from '../LEDs/LEDStrip';
// const rpio = require('rpio');
import { SPI, Mode, Order } from 'spi-node';

/* connect SPI 0 to the demultiplexer. CS doesn't matter */
const spi = SPI.fromDevicePath('/dev/spidev0.0')
  .setMode(Mode.M0)
  .setOrder(Order.MSB_FIRST)
  .setSpeed(2097152);

// initialize rpio
// rpio.init({close_on_exit: false});
// rpio.open(31, rpio.OUTPUT, rpio.LOW);
// rpio.open(32, rpio.OUTPUT, rpio.LOW);

// GPIO_5 = pin 29, GPIO_6 = pin 31 GPIO_12 = pin 32
// const channel = new LedStrip(spi, rpio, 144, {
//   channel: 1,
//   pinA: 31,
//   pinB: 32,
// });

const channel = new dotstar.Dotstar(spi, { length: 144 });

// create "clock" to write to each channel, staggered
const rgb = [
  [200, 0, 0, 1],
  [0, 200, 0, 1],
  [0, 0, 200, 1],
];

let color: number[] = [0, 0, 0, 0];
let index = 0;

const cycleColors = setInterval(() => {
  color = rgb[index];
  index += 1;
  if (index >= 3) index = 0;
}, 1000);

const clock = setInterval(() => {
  console.log(color);
  channel.all(color[0], color[1], color[2], color[3]);

  channel.sync();
}, 150);

function shutdown() {
  clearInterval(clock);
  clearInterval(cycleColors);
  channel.clear();
  channel.sync();
  channel.sync();
  spi.close();
}

process.on('SIGINT', () => {
  shutdown();
});

process.on('SIGTERM', () => {
  shutdown();
});
