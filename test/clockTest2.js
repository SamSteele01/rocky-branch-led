let count = 0;
const FPS = 30;
console.log('FPS', FPS);

const NS_PER_SEC = 1e9;
const iterations = 300;

const interval = 1000 / FPS; // 1 second / FPS
console.log('INTERVAL', interval);

const start = process.hrtime();
let now = [];
let pause = [];

while (count < 1000) {
  now = process.hrtime();
  setTimeout(() => {
    count += 1;
  }, 10); // do some calc
  pause = process.hrtime(now);
  setTimeout(() => {
    // nada
  }, interval - (pause[0] * NS_PER_SEC + pause[1]) / 1e6);
}

// function exit() {
const diff = process.hrtime(start);

const totalTime = diff[0] * NS_PER_SEC + diff[1];
console.log('TOTALTIME (ns)', totalTime);

const timePerInterval = totalTime / 1e6 / iterations; // ms
console.log('TIMEPERINTERVAL (ms)', timePerInterval);

const trueFPS = 1000 / timePerInterval;
console.log('TRUEFPS', trueFPS);
// }
