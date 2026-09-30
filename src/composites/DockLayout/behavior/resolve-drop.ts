/* @layer renderer-components @kind logic */
import type { DragSource, DragView, DropResult } from './drag.type';

const resolveSwap = (source: DragSource, view: DragView): DropResult =>
  (view.swapKey && source.fromKey ? { edit: { type: 'swap-panes', keyA: source.fromKey, keyB: view.swapKey } } : {});

const resolveMain = (view: DragView): DropResult => {
  const target = view.hot?.target;
  return target?.at === 'outer' || target?.at === 'leaf' ? { edit: { type: 'move-main', target } } : {};
};

const resolveWidget = (id: string, view: DragView): DropResult => {
  const target = view.hot?.target;
  if (target && target.at !== 'float') return { edit: { type: 'move-widget', id, target, makeRoom: !view.overlay } };
  if (view.preview && !view.refused) return { edit: { type: 'float-widget', id, rect: view.preview } };
  return {};
};

const resolveDrop = (source: DragSource, view: DragView): DropResult => {
  if (view.outside && source.id !== null) return { popOut: source.id };
  if (view.swap) return resolveSwap(source, view);
  if (source.isMain) return resolveMain(view);
  return resolveWidget(source.id ?? '', view);
};

export { resolveDrop };
