/* @layer renderer-components @kind data */
import type { PelagoRig } from './pelago.type';

const PELAGO_RIG: PelagoRig = {
  width: 58,
  height: 51,
  core: [29, 26],
  eyes: [[26.6, 26.4], [31.4, 26.4]],
  lookReach: [1.6, 1.2],
  islets: {
    a: { node: [10, 13.4], mirror: false, size: 1 },
    b: { node: [48, 15.4], mirror: true, size: 0.9 },
    c: { node: [47.4, 35.6], mirror: true, size: 1.05 },
    d: { node: [10.6, 35], mirror: false, size: 0.85 },
  },
  threads: [
    { id: 'spokeA', from: 'core', to: 'a', bulge: 0.8, orbit: false },
    { id: 'spokeB', from: 'core', to: 'b', bulge: -0.8, orbit: false },
    { id: 'spokeC', from: 'core', to: 'c', bulge: 0.8, orbit: false },
    { id: 'spokeD', from: 'core', to: 'd', bulge: -0.8, orbit: false },
    { id: 'ringAB', from: 'a', to: 'b', bulge: 2, orbit: true },
    { id: 'ringBC', from: 'b', to: 'c', bulge: 3.2, orbit: true },
    { id: 'ringCD', from: 'c', to: 'd', bulge: 5.5, orbit: true },
    { id: 'ringDA', from: 'd', to: 'a', bulge: 3.2, orbit: true },
  ],
  pebbles: [[22.6, 41.8], [35.6, 43.6], [25, 47]],
  orbit: { perDegree: 0.5, reach: 40 },
};

export { PELAGO_RIG };
