/* @layer renderer-components @kind data */
import type { HookshopRig } from './hookshop.type';

const HOOKSHOP_RIG: HookshopRig = {
  sentri: { at: [2, 15], angle: -6, pod: [31, 15.5] },
  hookshot: { angle: -11, length: 30, bend: 12 },
  bag: { scale: 0.25, angle: -15, catch: [40, 60], stampCentre: [47.5, 62], stampAngle: -10.5, frontEdge: [[18, 37], [21, 95]] },
  stampScale: 0.25,
  stars: [[81, 15], [64, 102]],
  speedLines: [
    { from: [73.5, 36], spread: -13 },
    { from: [78, 57], spread: -9 },
    { from: [80, 80], spread: -1 },
  ],
  sparkleNudge: [-1, 2],
  height: 52,
  margin: 2,
};

export { HOOKSHOP_RIG };
