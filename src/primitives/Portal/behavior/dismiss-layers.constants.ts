/* @layer renderer-components @kind data */
import type { DismissDocument, DismissLayer } from './dismiss-layers.type';

const LAYER_STACKS = new WeakMap<DismissDocument, DismissLayer[]>();

const ESCAPE_LISTENERS = new WeakMap<DismissDocument, (event: KeyboardEvent) => void>();

const SESSION_ENDS = new WeakMap<DismissDocument, () => void>();

export { ESCAPE_LISTENERS, LAYER_STACKS, SESSION_ENDS };
