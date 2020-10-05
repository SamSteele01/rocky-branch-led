/*
  run this with:
  $ ts-node testEffects.ts
  so you don't have to compile
*/

import { pulse, waves } from './functions';
import { frameClock, clockEmitter } from './frameClock';

const time = 0;

frameClock();

const startTime = Date.now();

clockEmitter.on('tick', (now) => {
  // console.log('NOW', (now - startTime) / 1000);
  // console.log(pulse(now, 3000));
  // console.log(waves(now, startTime, 3, 20, 20));
  console.log(waves(now, startTime, 10, 40, 100));
});
