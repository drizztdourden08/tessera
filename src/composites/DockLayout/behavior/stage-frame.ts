/* @layer renderer-components @kind util */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import type { BesideFrame } from './beside-pointer.type';

const stageFrame = (box: HTMLElement): BesideFrame => {
  const stage = box.offsetParent instanceof HTMLElement ? box.offsetParent : box;
  const view = ownerWindowOf(stage);
  const at = stage.getBoundingClientRect();
  const x = Math.max(0, -at.left);
  const y = Math.max(0, -at.top);
  const right = Math.min(stage.clientWidth, view.innerWidth - at.left);
  const bottom = Math.min(stage.clientHeight, view.innerHeight - at.top);
  return { area: { x, y, width: Math.max(0, right - x), height: Math.max(0, bottom - y) }, origin: { x: 0, y: 0 } };
};

export { stageFrame };
