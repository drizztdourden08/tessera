/* @layer renderer-components @kind types */
interface SectionTimelineLink {
  id: string;
  label: string;
  href: string;
}

interface SectionTimelineGroup {
  id: string;
  label: string;
  children: readonly SectionTimelineLink[];
}

type SectionTimelineState = 'live' | 'idle' | 'hidden';

type SectionTimelineDriver = 'scroll' | `--${string}`;

interface SectionTimelineProps {
  groups: readonly SectionTimelineGroup[];
  ariaLabel: string;
  activeId?: string;
  onJump?: (id: string) => void;
  state?: SectionTimelineState;
  progress?: number;
  timeline?: SectionTimelineDriver;
  className?: string;
}

export type { SectionTimelineDriver, SectionTimelineGroup, SectionTimelineLink, SectionTimelineProps, SectionTimelineState };
