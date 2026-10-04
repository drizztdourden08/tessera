/* @layer renderer-components @kind data */
import type { BrandMascot } from '../brand.type';
import { composePelago } from '../pelago/compose-pelago';
import { PELAGO_MOTION } from '../pelago/pelago-motion.constants';
import { PELAGO_PIECES } from '../pelago/pelago-pieces.constants';

const { sphereTop, sphereLeft, sphereRight, glint, eye, handLeft, handRight } = PELAGO_PIECES;

const ARCHIPELIA_MASCOT: BrandMascot = {
  name: 'Pelago',
  summary: 'The Archipelia mascot: three purple spheres that press into each other and drift apart, never still, with floating eyes and floating hands that follow a beat behind. It hovers over a ring of dots, after the Archipelia mark.',
  variants: [
    {
      id: 'pelago',
      name: 'Pelago',
      summary: 'At rest: the three spheres melted into one soft body, a glint on each, the eyes floating above and a hand floating at each side.',
      pieces: [sphereTop, sphereLeft, sphereRight, glint, eye, handLeft, handRight],
      compose: composePelago,
    },
  ],
  motion: PELAGO_MOTION,
};

export { ARCHIPELIA_MASCOT };
