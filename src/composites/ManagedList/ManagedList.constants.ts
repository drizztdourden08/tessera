/* @layer renderer-components @kind data */
const FILTER_FROM = 8;

const ROW_SELECTOR = '.list-item-row__main';

const MOVE_KEYS: Readonly<Record<string, (index: number, last: number) => number>> = {
  ArrowDown: (index, last) => Math.min(index + 1, last),
  ArrowUp: (index) => Math.max(index - 1, 0),
  Home: () => 0,
  End: (_index, last) => last,
};

export { FILTER_FROM, MOVE_KEYS, ROW_SELECTOR };
