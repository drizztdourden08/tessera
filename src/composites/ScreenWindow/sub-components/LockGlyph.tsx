/* @layer renderer-components @kind component */
import { Svg, SvgPath, SvgRect } from '../../../primitives/Svg';
import { LOCK_BODY, LOCK_BOX, LOCK_SHACKLE } from '../ScreenWindow.constants';
import type { LockGlyphProps } from './LockGlyph.type';

const LockGlyph = ({ locked, size }: LockGlyphProps) => (
  <Svg
    className="lock-glyph"
    data-locked={locked}
    viewBox={LOCK_BOX}
    width={size}
    height={size}
    strokeWidth={2}
    aria-hidden="true"
    focusable="false"
  >
    <SvgRect className="lock-glyph__body" {...LOCK_BODY} />
    <SvgPath className="lock-glyph__shackle" d={LOCK_SHACKLE} pathLength={1} />
  </Svg>
);

export { LockGlyph };
