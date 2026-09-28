/* @layer renderer-components @kind component */
import type { KeyGlyphProps } from './KeyGlyph.type';

const KeyGlyph = (props: KeyGlyphProps) => {
  const { spec } = props;
  const { viewBox = '0 0 16 16', strokes, fills = [] } = spec;
  return (
    <svg
      className="keyboard__glyph"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {strokes.map((d) => <path key={d} d={d} />)}
      {fills.map((d) => <path key={d} d={d} fill="currentColor" stroke="none" />)}
    </svg>
  );
};

export { KeyGlyph };
