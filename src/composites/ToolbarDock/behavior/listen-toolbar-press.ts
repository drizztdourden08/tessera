/* @layer renderer-components @kind logic */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { pushEscape } from '../../../primitives/escape-stack/push-escape';
import { movedEnough } from '../../dock-zones/moved-enough';
import { stagePoint } from '../../dock-zones/stage-point';
import { measureToolbarFrame } from './measure-toolbar-frame';
import type { ToolbarPressWiring } from './toolbar-drag.type';
import { toolbarBasket } from './toolbar-basket';
import { toolbarDropAt } from './toolbar-drop-at';

const listenToolbarPress = (wiring: ToolbarPressWiring): (() => void) => {
  const { root, press, latest, drop, cancel, show } = wiring;
  const view = ownerWindowOf(root);
  const onMove = (ev: PointerEvent): void => {
    const p = press.current;
    if (p?.pointerId !== ev.pointerId) return;
    const point = stagePoint(root, ev);
    if (!p.live) {
      if (!movedEnough(p.start, point)) return;
      p.live = true;
      p.frame = measureToolbarFrame(root);
      root.setPointerCapture(p.pointerId);
    }
    if (!p.frame) return;
    const { layout, definitions } = latest.current;
    p.target = toolbarDropAt(p.frame, layout, p.id, point);
    const label = definitions.find((definition) => definition.id === p.id)?.label ?? p.id;
    show({ id: p.id, label, pointer: point, target: p.target, basket: toolbarBasket(p.frame) });
  };
  const onUp = (ev: PointerEvent): void => {
    if (press.current?.pointerId === ev.pointerId) drop();
  };
  const onCancel = (ev: PointerEvent): void => {
    if (press.current?.pointerId === ev.pointerId) cancel();
  };
  view.addEventListener('pointermove', onMove);
  view.addEventListener('pointerup', onUp);
  view.addEventListener('pointercancel', onCancel);
  const leaveEscape = pushEscape(view.document, 'drag', cancel);
  return () => {
    view.removeEventListener('pointermove', onMove);
    view.removeEventListener('pointerup', onUp);
    view.removeEventListener('pointercancel', onCancel);
    leaveEscape();
  };
};

export { listenToolbarPress };
