/* @layer renderer-components @kind data */
import type { BackdropGradient } from './backdrop-gradient.type';

const BACKDROP_GRADIENT: BackdropGradient = {
  glows: [
    { token: '--c-primary', strength: 30, at: [70, 30], reach: 55 },
    { token: '--c-secondary', strength: 35, at: [20, 90], reach: 60 },
  ],
  angle: 160,
  stops: ['--c-surface', '--c-bg'],
};

export { BACKDROP_GRADIENT };
