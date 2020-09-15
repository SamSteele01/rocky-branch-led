import LedStrip from "../LEDs/LEDStrip"
import rpio = require('rpio');
import { SPI, Mode, Order } from 'spi-node'

/* connect SPI 0 to the demultiplexer. CS doesn't matter */
const spi = SPI.fromDevicePath('/dev/spidev0.0')
  .setMode(Mode.M0)
  .setOrder(Order.MSB_FIRST)
  .setSpeed(1e7)

// initialize rpio
// rpio.init({close_on_exit: false});
rpio.open(31, rpio.OUTPUT, rpio.LOW);
rpio.open(32, rpio.OUTPUT, rpio.LOW);

let channels: LedStrip[] = [];
// GPIO_5 = pin 29, GPIO_6 = pin 31 GPIO_12 = pin 32
channels[0] = new LedStrip(spi, 20, { channel: 0, pinA: 31 , pinB: 32 })
channels[1] = new LedStrip(spi, 20, { channel: 1, pinA: 31 , pinB: 32 })
channels[2] = new LedStrip(spi, 20, { channel: 2, pinA: 31 , pinB: 32 })
channels[3] = new LedStrip(spi, 20, { channel: 3, pinA: 31 , pinB: 32 })

// create "clock" to write to each channel, staggered
function createChannelClock(millisecondsPerFrame: number) {
  let writeChannel = 0
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
  }, millisecondsPerFrame / 4);
}

const clock = createChannelClock(32);

process.on("SIGINT", () => {
  clearInterval(clock);
  // rpio.exit();
});
