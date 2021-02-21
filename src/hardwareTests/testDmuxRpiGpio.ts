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
      speedHz: 2097152, // 2097152, 4194304
    },
  ];
  spiInstance.transfer(message, cb);
};

const channels: LEDStripRpiGpio[] = [];
channels[0] = new LEDStripRpiGpio(spiInstance, gpiop, 100, {
  channel: 0,
  pinA,
  pinB,
});
channels[1] = new LEDStripRpiGpio(spiInstance, gpiop, 100, {
  channel: 1,
  pinA,
  pinB,
});
channels[2] = new LEDStripRpiGpio(spiInstance, gpiop, 100, {
  channel: 2,
  pinA,
  pinB,
});
channels[3] = new LEDStripRpiGpio(spiInstance, gpiop, 100, {
  channel: 3,
  pinA,
  pinB,
});

// interface RGBA [
//
// ]

let channel0Color: [number, number, number, number] = [150, 0, 0, 1];
let channel1Color: [number, number, number, number] = [0, 150, 0, 1];
let channel2Color: [number, number, number, number] = [0, 0, 150, 1];
let channel3Color: [number, number, number, number] = [75, 75, 0, 1];

// create "clock" to write to each channel, staggered
function createChannelClock() {
  let writeChannel = 0;
  return setInterval(() => {
    switch (writeChannel) {
      case 0:
        channels[writeChannel].all(...channel0Color);
        break;
      case 1:
        channels[writeChannel].all(...channel1Color);
        break;
      case 2:
        channels[writeChannel].all(...channel2Color);
        break;
      case 3:
        channels[writeChannel].all(...channel3Color);
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

// async function turnOffLEDs() {
//   let writeChannel = 0;
//   const offInt = setInterval(() => {
//     // channels[writeChannel].all(0, 0, 0, 0);
//     channels[writeChannel].off();
//     // channels[writeChannel].sync();
//
//     if (writeChannel >= 3) {
//       clearInterval(offInt);
//       return;
//     } else {
//       writeChannel += 1;
//     }
//   }, 300);
// }

async function turnOffLEDs() {
  console.log('turning off');
  channel0Color = [0, 0, 0, 0];
  channel1Color = [0, 0, 0, 0];
  channel2Color = [0, 0, 0, 0];
  channel3Color = [0, 0, 0, 0];
  return setTimeout(() => {
    return;
  }, 1000);
}

const clock = createChannelClock();

// turnOffLEDs(); // errors

process.on('SIGINT', async () => {
  await turnOffLEDs();
  clearInterval(clock);
  gpiop.destroy((err) => {
    if (err) console.log(err);
  });
});
