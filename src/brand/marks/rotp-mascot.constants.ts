/* @layer renderer-components @kind data */
import type { BrandMascot } from '../brand.type';
import { composeHookshop } from '../hookshop/compose-hookshop';
import { HOOKSHOP_BAG } from '../hookshop/hookshop-bag.constants';
import { HOOKSHOP_EFFECTS } from '../hookshop/hookshop-effects.constants';
import { HOOKSHOP_STAMP } from '../hookshop/hookshop-stamp.constants';
import { HOOKSHOT_PIECES } from '../hookshop/hookshot-pieces.constants';
import { composeSentri } from '../sentri/compose-sentri';
import { SENTRI_PIECES } from '../sentri/sentri-pieces.constants';

const { body, visor, eye, podLeft, podRight } = SENTRI_PIECES;
const { handle, linkFace, linkEdge, head } = HOOKSHOT_PIECES;
const { sparkle, star, speedLine } = HOOKSHOP_EFFECTS;

const ROTP_MASCOT: BrandMascot = {
  name: 'Sentri',
  summary: 'The Relic of the Past mascot: a gold pyramid with a visor, two eyes and two pods. It is built in code from its pieces, so a scene can turn its pods and move its eyes without new art.',
  variants: [
    {
      id: 'sentri',
      name: 'Sentri',
      summary: 'At rest, every piece where the app puts it: pods behind the body, the visor on the face, the eyes inside the visor.',
      pieces: [podLeft, podRight, body, visor, eye],
      compose: composeSentri,
    },
    {
      id: 'hookshop',
      name: 'Hookshop',
      summary: 'The Hookshop highlight: Sentri leans back and pulls a shop bag in with its hookshot. The bag wears the logo as its stamp, and the hookshot\'s head goes in behind the bag\'s front face.',
      pieces: [HOOKSHOP_BAG, HOOKSHOP_STAMP, handle, linkFace, linkEdge, head, star, sparkle, speedLine],
      compose: composeHookshop,
    },
  ],
};

export { ROTP_MASCOT };
