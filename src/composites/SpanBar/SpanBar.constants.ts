/* @layer renderer-components @kind data */
import type { ResizeEdge } from '../rect-drag/rect-drag.type';

const SPAN_EDGES: readonly ResizeEdge[] = ['w', 'e'];

const SPAN_FREE_MIN = 8;

const SPAN_DEFAULT_MIN_LENGTH = 1;

const SPAN_TOKEN_PREFIX = '--';

const SPAN_BODY_SELECTOR = '.span-bar__body';

const SPAN_LANE_KEY_STEP: Readonly<Record<string, number>> = { ArrowLeft: -1, ArrowRight: 1 };

const SPAN_KEY_DIRECTION: Readonly<Record<string, number>> = { ArrowLeft: -1, ArrowRight: 1 };

export {
  SPAN_BODY_SELECTOR,
  SPAN_DEFAULT_MIN_LENGTH,
  SPAN_EDGES,
  SPAN_FREE_MIN,
  SPAN_KEY_DIRECTION,
  SPAN_LANE_KEY_STEP,
  SPAN_TOKEN_PREFIX,
};
