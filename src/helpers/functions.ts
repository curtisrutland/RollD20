export function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function floorTo1(val: number) {
  return val > 1 ? Math.floor(val) : 1;
}