interface IledSection {
  length: number // of pixels
  direction: string // N, S, E, W or -x, x, -y, y
  orientation: string // N, S, E, W or -x, x, -y, y (90 degrees off from direction)
  spacing: number 
}

interface Ipixel {
  index: number
  position: { x: number, y: number }
  orientation: string // N, S, E, W or -x, x, -y, y
}

interface IledStrip {
  length: number
  stripArray: Ipixel[]
  channel: number // 0 - 3
}

/**
  @input: instances of LedSection -> 
  @return: StripArray or LedStrip
*/
export function createStrip() {
  
  
}

/**
  @input: instances of StripArray -> FixtureArray
*/