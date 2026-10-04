/* @layer renderer-components @kind data */
import type { MotionPart } from '../motion/motion.type';
import { PELAGO_ISLETS } from './pelago-islets.constants';
import { PELAGO_RIG } from './pelago-rig.constants';
import { threadEnd } from './thread-end';
import { threadLabel } from './thread-label';

const { core, islets, pebbles, threads } = PELAGO_RIG;

const PELAGO_PARTS: readonly MotionPart[] = [
  { id: 'island', node: 'Island', pivot: core },
  { id: 'glow', node: 'Halo', pivot: core },
  { id: 'eyes', node: 'Eyes', pivot: [29, 26.4] },
  { id: 'pebbleA', node: 'Pebble', pivot: pebbles[0] },
  { id: 'pebbleB', node: 'Small pebble', pivot: pebbles[1] },
  { id: 'pebbleC', node: 'Shard', pivot: pebbles[2] },
  ...PELAGO_ISLETS.flatMap((id) => [
    { id: `islet${id.toUpperCase()}`, node: `Orbit ${id.toUpperCase()}`, pivot: islets[id].node },
    { id: `spark${id.toUpperCase()}`, node: `Spark ${id.toUpperCase()}`, pivot: islets[id].node },
  ]),
  ...threads.map((thread) => ({ id: thread.id, node: threadLabel(thread), pivot: threadEnd(thread.from) })),
];

export { PELAGO_PARTS };
