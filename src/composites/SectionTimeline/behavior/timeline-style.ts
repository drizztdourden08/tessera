/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import type { SectionTimelineDriver } from '../SectionTimeline.type';

const timelineStyle = (progress: number, timeline: SectionTimelineDriver | undefined): CSSProperties => ({
  '--section-timeline-progress': progress,
  ...(timeline && timeline !== 'scroll' ? { '--section-timeline-name': timeline } : undefined),
} as CSSProperties);

export { timelineStyle };
