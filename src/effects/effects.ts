/* 
  accept array of pixels, or length + offset, or other?
  @return array/object of r, g, b, a values
*/

interface Ipixel {
  r: number // 0 - 255
  g: number // 0 - 255
  b: number // 0 - 255
  a: number // 0.0 - 1.0
}

export function rainbowWheel(length: number, offset: number = 0): Array<Ipixel> {
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
      }
    } else if (i < length * 2 / 3) {
      // red to blues
      position = (i - length / 3) * step;
      array[i] = {
        r: Math.round(255 - position * 3),
        g: 0,
        b: Math.round(position * 3),
        a: 1,
      }
    } else {
      // blue to green
      position = (i - length * 2 / 3) * step;
      array[i] = {
        r: 0,
        g: Math.round(position * 3),
        b: Math.round(255 - position * 3),
        a: 1,
      }
    }
  }
  
  return array.slice(offset, length).concat(array.slice(0, offset));
}

// go from 0/off to color/on and back again in a set amount of time
export function pulse(): Array<Ipixel> {
  let array: Ipixel[] = [];
  
  
}
