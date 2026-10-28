/* @layer renderer-components @kind logic */
import { rangeBetween } from './range-between';
import { rectKeys } from './rect-keys';
import { EMPTY } from './selection.constants';
import { toggledKey } from './toggled-key';
import type { SelectionClick, SelectionOps, SelectionOpsInput } from './selection-ops.type';

const isToggleClick = (event: SelectionClick) => event.ctrlKey || event.metaKey;

const selectionOps = (input: SelectionOpsInput): SelectionOps => {
  const { usable, selected, onChange, onPick, seed, cellOf, isHole, anchor } = input;
  const rangeOf = (from: string, to: string) => (cellOf ? rectKeys(usable, cellOf, from, to) : rangeBetween(usable, from, to));
  const blocked = (key: string) => isHole?.(key) === true;

  const extend = (key: string, keep: boolean) => {
    if (blocked(key)) return;
    const from = anchor.current ?? seed;
    const range = from === null ? [key] : rangeOf(from, key);
    onChange(new Set([...(keep ? selected : EMPTY), ...range]));
  };

  const toggle = (key: string) => {
    if (blocked(key)) return;
    anchor.current = key;
    onChange(toggledKey(selected, key));
  };

  const pick = (key: string) => {
    anchor.current = key;
    onChange(new Set([key]));
    onPick?.(key);
  };

  const click = (key: string, event: SelectionClick) => {
    if (blocked(key)) return;
    if (event.shiftKey) extend(key, isToggleClick(event));
    else if (isToggleClick(event)) toggle(key);
    else pick(key);
  };

  const step = (from: string, to: string, keep: boolean) => {
    anchor.current ??= from;
    extend(to, keep);
  };

  return { extend, toggle, click, step };
};

export { selectionOps };
