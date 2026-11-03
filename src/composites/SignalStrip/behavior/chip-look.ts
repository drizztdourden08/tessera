/* @layer renderer-components @kind logic */
import type { TagLook } from '../../../primitives/Tag/Tag.type';
import type { SignalTone } from '../SignalStrip.type';

const chipLook = (tone: SignalTone): TagLook =>
  tone === 'neutral' ? { variant: 'normal', color: 'neutral' } : { variant: 'urgency', color: tone };

export { chipLook };
