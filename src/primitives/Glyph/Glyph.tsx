/* @layer renderer-components @kind component */
import { Icon } from '../Icon';
import { GLYPHS } from './Glyph.constants';
import type { GlyphProps } from './Glyph.type';

const Glyph = (props: GlyphProps) => {
  const { name, size = 16, 'aria-label': ariaLabel, label = ariaLabel, ...rest } = props;
  return (
    <Icon
      path={{ d: GLYPHS[name] }}
      size={size}
      label={label}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    />
  );
};

export { Glyph };
