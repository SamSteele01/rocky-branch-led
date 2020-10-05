/*
  * effects should be a function composed of many functions that has a standard list of arguments.
  * One idea is to pass the clockEmitter as an arg and return a stream that can be observed to write 
    to the LedBuffers.
  * Since some effects will need to have variables in memory as they run, perhaps each effect should
    be a Class, and the loadEffect function would destroy the previous one and create a new instance
    of the next Effect.
  * Each effect should have the args of (clockEmitter, sensorData, fixtureArray, sharedArrayBuffers[])
*/
import * as effects from './effects';

export class EffectsLoader {
  // state
  effect: () => void;
  count: number;

  constructor() {
    // should be 4 stripBuffers: edgeLitNorth, edgeLitSouth, infinityMirrorNE, infinityMirrorSW
    // maybe concat stripBuffers to create fixtureArray ??
  }

  /* effect is a function (or object of functions) that can search the fixtureArray to get the affected
     pixels, and then mutate the this.stripBuffers
  */
  loadEffect(effectId: string) {
    this.effect = effects[effectId];
  }

  apply() {}
}
