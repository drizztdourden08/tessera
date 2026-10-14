/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import type { TagLook } from '../Tag.type';
import { tagInk } from './tag-ink';

const tagPaint = (look: TagLook): CSSProperties | undefined =>
  (look.variant === 'custom' && tagInk(look.color) !== null ? { '--tag-paint': look.color } as CSSProperties : undefined);

export { tagPaint };
