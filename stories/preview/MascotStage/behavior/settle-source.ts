/* @layer stories @kind logic */
import type { PoseSource } from './pose-source.type';

const settleSource = (source: PoseSource, now: number): PoseSource => {
  if (source.kind === 'clip') return source;
  if (now - source.start >= Math.max(source.body, source.extras)) return settleSource(source.to, now);
  const from = settleSource(source.from, now);
  return from === source.from ? source : { ...source, from };
};

export { settleSource };
