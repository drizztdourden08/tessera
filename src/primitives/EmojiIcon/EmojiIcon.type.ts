/* @layer renderer-components @kind types */
import type { HTMLAttributes } from 'react';

type EmojiIconSize = 'sm' | 'md' | 'lg';

interface EmojiIconProps extends HTMLAttributes<HTMLSpanElement> {
  glyph: string;
  size?: EmojiIconSize;
}

export type { EmojiIconProps, EmojiIconSize };
