/* @layer renderer-components @kind logic */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import type { PressWiring } from './dock-hooks.type';
import { movedEnough } from './moved-enough';
import { releasePress } from './release-press';
import { stagePoint } from './stage-point';
import { viewFor } from './view-for';

const listenPress = (wiring: PressWiring): (() => void) => {
  const { stage, press, latest, finish, show } = wiring;
  const view = ownerWindowOf(stage);
  const onMove = (ev: PointerEvent): void => {
    const p = press.current;
    if (p?.pointerId !== ev.pointerId) return;
    const point = stagePoint(stage, ev);
    if (!p.live) {
      if (!movedEnough(p.source.start, point)) return;
      p.live = true;
      stage.setPointerCapture(p.pointerId);
    }
    const place = { pointer: point, client: { x: ev.clientX, y: ev.clientY }, onScreen: { x: ev.screenX, y: ev.screenY }, view };
    p.view = viewFor(latest.current.context, p.source, place, { shift: ev.shiftKey, ctrl: ev.ctrlKey });
    show(p.view, p.source.id);
  };
  const onUp = (ev: PointerEvent): void => {
    const p = press.current;
    if (p?.pointerId !== ev.pointerId) return;
    finish();
    releasePress(p, latest.current, { screenX: ev.screenX, screenY: ev.screenY });
  };
  const onKey = (ev: KeyboardEvent): void => {
    if (ev.key === 'Escape') finish();
  };
  view.addEventListener('pointermove', onMove);
  view.addEventListener('pointerup', onUp);
  view.addEventListener('pointercancel', finish);
  view.addEventListener('keydown', onKey);
  return () => {
    view.removeEventListener('pointermove', onMove);
    view.removeEventListener('pointerup', onUp);
    view.removeEventListener('pointercancel', finish);
    view.removeEventListener('keydown', onKey);
  };
};

export { listenPress };
