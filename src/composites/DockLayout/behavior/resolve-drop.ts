/* @layer renderer-components @kind logic */
import { FLOAT_DROP } from '../DockLayout.constants';
import { allowsDrop } from './allows-drop';
import type { DragSource, DragView, DropCheck, DropResult } from './drag.type';

const resolveSwap = (source: DragSource, view: DragView): DropResult =>
  (view.swapKey && source.fromKey ? { edit: { type: 'swap-panes', keyA: source.fromKey, keyB: view.swapKey } } : {});

const resolveMain = (view: DragView): DropResult => {
  const target = view.hot?.target;
  return target?.at === 'outer' || target?.at === 'leaf' ? { edit: { type: 'move-main', target } } : {};
};

const resolveWidget = (source: DragSource, view: DragView, check?: DropCheck): DropResult => {
  const id = source.id ?? '';
  const target = view.hot?.target;
  if (target && target.at !== 'float') {
    return allowsDrop(check, source, target) ? { edit: { type: 'move-widget', id, target, makeRoom: !view.overlay } } : {};
  }
  const floats = view.preview !== null && !view.refused && allowsDrop(check, source, FLOAT_DROP);
  return floats && view.preview ? { edit: { type: 'float-widget', id, rect: view.preview } } : {};
};

const resolveDrop = (source: DragSource, view: DragView, check?: DropCheck): DropResult => {
  if (view.outside && source.id !== null) return { popOut: source.id };
  if (view.swap) return resolveSwap(source, view);
  if (source.isMain) return resolveMain(view);
  return resolveWidget(source, view, check);
};

export { resolveDrop };
