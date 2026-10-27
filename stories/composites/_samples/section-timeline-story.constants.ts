/* @layer stories @kind data */
import type { SectionTimelineGroup } from '../../../src/composites';

const TIMELINE_TEXT = {
  label: 'On this page',
  intro: 'Every section below is long enough to scroll. The line beside the list fills as you read.',
} as const;

const SECTION_ATTRIBUTE = 'data-timeline-section';

const TIMELINE_GROUPS: readonly SectionTimelineGroup[] = [
  {
    id: 'start',
    label: 'Start',
    children: [
      { id: 'welcome', label: 'Welcome', href: '#welcome' },
      { id: 'install', label: 'Install', href: '#install' },
    ],
  },
  {
    id: 'play',
    label: 'Play',
    children: [
      { id: 'sessions', label: 'Sessions', href: '#sessions' },
      { id: 'multiworld', label: 'Multiworld', href: '#multiworld' },
      { id: 'tracker', label: 'Tracker', href: '#tracker' },
    ],
  },
  {
    id: 'help',
    label: 'Help',
    children: [
      { id: 'faq', label: 'Questions', href: '#faq' },
      { id: 'credits', label: 'Credits', href: '#credits' },
    ],
  },
];

const FIRST_SECTION = 'welcome';

const SECTION_COPY = 'Rotp keeps each pack, each save and each session in one place, so a long page like this one can be read in any order. Pick a section from the list to jump to it, and watch the line follow the page.';

const TIMELINE_CODE = `import { SectionTimeline } from '@drizztdourden08/tessera';

<SectionTimeline
  ariaLabel="On this page"
  groups={groups}
  activeId={activeId}
  timeline="scroll"
  progress={supportsScrollTimeline ? undefined : progress}
  onJump={(id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
/>`;

export { FIRST_SECTION, SECTION_ATTRIBUTE, SECTION_COPY, TIMELINE_CODE, TIMELINE_GROUPS, TIMELINE_TEXT };
