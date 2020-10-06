/* motion functions */
export function alongStrip(
  currentTime: number,
  startTime: number,
  propagationSpeed: number,
): number[] {
  const offset = propagationSpeed * ((currentTime - startTime) / 1000);
  return offset;
}
