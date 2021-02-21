import LEDStripRpiGpio from '../LEDs/LEDStripRpiGpio';
import * as gpiop from 'rpi-gpio';
import * as spi from 'spi-device';

/* initialize gpio pins */
// GPIO_5 = pin 29, GPIO_6 = pin 31 GPIO_12 = pin 32

const pinA = 29; // GPIO 5
const pinB = 31; // GPIO 6

gpiop.setup(pinA, gpiop.DIR_OUT, (err, res) => {
  if (err) console.log('setup pin 29 error: ', err);
});

gpiop.setup(pinB, gpiop.DIR_OUT, (err, res) => {
  if (err) console.log('setup pin 29 error: ', err);
});

/* initialize spi instance */
const spiInstance = spi.openSync(0, 0);

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

const channels: LEDStripRpiGpio[] = [];
channels[0] = new LEDStripRpiGpio(spiInstance, gpiop, 20, {
  channel: 0,
  pinA,
  pinB,
});
channels[1] = new LEDStripRpiGpio(spiInstance, gpiop, 20, {
  channel: 1,
  pinA,
  pinB,
});
channels[2] = new LEDStripRpiGpio(spiInstance, gpiop, 20, {
  channel: 2,
  pinA,
  pinB,
});
channels[3] = new LEDStripRpiGpio(spiInstance, gpiop, 20, {
  channel: 3,
  pinA,
  pinB,
});

// create "clock" to write to each channel, staggered
function createChannelClock() {
  let writeChannel = 0;
  return setInterval(() => {
    switch (writeChannel) {
      case 0:
        channels[writeChannel].all(0, 0, 150, 1);
        break;
      case 1:
        channels[writeChannel].all(0, 150, 0, 1);
        break;
      case 2:
        channels[writeChannel].all(150, 0, 0, 1);
        break;
      case 3:
        channels[writeChannel].all(0, 0, 150, 1);
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
  }, 100);
}

async function turnOffLEDs() {
  channels[0].off();
  setTimeout(() => {
    channels[1].off();
  }, 100);
  setTimeout(() => {
    channels[2].off();
  }, 200);
  setTimeout(() => {
    channels[3].off();
    return;
  }, 300);
}

const clock = createChannelClock();

process.on('SIGINT', async () => {
  clearInterval(clock);
  await turnOffLEDs();
  gpiop.destroy((err) => {
    if (err) console.log(err);
  });
});
