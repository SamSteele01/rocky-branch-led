/*
 * Each effect should have the args of (clockEmitter, sensorData, fixtureArray, sharedArrayBuffers[])
 */

import EventEmitter from 'events';
import { Effect } from './Effect';
import {
  ISensorData,
  IPhysicalLED,
  ISharedArrayBuffers,
  DynamicObject,
} from '../interfaces/effects';
import * as funct from './functions';

/* This will work with either the Infinity Mirror or the Edge Lit Glass. Either way that is 2 of the
  four arrayBuffers.
 */
export class SpinningRainbowWheel extends Effect {
  direction: string;
  speed: number;

  constructor(
    clockEmitter: EventEmitter.EventEmitter,
    fixtureArray: IPhysicalLED[],
    sharedArrayBuffers: ISharedArrayBuffers,
    medium: string, // ['infinityMirror', 'edgeLit']
    direction: string, // clockwise (CW) or counterClockWise(CCW)
    speed: number, // pixels per second
  ) {
    let arrayBuffers: DynamicObject = {};

    if (medium === 'infinityMirror') {
      arrayBuffers.infinityMirrorNE = sharedArrayBuffers.infinityMirrorNE;
      arrayBuffers.infinityMirrorSW = sharedArrayBuffers.infinityMirrorSW;
    }
    if (medium === 'edgeLit') {
      arrayBuffers.edgeLitNorth = sharedArrayBuffers.edgeLitNorth;
      arrayBuffers.edgeLitSouth = sharedArrayBuffers.edgeLitSouth;
    }

    super(clockEmitter, fixtureArray, arrayBuffers);
    this.direction = direction;
    this.speed = speed;
  }

  run() {
    // override
  }
}
