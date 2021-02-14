/**
  Extend the Dotstar class to have multiple instances used with a demultiplexer chip, in this case 4 channels.
*/

/* connection to the LEDs */
import * as dotstar from './dotstar';

/* board GPIO access */
import Rpio from 'rpio';

/* channel will be different for each LED strip. pinA and pinB will be the same for all. */
export interface DeMultiPlexer {
  channel: number; // 0 - 3
  pinA: number;
  pinB: number;
}

/* extend Dotstar to take demultiplexer channel and pins to use */
export default class LEDStrip extends dotstar.Dotstar {
  rpio: Rpio;
  length: number;
  channel: number;
  outputA: number;
  outputB: number;
  pinA: number;
  pinB: number;

  constructor(
    spi: dotstar.ISpi,
    rpio: Rpio,
    ledStripLength: number,
    demultiplexer: DeMultiPlexer,
  ) {
    const options: dotstar.IDotstarOptions = { length: ledStripLength };
    super(spi, options);

    this.rpio = rpio;
    this.length = ledStripLength;
    this.channel = demultiplexer.channel;
    /* on = HIGH if channel is 1 or 3 */
    this.outputA = demultiplexer.channel % 2 ? rpio.HIGH : rpio.LOW;
    /* on = HIGH if channel is 2 or 3 */
    this.outputB = demultiplexer.channel > 1 ? rpio.HIGH : rpio.LOW;
    this.pinA = demultiplexer.pinA;
    this.pinB = demultiplexer.pinB;
  }

  /* override sync function that writes out to the MOSI */
  /* we need to do this to make sure that the instance of LEDStrip is talking to the correct LEDs */
  sync() {
    this.rpio.write(this.pinA, this.outputA);
    this.rpio.write(this.pinB, this.outputB);
    console.log(`Attempting to write to channel ${this.channel}`);
    // delay 20 ns. This is to allow the demultiplexer chip to change channels.
    // NOTE: there may be other delays in the hardware to take into account.
    super.sync();
  }
}
