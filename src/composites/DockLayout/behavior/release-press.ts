/* @layer renderer-components @kind logic */
import type { DockDragLatest, Press } from './dock-hooks.type';
import { resolveDrop } from './resolve-drop';

const releasePress = (press: Press, latest: DockDragLatest): void => {
  const { source, live, view } = press;
  if (!live) {
    if (source.fromTab && source.fromKey && source.id) latest.onEdit({ type: 'activate-tab', key: source.fromKey, id: source.id });
    return;
  }
  if (!view) return;
  const result = resolveDrop(source, view);
  if (result.popOut) latest.onPopOut?.(result.popOut);
  else if (result.edit) latest.onEdit(result.edit);
};

export { releasePress };
