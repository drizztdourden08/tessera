/* @layer renderer-components @kind types */
import type { PathIconProps } from '../PathIcon';
import type { GlyphName } from './glyphs.type';

interface GlyphProps extends Omit<PathIconProps, 'paths' | 'circles' | 'viewBox'> {
  name: GlyphName;
}

export type { GlyphProps };
