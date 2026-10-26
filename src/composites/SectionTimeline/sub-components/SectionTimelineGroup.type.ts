/* @layer renderer-components @kind types */
import type { SectionTimelineGroup } from '../SectionTimeline.type';

interface SectionTimelineGroupProps {
  group: SectionTimelineGroup;
  activeId?: string;
  onJump?: (id: string) => void;
}

export type { SectionTimelineGroupProps };
