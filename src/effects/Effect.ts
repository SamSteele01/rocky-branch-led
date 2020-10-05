/*
 * Each effect should have the args of:
    clockEmitter
    fixtureArray - to search by distance, orientation, of stripType
    sharedArrayBuffers - where to 
 */

import EventEmitter from 'events';
import {
  ISensorData,
  IPhysicalLED,
  ISharedArrayBuffers,
} from '../interfaces/effects';

export class Effect {
  clockEmitter: EventEmitter.EventEmitter;
  fixtureArray: IPhysicalLED[];
  sharedArrayBuffers: ISharedArrayBuffers;
  length: number;

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
    });
  }

  stop() {
    this.clockEmitter.removeListener('tick', () => {
      console.log('event stopped');
    });
  }
}
