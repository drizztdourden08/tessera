/* @layer renderer-components @kind data */
import type { BrandMascot } from '../brand.type';
import { composePelago } from '../pelago/compose-pelago';
import { PELAGO_MOTION } from '../pelago/pelago-motion.constants';
import { PELAGO_PIECES } from '../pelago/pelago-pieces.constants';
import { PELAGO_REST } from '../pelago/pelago-rest.constants';

const { aura, rock, halo, crystal, eye, spark, pebbleA, pebbleB, pebbleC } = PELAGO_PIECES;

const ARCHIPELIA_MASCOT: BrandMascot = {
  name: 'Pelago',
  summary: 'The Archipelia mascot, an island spirit: a small floating island of faceted stone with a glowing crystal core for a face, four islets in orbit around it joined by threads of light, and pebbles drifting under it. It floats over a ring of dots, after the Archipelia mark.',
  variants: [
    {
      id: 'pelago',
      name: 'Pelago',
      summary: 'At rest: the island with its crystal face and two calm glowing eyes, the four islets on their threads of light, and three pebbles hanging below.',
      pieces: [aura, rock, halo, crystal, eye, ...PELAGO_REST.islets, spark, ...PELAGO_REST.threads, pebbleA, pebbleB, pebbleC].map((placed) => placed.piece),
      compose: composePelago,
    },
  ],
  motion: PELAGO_MOTION,
};

export { ARCHIPELIA_MASCOT };
