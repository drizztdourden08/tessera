/* @layer renderer-components @kind logic */
import type { RowRange } from './virtual.type';

const renderedIndices = (range: RowRange, pinned: number): readonly number[] => {
  const indices: number[] = [];
  const pinnedOutside = pinned >= 0 && (pinned < range.start || pinned >= range.end);
  if (pinnedOutside && pinned < range.start) indices.push(pinned);
  for (let at = range.start; at < range.end; at += 1) indices.push(at);
  if (pinnedOutside && pinned >= range.end) indices.push(pinned);
  return indices;
};

export { renderedIndices };
