/* @layer renderer-components @kind logic */
import type { BrandSceneData, MascotPose, ScenePoint } from '../brand.type';
import { groupNode } from '../scene/group-node';
import { isletOffsets } from './islet-offsets';
import { isletPiece } from './islet-piece';
import type { IsletId, ThreadRig } from './pelago.type';
import { PELAGO_FRONT_CLIP } from './pelago-depth.constants';
import { PELAGO_ISLETS } from './pelago-islets.constants';
import { PELAGO_PIECES } from './pelago-pieces.constants';
import { PELAGO_RIG } from './pelago-rig.constants';
import { placeAt } from './place-at';
import { threadEnd } from './thread-end';
import { threadLabel } from './thread-label';
import { threadPiece } from './thread-piece';

const within = (value: number, reach: number): number => Math.min(reach, Math.max(-reach, value));

const composePelago = (pose: MascotPose = {}): BrandSceneData => {
  const { aura, rock, halo, crystal, eye, spark, pebbleA, pebbleB, pebbleC } = PELAGO_PIECES;
  const rig = PELAGO_RIG;
  const [lookX = 0, lookY = 0] = pose.look ?? [];
  const look: ScenePoint = [within(lookX, rig.lookReach[0]), within(lookY, rig.lookReach[1])];
  const offsets = isletOffsets(pose);
  const thread = (t: ThreadRig) => placeAt(threadPiece(threadLabel(t), threadEnd(t.from, offsets), threadEnd(t.to, offsets), t.bulge));
  const orbit = (id: IsletId) => groupNode(`Orbit ${id.toUpperCase()}`, [
    placeAt(spark, threadEnd(id, offsets), `Spark ${id.toUpperCase()}`),
    placeAt(isletPiece(id, offsets[id])),
  ]);
  const eyes = rig.eyes.map(([x, y]) => placeAt(eye, [x + look[0], y + look[1]]));
  return {
    width: rig.width,
    height: rig.height,
    smooth: true,
    nodes: [
      placeAt(aura),
      ...rig.threads.filter((t) => !t.orbit).map(thread),
      placeAt(pebbleA),
      placeAt(pebbleB),
      placeAt(pebbleC),
      groupNode('Island', [placeAt(rock), placeAt(halo), placeAt(crystal), groupNode('Eyes', eyes)]),
      groupNode('Orbits', [...rig.threads.filter((t) => t.orbit).map(thread), ...PELAGO_ISLETS.map(orbit)], { clip: PELAGO_FRONT_CLIP }),
    ],
  };
};

export { composePelago };
