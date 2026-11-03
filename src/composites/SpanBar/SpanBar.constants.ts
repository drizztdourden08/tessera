/* @layer renderer-components @kind data */
import type { ResizeEdge } from '../rect-drag/rect-drag.type';

const SPAN_EDGES: readonly ResizeEdge[] = ['w', 'e'];

const SPAN_FREE_MIN = 8;

const SPAN_DEFAULT_MIN_LENGTH = 1;

export { SPAN_DEFAULT_MIN_LENGTH, SPAN_EDGES, SPAN_FREE_MIN };
