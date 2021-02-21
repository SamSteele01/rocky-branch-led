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

// return a single value between 0 and 255
// currentTime and totalTime are in milliseconds
export function pulse(currentTime: number, totalTime: number = 5000): number {
  return Math.round(
    (Math.sin(Math.PI * 2 * (currentTime / totalTime)) + 1) * 127.5,
  );
}

// have sine waves move up or down a strip of LEDs
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
