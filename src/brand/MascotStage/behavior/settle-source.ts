/* @layer renderer-components @kind logic */
import type { PoseSource } from './pose-source.type';

/** Drops blends that have finished, so the source tree stays as deep as the blends still running. */
const settleSource = (source: PoseSource, now: number): PoseSource => {
  if (source.kind === 'clip') return source;
  if (now - source.start >= Math.max(source.body, source.extras)) return settleSource(source.to, now);
  const from = settleSource(source.from, now);
  return from === source.from ? source : { ...source, from };
};

export { settleSource };
