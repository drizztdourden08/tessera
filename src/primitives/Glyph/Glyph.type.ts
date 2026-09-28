/* @layer renderer-components @kind types */
import type { PathIconProps } from '../PathIcon';
import type { GLYPHS } from './Glyph.constants';

type GlyphName = keyof typeof GLYPHS;

interface GlyphProps extends Omit<PathIconProps, 'paths' | 'circles' | 'viewBox'> {
  name: GlyphName;
}

export type { GlyphName, GlyphProps };
