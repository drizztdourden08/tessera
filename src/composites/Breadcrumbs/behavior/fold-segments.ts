/* @layer renderer-components @kind logic */
import { MIN_VISIBLE } from '../Breadcrumbs.constants';
import type { BreadcrumbSegment, FoldedSegments } from '../Breadcrumbs.type';

const foldSegments = (segments: readonly BreadcrumbSegment[], maxVisible: number | undefined): FoldedSegments => {
  const limit = Math.max(maxVisible ?? segments.length, MIN_VISIBLE);
  if (segments.length <= limit) return { head: segments, hidden: [], tail: [] };
  const keep = limit - 2;
  return { head: segments.slice(0, 1), hidden: segments.slice(1, segments.length - keep), tail: segments.slice(segments.length - keep) };
};

export { foldSegments };
