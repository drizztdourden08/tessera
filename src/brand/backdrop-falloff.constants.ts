/* @layer renderer-components @kind data */
const BACKDROP_FALLOFF: readonly (readonly [at: number, share: number])[] = [
  [0, 1], [12, 0.94], [24, 0.8], [36, 0.62], [48, 0.43], [60, 0.27], [72, 0.14], [84, 0.05], [100, 0],
];

export { BACKDROP_FALLOFF };
