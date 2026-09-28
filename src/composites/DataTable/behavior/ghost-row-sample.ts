/* @layer renderer-components @kind logic */
import { groupUid } from './group-uid';
import type { GhostRowSample } from './ghost-row-sample.type';

const collect = <T>(sample: GhostRowSample<T>, parentUid: string, into: T[]): void => {
  const { nodes, isExpanded, limit } = sample;
  for (const node of nodes) {
    if (into.length >= limit) return;
    if (node.kind === 'row') {
      into.push(node.row);
      continue;
    }
    const uid = groupUid(parentUid, node.path, node.key);
    if (isExpanded(uid)) collect({ nodes: node.children, isExpanded, limit }, uid, into);
  }
};

const ghostRowSample = <T>(sample: GhostRowSample<T>): readonly T[] => {
  const picked: T[] = [];
  if (sample.limit > 0) collect(sample, '', picked);
  return picked;
};

export { ghostRowSample };
