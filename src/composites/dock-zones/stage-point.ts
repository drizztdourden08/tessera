/* @layer renderer-components @kind logic */
import type { Point } from '../DockLayout/behavior/drag.type';

const stagePoint = (stage: HTMLElement, e: { clientX: number; clientY: number }): Point => {
  const box = stage.getBoundingClientRect();
  return { x: e.clientX - box.left, y: e.clientY - box.top };
};

export { stagePoint };
