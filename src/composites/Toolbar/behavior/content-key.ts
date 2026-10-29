/* @layer renderer-components @kind util */
import type { ToolbarItem, ToolbarProps } from '../Toolbar.type';

const captionOf = (item: ToolbarItem): string => (item.kind === 'button' || item.kind === 'toggle' || item.kind === 'popover' ? (item.caption ?? '') : '');

const numberOf = (item: ToolbarItem): string => (item.kind === 'number' ? `${item.showLabel === true}:${item.min ?? ''}:${item.max ?? ''}:${item.step ?? ''}:${item.suffix ?? ''}` : '');

const partOf = (item: ToolbarItem): string => {
  if (item.kind === 'separator') return `${item.id}:${item.label ?? ''}`;
  const display = item.kind === 'group' ? (item.display ?? 'set') : '';
  return `${item.id}:${item.label}:${captionOf(item)}:${display}:${item.badge?.glyph ?? ''}:${numberOf(item)}`;
};

const contentKey = (props: ToolbarProps): string => {
  const { items, orientation = 'horizontal', size = 'sm', handle = false, labels = true, columns = 1, keyBadges = false } = props;
  const parts = items.map(partOf);
  return [orientation, size, handle, labels, columns, keyBadges, ...parts].join('|');
};

export { contentKey };
