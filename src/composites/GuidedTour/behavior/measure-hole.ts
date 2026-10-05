/* @layer renderer-components @kind util */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { holeOf } from './hole-of';
import type { HoleRect } from './tour-internal.type';

const measureHole = (target: HTMLElement, ring: HTMLElement | null): HoleRect => {
  const style = ring ? ownerWindowOf(ring).getComputedStyle(ring) : null;
  const pad = Number.parseFloat(style?.paddingTop ?? '') || 0;
  const radius = Number.parseFloat(style?.borderTopLeftRadius ?? '') || 0;
  return holeOf(target.getBoundingClientRect(), pad, radius);
};

export { measureHole };
