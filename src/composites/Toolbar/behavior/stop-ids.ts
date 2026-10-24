/* @layer renderer-components @kind util */
import { HANDLE_STOP, MORE_STOP } from '../Toolbar.constants';
import type { ToolbarItem } from '../Toolbar.type';

const itemStops = (item: ToolbarItem): string[] => {
  if (item.kind === 'separator') return [];
  if (item.kind === 'group') return item.choices.map((choice) => `${item.id}:${choice.value}`);
  return [item.id];
};

const stopIds = (shown: readonly ToolbarItem[], handle: boolean, more: boolean): string[] => [
  ...(handle ? [HANDLE_STOP] : []),
  ...shown.flatMap(itemStops),
  ...(more ? [MORE_STOP] : []),
];

export { stopIds };
