/* 
  accept array of pixels, or length + offset, or other?
  @return array/object of r, g, b, a values
*/

interface Ipixel {
  r: number; // 0 - 255
  g: number; // 0 - 255
  b: number; // 0 - 255
  a: number; // 0.0 - 1.0
}

export function rainbowWheel(
  length: number,
  offset: number = 0,
): Array<Ipixel> {
  let array: Ipixel[] = [];

  const step = 256 / length; // float
  let position = 0;

  for (let i = 0; i < length; i++) {
    if (i < length / 3) {
      // green to red
      position = i * step;
      array[i] = {
        r: Math.round(position * 3),
        g: Math.round(255 - position * 3),
        b: 0,
        a: 1,
      };
    } else if (i < (length * 2) / 3) {
      // red to blues
      position = (i - length / 3) * step;
      array[i] = {
        r: Math.round(255 - position * 3),
        g: 0,
        b: Math.round(position * 3),
        a: 1,
      };
    } else {
      // blue to green
      position = (i - (length * 2) / 3) * step;
      array[i] = {
        r: 0,
        g: Math.round(position * 3),
        b: Math.round(255 - position * 3),
        a: 1,
      };
    }
  }

  return array.slice(offset, length).concat(array.slice(0, offset));
}

// return a single value between 0 and 255
// currentTime and totalTime are in milliseconds
export function pulse(currentTime: number, totalTime: number = 5000): number {
  return Math.round(
    (Math.sin(Math.PI * 2 * (currentTime / totalTime)) + 1) * 127.5,
  );
}

// have sin waves move up or down a strip of LEDs
// propagationSpeed is in pixels/second and can be negative
// waveLength is in pixels. pixels / waveLength will give the number of waves on the strip.
// If waveLength > pixels the strip will be a 'window' that watches the waves go by.
// Either return Ipixel[] or number[] and then have to merge with Ipixel[] later ??
export function waves(
  currentTime: number,
  startTime: number,
  propagationSpeed: number,
  pixels: number,
  waveLength: number,
): number[] {
  const offset = propagationSpeed * ((currentTime - startTime) / 1000);
  let array: number[] = [];
  let x = 0;

  for (let i: number = 0; i < pixels; i++) {
    // NOTE: could take direction as an arg. - offset vs + offset
    x = (i - offset) / waveLength;
    array[i] = Math.round((Math.sin(Math.PI * 2 * x) + 1) * 127.5);
  }

  return array;
}
