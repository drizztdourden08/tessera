/* @layer renderer-components @kind data */
import type { BrandMascot } from '../brand.type';
import { composeFlint } from '../flint/compose-flint';
import { FLINT_MOTION } from '../flint/flint-motion.constants';
import { FLINT_PIECES } from '../flint/flint-pieces.constants';

const { body, eye, mouth, handLeft, handRight } = FLINT_PIECES;

const BROCK_MASCOT: BrandMascot = {
  name: 'Flint',
  summary: 'The Brock mascot: a small round stone cut in flat facets like the Brock logo, with its orange chip, a flat base it sits on and two stone hands. It is drawn in smooth vector facets, built in code from its pieces, so a scene can turn its hands and move its eyes and smile without new art.',
  variants: [
    {
      id: 'flint',
      name: 'Flint',
      summary: 'At rest, sitting on its flat base: the hands float at its sides, the eyes and the smile sit on its front facet.',
      pieces: [body, eye, mouth, handLeft, handRight],
      compose: composeFlint,
    },
  ],
  motion: FLINT_MOTION,
};

export { BROCK_MASCOT };
