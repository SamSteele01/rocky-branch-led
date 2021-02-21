/*
 * Each effect should have the args of:
    clockEmitter
    fixtureArray - to search by distance, orientation, of stripType
    sharedArrayBuffers - where to 
 */

import EventEmitter from 'events';
import { IPhysicalLED, ISharedArrayBuffers } from '../interfaces/effects';

export class Effect {
  clockEmitter: EventEmitter.EventEmitter; // ?
  fixtureArray: IPhysicalLED[]; // for searches
  sharedArrayBuffers: ISharedArrayBuffers; // outputs
  length: number;

  // motion
  // searchResults

  constructor(
    clockEmitter: EventEmitter.EventEmitter,
    fixtureArray: IPhysicalLED[],
    sharedArrayBuffers: ISharedArrayBuffers,
  ) {
    this.clockEmitter = clockEmitter;
    this.fixtureArray = fixtureArray;
    this.sharedArrayBuffers = sharedArrayBuffers;
    // calculate length based on which sharedArrayBuffers are passed
  }

  run() {
    this.clockEmitter.on('tick', (now: Date) => {
      // update state
      // fire functions
      // update sharedArrayBuffers
      const data = pulse(300, spin(rainbowWheel(now, start), dunno));
    });
  }

  stop() {
    this.clockEmitter.removeListener('tick', () => {
      console.log('event stopped');
    });
  }
}
