/*
  
*/

export class EffectsLoader {
  // state
  effect: () => void;
  count: number;
  
  constructor(...stripBuffers) {
    // should be 4 stripBuffers: edgeLitNorth, edgeLitSouth, infinityMirrorNE, infinityMirrorSW
    // maybe concat stripBuffers to create fixtureArray ??
  }
  
  /* effect is a function (or object of functions) that can search the fixtureArray to get the affected
     pixels, and then mutate the this.stripBuffers
  */
  loadEffect(effect: () => void) {
    this.effect = effect;
  }
  
  apply(...inputs) {
    
  }
  
  
}