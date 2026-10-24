/* @layer renderer-components @kind logic */
import { toolbarDropLayout } from './toolbar-drop-layout';
import { toolbarEndMessage } from './toolbar-end-message';
import type { ToolbarKeyEnd, ToolbarKeyLatest, ToolbarKeySession } from './toolbar-key.type';
import { toolbarPickTarget } from './toolbar-pick-target';

const toolbarKeyFinish = (latest: ToolbarKeyLatest, s: ToolbarKeySession, end: ToolbarKeyEnd, label: string) => {
  const { layout, words } = latest;
  const target = toolbarPickTarget(s.frame, layout, s.id, s.pick);
  const next = end === 'drop' ? toolbarDropLayout(layout, s.id, target) : layout;
  return { next, changed: next !== layout, message: toolbarEndMessage(words, label, end === 'drop' ? s.pick : null, next !== layout) };
};

export { toolbarKeyFinish };
