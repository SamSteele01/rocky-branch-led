let count = 0;
const FPS = 30;
const compensation = 0;
console.log('FPS', FPS);
console.log('COMPENSATION', compensation);
// 0.18 for 30 fps
// 0.1 for 45 fps
// 0.1 for 60 fps

const NS_PER_SEC = 1e9;
const iterations = 300;

const interval = 1000 / FPS; // 1 second / FPS
console.log('INTERVAL', interval);

const time = process.hrtime();
let prev = process.hrtime();

const loop = setInterval(() => {
  if (count >= iterations) {
    exit();
  }
  now = Date.now();
  console.log(now - prev);
  prev = now;
  count += 1;
}, interval - interval * compensation);

function exit() {
  const diff = process.hrtime(time);
  clearInterval(loop);

  const totalTime = diff[0] * NS_PER_SEC + diff[1];
  // console.log('TOTALTIME (ns)', totalTime);

  const timePerInterval = totalTime / 1e6 / iterations; // ms
  // console.log('TIMEPERINTERVAL (ms)', timePerInterval);

  const trueFPS = 1000 / timePerInterval;
  console.log('TRUEFPS', trueFPS);
}
