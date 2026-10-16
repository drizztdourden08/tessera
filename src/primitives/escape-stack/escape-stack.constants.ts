/* @layer renderer-components @kind data */
import type { EscapeLevel } from './escape-stack.type';

const ESCAPE_RANK: Readonly<Record<EscapeLevel, number>> = {
  screen: 0,
  dialog: 1,
  menu: 2,
  popover: 3,
  drag: 4,
};

export { ESCAPE_RANK };
