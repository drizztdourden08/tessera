/* @layer renderer-components @kind logic */
import type { DockEdge } from '../../DockLayout';
import { MIGRATE_SHARE } from '../Widget.constants';

const viewLength = (edge: DockEdge): number => {
  if (typeof window === 'undefined') return 0;
  return edge === 'left' || edge === 'right' ? window.innerWidth : window.innerHeight;
};

const dockedShare = (edge: DockEdge, size: number | undefined, along = viewLength(edge)): number => {
  if (!(along > 0) || size === undefined || !(size > 0)) return MIGRATE_SHARE.outer;
  return Math.min(MIGRATE_SHARE.max, Math.max(MIGRATE_SHARE.min, size / along));
};

export { dockedShare };
