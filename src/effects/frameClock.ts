/**
Length of a tick in milliseconds. The denominator is your desired framerate.
e.g. 1000 / 20 = 20 fps,  1000 / 60 = 60 fps
*/
import EventEmitter from 'events'

export const clockEmitter = new EventEmitter()
const fps = 30
const tickLengthMs = 1000 / fps

/* gameLoop related letiables */
let previousTick = Date.now()
let delta = 0
let now = 0

export const frameClock = function (): any {
  now = Date.now()
  delta = now - previousTick

  if (previousTick + tickLengthMs <= now) {
    previousTick = now

    clockEmitter.emit('tick')
  }

  if (delta < tickLengthMs - 16) {
    setTimeout(frameClock)
  } else {
    setImmediate(frameClock)
  }
}

clockEmitter.once('attached', () => {
  console.log('yep')
})
