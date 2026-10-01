/* @layer renderer-components @kind types */
import type { GlyphName } from '../../../primitives/Glyph';

interface CaptionGlyphProps {
  name: Extract<GlyphName, 'windowMinimize' | 'windowMaximize' | 'windowRestore' | 'windowClose'>;
}

export type { CaptionGlyphProps };
