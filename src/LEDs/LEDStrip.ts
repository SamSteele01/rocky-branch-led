/**
  
*/

/* connection to the LEDs */
import * as dotstar from './dotstar'

/* board GPIO access */
import * as rpio from 'rpio'

/* channel will be different for each LED strip. pinA and pinB will be the same for all. */
export interface DeMultiPlexer {
  channel: number;
  pinA: number;
  pinB: number;
}

/* extend Dotstar to take demultiplexer channel and pins to use */
export default class LEDStrip extends dotstar.Dotstar {
  config: {
    onA: number; 
    // offA: string;
    onB: number; 
    // offB: string;
  };
  pinA: number;
  pinB: number;
  length: number;
  channel: number; 
  // constructor(ledStripLength: number, channel: number, pinA: number, pinB: number) {
  constructor(pispi: dotstar.ISpi, ledStripLength: number, demultiplexer: DeMultiPlexer) {

    const options: dotstar.IDotstarOptions = { length: ledStripLength };
    super(pispi, options);
    
    this.length = ledStripLength;
    this.channel = demultiplexer.channel;
    this.config = {
      /* on = HIGH if channel is 1 or 3 */
      onA: demultiplexer.channel % 2 ? 1 : 0,
      // offA: demultiplexer.channel % 2 ? 'LOW' : 'HIGH',
      
      /* on = HIGH if channel is 3 or 4 */
      onB: demultiplexer.channel > 2 ? 1 : 0,
      // offB: demultiplexer.channel > 2 ? 'LOW' : 'HIGH',
    }
    this.pinA = demultiplexer.pinA;
    this.pinB = demultiplexer.pinB;
  }

  /* override sync function that writes out to the MOSI */
  /* we need to do this to make sure that the instance of LEDStrip is talking to the correct LEDs */
  sync() {
    rpio.write(this.pinA, this.config.onA);
    rpio.write(this.pinB, this.config.onB);
    console.log(`Attempting to write to channel ${this.channel}`);

    // delay 20 ns
    setTimeout(() => {
      super.sync();
    }, 0.00002);
    // could pick one channel as the OFF channel and set back to it here, 
    // but is is probably not necessary and faster not to do so.
  }
  
}
