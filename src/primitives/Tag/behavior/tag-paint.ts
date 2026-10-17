/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import type { TagLook } from '../Tag.type';
import { hexInk } from '../../hex-ink/hex-ink';

const tagPaint = (look: TagLook): CSSProperties | undefined =>
  (look.variant === 'custom' && hexInk(look.color) !== null ? { '--tag-paint': look.color } as CSSProperties : undefined);

export { tagPaint };
