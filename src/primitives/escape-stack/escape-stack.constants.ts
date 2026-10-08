/* @layer renderer-components @kind data */
import type { EscapeDocument, EscapeEntry, EscapeLevel } from './escape-stack.type';

const ESCAPE_RANK: Readonly<Record<EscapeLevel, number>> = {
  screen: 0,
  dialog: 1,
  menu: 2,
  popover: 3,
  drag: 4,
};

const ESCAPE_STACKS = new WeakMap<EscapeDocument, EscapeEntry[]>();

const ESCAPE_KEY_LISTENERS = new WeakMap<EscapeDocument, (event: KeyboardEvent) => void>();

export { ESCAPE_KEY_LISTENERS, ESCAPE_RANK, ESCAPE_STACKS };
