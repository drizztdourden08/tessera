/* @layer renderer-components @kind data */
import type { DismissDocument, DismissLayer } from './dismiss-layers.type';

const LAYER_STACKS = new WeakMap<DismissDocument, DismissLayer[]>();

const SESSION_ENDS = new WeakMap<DismissDocument, () => void>();

export { LAYER_STACKS, SESSION_ENDS };
