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
// GPIO_5 = pin 29, GPIO_6 = pin 31
channels[0] = new LedStrip(pispi00, 20, { channel: 1, pinA: 31 , pinB: 32 })
channels[1] = new LedStrip(pispi00, 20, { channel: 2, pinA: 31 , pinB: 32 })
channels[2] = new LedStrip(pispi00, 20, { channel: 3, pinA: 31 , pinB: 32 })
channels[3] = new LedStrip(pispi00, 20, { channel: 4, pinA: 31 , pinB: 32 })

// create "clock" to write to each channel, staggered
function createChannelClock(millisecondsPerFrame: number) {
  let writeChannel = 0
  return setInterval(() => {
    // switch (writeChannel) {
    //   case 0:
    // 
    //     break;
    // 
    //   default:
    //     break;
    // }
    channels[writeChannel].all(0, 0, 200, 1);
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
