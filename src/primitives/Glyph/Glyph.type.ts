/* @layer renderer-components @kind types */
import type { IconLook } from '../Icon/Icon.type';
import type { GLYPHS } from './Glyph.constants';

type GlyphName = keyof typeof GLYPHS;

interface GlyphProps extends Omit<IconLook, 'effect'> {
  name: GlyphName;
}

export type { GlyphName, GlyphProps };
