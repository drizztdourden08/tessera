/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { SectionTimelineState } from '../../src/composites';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { LongPageTimeline } from './_samples/LongPageTimeline';
import { TIMELINE_CODE } from './_samples/section-timeline-story.constants';

type SectionTimelineArgs = { state: SectionTimelineState };

const meta = {
  title: 'Composites · Navigation/SectionTimeline',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SectionTimelineArgs>;

const Playground = {
  name: 'Playground',
  args: { state: 'live' },
  argTypes: {
    state: { group: 'State', control: 'select', options: ['live', 'idle', 'hidden'], description: 'Live is full, idle is dimmed until the pointer or focus enters, hidden removes it.' },
  },
  render: (args) => <LongPageTimeline state={args.state} />,
} satisfies PlaygroundStory<SectionTimelineArgs>;

const LongPage = {
  name: 'A long page with groups and a progress line',
  render: () => <LongPageTimeline />,
} satisfies StoryLiteStoryDefinition<SectionTimelineArgs>;

const Idle = {
  name: 'Idle, dimmed until the pointer arrives',
  render: () => <LongPageTimeline state="idle" />,
} satisfies StoryLiteStoryDefinition<SectionTimelineArgs>;

const Overview = overviewStory({
  component: 'SectionTimeline',
  description: 'A vertical list of links to the sections of a long page, in titled groups, beside a line that fills as you scroll.',
  points: [
    'Groups with a title and links; the active link reports `aria-current="location"`.',
    'The line fills from a CSS scroll timeline: `timeline="scroll"` or the name of a view timeline.',
    'Without scroll-driven animation it jumps to `progress`, or to the active section.',
    '`onJump` follows a link yourself, for a smooth scroll or a route.',
    '`state` is live, idle (dimmed) or hidden, such as on a narrow page.',
    'With reduced motion the fill jumps instead of animating.',
  ],
  instead: '[HeaderAnchorNav] for pills in a page header; [SideNav] to switch between the screens of a window.',
  playground: Playground,
  variants: [LongPage, Idle],
  code: TIMELINE_CODE,
});

export default meta;
export { Idle, LongPage, Overview, Playground };
