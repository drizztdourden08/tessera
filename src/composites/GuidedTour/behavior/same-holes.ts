/* @layer renderer-components @kind logic */
import { sameBox } from './same-box';
import type { SpotHoles } from './tour-internal.type';

const sameHoles = (a: SpotHoles, b: SpotHoles): boolean =>
  sameBox(a.hole, b.hole) && a.kept.length === b.kept.length && a.kept.every((hole, at) => sameBox(hole, b.kept[at] ?? null));

export { sameHoles };
