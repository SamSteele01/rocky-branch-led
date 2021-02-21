/* motion functions */

export function alongStrip(
  currentTime: number,
  startTime: number,
  propagationSpeed: number,
  // direction ??
): number {
  const offset = propagationSpeed * ((currentTime - startTime) / 1000);
  return offset;
}

// either local to one fixture or take into account the tunnel
export function alongXAxis(
  currentTime: number,
  startTime: number,
  propagationSpeed: number,
  // direction ??
): number {
  // do stuff
  // return y
}
