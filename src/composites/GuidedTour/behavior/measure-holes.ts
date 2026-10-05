/* @layer renderer-components @kind util */
import { holeOf } from './hole-of';
import { measureHole } from './measure-hole';
import type { SpotHoles } from './tour-internal.type';

const measureHoles = (target: HTMLElement | null, kept: readonly HTMLElement[], ring: HTMLElement | null): SpotHoles => ({
  hole: target?.isConnected ? measureHole(target, ring) : null,
  kept: kept.filter((node) => node.isConnected).map((node) => holeOf(node.getBoundingClientRect(), 0, 0)),
});

export { measureHoles };
