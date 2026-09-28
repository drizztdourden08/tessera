/* @layer renderer-components @kind data */
import type { CSSProperties } from 'react';
import type { Side } from './TesseraLogo.type';

const MARK = { x: 228, y: 226, size: 799 };
const WING = 650;
const STAGE = { x: MARK.x - WING, y: MARK.y, width: MARK.size + 2 * WING, height: MARK.size };
const CALLOUT_EDGE: Record<Side, number> = { left: 170, right: 1090 };
const BAR_BOTTOM = 450;
const SLIDE = 520;

const STAGE_STYLE = {
  aspectRatio: `${STAGE.width} / ${STAGE.height}`,
  '--tessera-logo-slide': `${SLIDE}px`,
} as CSSProperties;

export { BAR_BOTTOM, CALLOUT_EDGE, STAGE, STAGE_STYLE };
