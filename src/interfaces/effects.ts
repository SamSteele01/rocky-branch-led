export interface ISensorData {
  motion: Buffer;
  distance: Buffer;
  ambientLight: Buffer;
  // sound: Buffer
}

export interface IPhysicalLED {
  strip: string; // Enum ['edgeLitNorth', 'edgeLitSouth', 'infinityMirrorNE', 'infinityMirrorSW']
  position: number;
  orientation: string; // Enum ['north', 'south', 'east', 'west']
  location: {
    x: number;
    y: number;
  };
}

export interface ISharedArrayBuffers {
  edgeLitNorth?: SharedArrayBuffer;
  edgeLitSouth?: SharedArrayBuffer;
  infinityMirrorNE?: SharedArrayBuffer;
  infinityMirrorSW?: SharedArrayBuffer;
}

export interface DynamicObject {
  [key: string]: SharedArrayBuffer;
}
