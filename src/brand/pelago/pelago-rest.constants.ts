/* @layer renderer-components @kind data */
import { isletPiece } from './islet-piece';
import type { PlacedPiece } from './pelago.type';
import { PELAGO_ISLETS } from './pelago-islets.constants';
import { PELAGO_RIG } from './pelago-rig.constants';
import { threadEnd } from './thread-end';
import { threadLabel } from './thread-label';
import { threadPiece } from './thread-piece';

const PELAGO_REST: { islets: readonly PlacedPiece[]; threads: readonly PlacedPiece[] } = {
  islets: PELAGO_ISLETS.map((id) => isletPiece(id)),
  threads: PELAGO_RIG.threads.map((thread) => threadPiece(threadLabel(thread), threadEnd(thread.from), threadEnd(thread.to), thread.bulge)),
};

export { PELAGO_REST };
