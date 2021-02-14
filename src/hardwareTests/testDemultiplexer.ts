import LedStrip from '../LEDs/LEDStrip';
import * as rpio from 'rpio';
// import { SPI, Mode, Order } from 'spi-node';
import * as spi from 'spi-device';

const spiInstance = spi.open(0, 0, (err) => {
  if (err) throw err;
});

spiInstance.write = (buffer: Buffer, cb: (error: any, data: any) => void) => {
  const message: spi.SpiMessage = [
    {
      sendBuffer: buffer,
      byteLength: buffer.length,
      speedHz: 1e7,
    },
  ];
  spiInstance.transfer(message, cb);
};
/* connect SPI 0 to the demultiplexer. CS doesn't matter */
// const spi = SPI.fromDevicePath('/dev/spidev0.0')
//   .setMode(Mode.M0)
//   .setOrder(Order.MSB_FIRST)
//   .setSpeed(1e7);

// initialize rpio
// rpio.init({close_on_exit: false});
rpio.open(29, rpio.OUTPUT, rpio.LOW);
rpio.open(31, rpio.OUTPUT, rpio.LOW);
rpio.open(32, rpio.OUTPUT, rpio.LOW);

const channels: LedStrip[] = [];
// GPIO_5 = pin 29, GPIO_6 = pin 31 GPIO_12 = pin 32
channels[0] = new LedStrip(spiInstance, rpio, 20, {
  channel: 0,
  pinA: 29,
  pinB: 31,
});
channels[1] = new LedStrip(spiInstance, rpio, 20, {
  channel: 1,
  pinA: 29,
  pinB: 31,
});
channels[2] = new LedStrip(spiInstance, rpio, 20, {
  channel: 2,
  pinA: 29,
  pinB: 31,
});
channels[3] = new LedStrip(spiInstance, rpio, 20, {
  channel: 3,
  pinA: 29,
  pinB: 31,
});

// create "clock" to write to each channel, staggered
function createChannelClock() {
  let writeChannel = 0;
  return setInterval(() => {
    switch (writeChannel) {
      case 0:
        channels[writeChannel].all(0, 0, 200, 1);
        break;
      case 1:
        channels[writeChannel].all(0, 200, 0, 1);
        break;
      case 2:
        channels[writeChannel].all(200, 0, 0, 1);
        break;
      case 3:
        channels[writeChannel].all(150, 150, 150, 1);
        break;
      default:
        break;
    }
    channels[writeChannel].sync();

    if (writeChannel >= 3) {
      writeChannel = 0;
    } else {
      writeChannel += 1;
    }
  }, 32);
}

const clock = createChannelClock();

process.on('SIGINT', () => {
  clearInterval(clock);
  // rpio.exit();
});
