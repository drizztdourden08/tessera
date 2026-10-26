/* @layer renderer-components @kind util */
import type { SectionTimelineGroup } from '../SectionTimeline.type';

const clamp = (value: number): number => Math.min(1, Math.max(0, value));

const timelineProgress = (groups: readonly SectionTimelineGroup[], activeId: string | undefined, progress: number | undefined): number => {
  if (progress !== undefined) return Number.isFinite(progress) ? clamp(progress) : 0;
  const ids = groups.flatMap((group) => group.children.map((child) => child.id));
  const place = activeId === undefined ? -1 : ids.indexOf(activeId);
  return place < 0 ? 0 : clamp((place + 1) / ids.length);
};

export { timelineProgress };
