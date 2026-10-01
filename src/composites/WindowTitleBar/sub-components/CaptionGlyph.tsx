/* @layer renderer-components @kind component */
import { Glyph } from '../../../primitives/Glyph';
import { CAPTION_GLYPH_SIZE, CAPTION_STROKE } from '../WindowTitleBar.constants';
import type { CaptionGlyphProps } from './CaptionGlyph.type';

const CaptionGlyph = (props: CaptionGlyphProps) => (
  <Glyph name={props.name} size={CAPTION_GLYPH_SIZE} strokeWidth={CAPTION_STROKE} />
);

export { CaptionGlyph };
