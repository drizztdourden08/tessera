/* @layer renderer-components @kind component */
import { PathIcon } from '../PathIcon';
import { GLYPHS } from './Glyph.constants';
import type { GlyphProps } from './Glyph.type';

const Glyph = (props: GlyphProps) => {
  const { name, size = 16, ...rest } = props;
  return (
    <PathIcon
      paths={GLYPHS[name]}
      size={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    />
  );
};

export { Glyph };
