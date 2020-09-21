/**
Length of a tick in milliseconds. The denominator is your desired framerate.
e.g. 1000 / 20 = 20 fps,  1000 / 60 = 60 fps
*/
const fps = 30;
const tickLengthMs = 1000 / fps;
const test = 500;
let count = 0;

/* gameLoop related letiables */
// timestamp of each loop
let firstTick = (previousTick = Date.now());
// number of times gameLoop gets called
// let actualTicks = 0;
let delta = 0;
let now = 0;

export const gameLoop = function (clockTick) {
  now = Date.now();
  // actualTicks++;
  delta = now - previousTick;

  if (previousTick + tickLengthMs <= now) {
    previousTick = now;

    // update(delta);
    clockTick();

    // console.log(
    //   'delta',
    //   delta,
    //   '(target: ' + tickLengthMs + ' ms)',
    //   'node ticks',
    //   actualTicks,
    // );
    // actualTicks = 0;
  }

  if (delta < tickLengthMs - 16) {
    setTimeout(gameLoop);
  } else {
    setImmediate(gameLoop);
  }
};

/**
Update is normally where all of the logic would go. In this case we simply call
a function that takes 10 milliseconds to complete thus simulating that our game
had a very busy time.
*/
const update = function (delta) {
  if (count >= test) {
    console.log('Avg delta: ', (Date.now() - firstTick) / test);
    process.exit();
  }
  count += 1;
  aVerySlowFunction(10);
};

/**
A function that wastes time, and occupies 100% CPU while doing so.
Suggested use: simulating that a complex calculation took time to complete.
*/
const aVerySlowFunction = function (milliseconds) {
  // waste time
  let start = Date.now();
  while (Date.now() < start + milliseconds) {}
};

// begin the loop !
gameLoop();
