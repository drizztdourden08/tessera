/* @layer renderer-components @kind util */
import type { TagLook } from '../Tag.type';
import { hexInk } from '../../hex-ink/hex-ink';

const tagLookClasses = (look: TagLook): readonly string[] => {
  if (look.variant !== 'custom') return [`tag--${look.variant ?? 'normal'}`, `tag--${look.color ?? 'neutral'}`];
  const ink = hexInk(look.color);
  return ink ? ['tag--custom', `tag--ink-${ink}`] : ['tag--normal', 'tag--neutral'];
};

export { tagLookClasses };
