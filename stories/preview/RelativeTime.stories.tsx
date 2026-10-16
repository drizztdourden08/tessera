/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { PreviewCards } from './_shared/PreviewCards';
import { RelativeTime } from './RelativeTime/RelativeTime';
import type { RelativeTimeFormat } from './RelativeTime/RelativeTime.type';
import { SaveListWithTimes } from './RelativeTime/_samples/SaveListWithTimes';
import { TimeLadder } from './RelativeTime/_samples/TimeLadder';
import { TIME_CHOICES, TIME_CODE, TIME_MAPPING } from './RelativeTime/_samples/relative-time-story.constants';

type TimeArgs = { minutesAgo: number; format: RelativeTimeFormat };

const MINUTE_MS = 60_000;

const meta = {
  title: 'Preview · For approval/RelativeTime',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TimeArgs>;

const Playground = {
  name: 'Playground',
  args: { minutesAgo: 5, format: 'long' },
  argTypes: {
    minutesAgo: { group: 'Content', control: 'number', description: 'How many minutes before now; below zero is ahead.' },
    format: { group: 'Appearance', control: 'select', options: ['long', 'short', 'narrow'] },
  },
  render: ({ minutesAgo, format }) => <RelativeTime value={Date.now() - minutesAgo * MINUTE_MS} format={format} />,
} satisfies PlaygroundStory<TimeArgs>;

const Ladder = {
  name: 'From a few seconds to a year, long, short and in French',
  render: () => <TimeLadder />,
} satisfies StoryLiteStoryDefinition<TimeArgs>;

const Saves = {
  name: 'RotP\'s save list rebuilt: ItemList rows with the time as meta',
  render: () => <SaveListWithTimes />,
} satisfies StoryLiteStoryDefinition<TimeArgs>;

const Overview = overviewStory({
  component: 'RelativeTime',
  description: 'For approval, not a released part: how long ago something happened, such as 5 minutes ago, with the full date on hover.',
  points: [
    '**For approval:** this page lives in the gallery only; nothing on it ships until the owner picks an option.',
    '`value` takes a date or a timestamp; under a minute it reads Just now, ahead of now it reads in 10 minutes.',
    'The words come from the browser\'s `Intl.RelativeTimeFormat`; `format` picks `long`, `short` or `narrow`.',
    'Every RelativeTime on the page redraws from one shared timer, once a minute, and stops it when none is left.',
    'The locale and Just now come from the app\'s strings, so a French app reads il y a 5 minutes.',
    'The full date shows in a Tooltip on hover; the text is a time element whose datetime holds the exact moment.',
  ],
  instead: '[Text] for a date the app formats itself.',
  playground: Playground,
  variants: [Ladder, Saves],
  sections: [
    { title: 'What it replaces', node: <PreviewCards entries={TIME_MAPPING} /> },
    { title: 'Options weighed', node: <PreviewCards entries={TIME_CHOICES} /> },
  ],
  code: TIME_CODE,
});

export default meta;
export { Ladder, Overview, Playground, Saves };
