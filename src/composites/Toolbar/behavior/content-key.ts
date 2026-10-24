/* @layer renderer-components @kind util */
import type { ToolbarItem, ToolbarProps } from '../Toolbar.type';

const captionOf = (item: ToolbarItem): string => (item.kind === 'button' || item.kind === 'toggle' ? (item.caption ?? '') : '');

const contentKey = (props: ToolbarProps): string => {
  const { items, orientation = 'horizontal', size = 'sm', handle = false } = props;
  const parts = items.map((item) => (item.kind === 'separator' ? item.id : `${item.id}:${item.label}:${captionOf(item)}`));
  return [orientation, size, handle, ...parts].join('|');
};

export { contentKey };
