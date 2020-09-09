/**
  
*/

/* connection to the LEDs */
import * as dotstar from './dotstar'

/* board GPIO access */
// import rpio from 'rpio' // needs type definitions
const rpio = require('rpio');

/* device SPI access */
/* there are 2 options; might as well get them both */
import { spi } from 'spi-node' // C++ N-API addon
// const SPI_NODE = require('spi-node');

// import PI_SPI from 'pi-spi'  // needs type definitions
const PiSPI = require('pi-spi');

/* connect SPI 0 to the demultiplexer. CS doesn't matter */
let pispi00 = PiSPI.initialize('/dev/spidev0.0');

/* channel will be different for each LED strip. pinA and pinB will be the same for all. */
export interface DeMultiPlexer {
  channel: number;
  pinA: number;
  pinB: number;
}

/* extend Dotstar to take demultiplexer channel and pins to use */
export default class LEDStrip extends dotstar.Dotstar {
  config: {
    onA: string; 
    // offA: string;
    onB: string; 
    // offB: string;
  };
  pinA: number;
  pinB: number;
  length: number;
  
  // constructor(ledStripLength: number, channel: number, pinA: number, pinB: number) {
  constructor(ledStripLength: number, demultiplexer: DeMultiPlexer) {

    const options: dotstar.IDotstarOptions = { length: ledStripLength };
    super(pispi00, options);
    
    this.length = ledStripLength;
    this.config = {
      /* on = HIGH if channel is 1 or 3 */
      onA: demultiplexer.channel % 2 ? 'HIGH' : 'LOW',
      // offA: demultiplexer.channel % 2 ? 'LOW' : 'HIGH',
      
      /* on = HIGH if channel is 3 or 4 */
      onB: demultiplexer.channel > 2 ? 'HIGH' : 'LOW',
      // offB: demultiplexer.channel > 2 ? 'LOW' : 'HIGH',
    }
    this.pinA = demultiplexer.pinA;
    this.pinB = demultiplexer.pinB;
  }

  /* override sync function that writes out to the MOSI */
  /* we need to do this to make sure that the instance of LEDStrip is talking to the correct LEDs */
  sync() {
    rpio.open(this.pinA, rpio.OUTPUT, rpio[this.config.onA]);
    rpio.open(this.pinB, rpio.OUTPUT, rpio[this.config.onB]);
    super.sync();
    // could pick one channel as the OFF channel and set back to it here, 
    // but is is probably not necessary and faster not to do so.
  }
  
}
