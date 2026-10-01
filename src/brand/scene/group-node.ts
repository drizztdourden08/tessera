/* @layer renderer-components @kind logic */
import type { SceneGroupNode, SceneNode } from '../brand.type';
import type { GroupSpot } from './scene.type';

const groupNode = (label: string, children: readonly SceneNode[], spot: GroupSpot = {}): SceneGroupNode => ({
  kind: 'group',
  label,
  children,
  ...(spot.turn ? { turn: spot.turn } : {}),
  ...(spot.clip ? { clip: spot.clip } : {}),
  ...(spot.part ? { part: spot.part } : {}),
});

export { groupNode };
