import LedStrip from "./LEDs/LEDStrip"
const rpio = require('rpio');

// initialize rpio
// rpio.init({close_on_exit: false});
rpio.open(29, rpio.OUTPUT, 'LOW');
rpio.open(31, rpio.OUTPUT, 'LOW');

let channels: LedStrip[] = [];
// GPIO_5 = pin 29, GPIO_6 = pin 31
channels[0] = new LedStrip(20, { channel: 0, pinA: 5 , pinB: 6 })
channels[1] = new LedStrip(20, { channel: 1, pinA: 5 , pinB: 6 })
channels[2] = new LedStrip(20, { channel: 2, pinA: 5 , pinB: 6 })

// create "clock" to write to each channel, staggered
function createChannelClock(millisecondsPerFrame: number) {
  let writeChannel = 0
  return setInterval(() => {
    
    channels[writeChannel].all(0, 0, 200, 1);
    channels[writeChannel].sync();
    
    if (writeChannel >= 2) {
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