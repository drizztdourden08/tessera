/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { DateText } from '../../src/composites';
import { DATE_PRESETS, TesseraProvider } from '../../src/primitives';
import type { DateLength, DatePreset } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { DateFormatTable } from './_samples/DateFormatTable';
import { DateInData } from './_samples/DateInData';
import { DateLadder } from './_samples/DateLadder';
import { DateRunning } from './_samples/DateRunning';
import { DateSaveList } from './_samples/DateSaveList';
import { DATE_CODE, FRENCH, MINUTE_MS } from './_samples/date-text-samples.constants';

type LengthChoice = 'default' | DateLength;

type TooltipChoice = 'default' | 'on' | 'off';

type DateTextArgs = { minutesAgo: number; format: DatePreset; length: LengthChoice; tooltip: TooltipChoice; french: boolean };

const TOOLTIPS: Readonly<Record<TooltipChoice, boolean | undefined>> = { default: undefined, on: true, off: false };

const meta = {
  title: 'Composites · Content/DateText',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DateTextArgs>;

const Playground = {
  name: 'Playground',
  args: { minutesAgo: 5, format: 'relative', length: 'default', tooltip: 'default', french: false },
  argTypes: {
    minutesAgo: { group: 'Content', control: 'number', description: 'How many minutes before now; below zero is ahead.' },
    format: { group: 'Appearance', control: 'select', options: [...DATE_PRESETS] },
    length: { group: 'Appearance', control: 'select', options: ['default', 'short', 'medium', 'long'] },
    tooltip: { group: 'Behaviour', control: 'select', options: ['default', 'on', 'off'], description: 'The full date on hover; on by default for relative and calendar.' },
    french: { group: 'Content', control: 'boolean', description: 'Wraps it in a TesseraProvider with French date strings.' },
  },
  render: ({ minutesAgo, format, length, tooltip, french }) => {
    const node = (
      <DateText value={Date.now() - minutesAgo * MINUTE_MS} format={format} length={length === 'default' ? undefined : length} tooltip={TOOLTIPS[tooltip]} />
    );
    return french ? <TesseraProvider overrides={FRENCH}>{node}</TesseraProvider> : node;
  },
} satisfies PlaygroundStory<DateTextArgs>;

const Formats = {
  name: 'Every format in three lengths and in French, three hours ago',
  render: () => <DateFormatTable />,
} satisfies StoryLiteStoryDefinition<DateTextArgs>;

const Live = {
  name: 'Live: from a few seconds to a year, ahead of now too',
  render: () => <DateLadder />,
} satisfies StoryLiteStoryDefinition<DateTextArgs>;

const Running = {
  name: 'Running jobs: elapsed time that ticks, with a label',
  render: () => <DateRunning />,
} satisfies StoryLiteStoryDefinition<DateTextArgs>;

const Saves = {
  name: 'RotP\'s save list: ItemList rows with the age as meta',
  render: () => <DateSaveList />,
} satisfies StoryLiteStoryDefinition<DateTextArgs>;

const InData = {
  name: 'In a FactsPanel and in DataTable columns',
  render: () => <DateInData />,
} satisfies StoryLiteStoryDefinition<DateTextArgs>;

const Overview = overviewStory({
  component: 'DateText',
  description: 'A date or a time in any common format, such as 5 minutes ago or Today, 21:40, with the full date on hover.',
  points: [
    '`value` takes a Date, an ISO string or epoch ms; `format` takes a preset or Intl date options.',
    'Presets: relative, elapsed, calendar, date, time, datetime, weekday, month, iso; `length` is short to long.',
    'Relative and calendar redraw from one shared 10 s clock; elapsed ticks each second, minute or hour.',
    '`elapsed` reads 4m 03s or 2d 3h; `length="short"` keeps one unit: 12s, 4m, 3h, 2d; `label` adds a word.',
    'The full date shows in a Tooltip, on for relative, elapsed and calendar; set `tooltip` to change it.',
    'The locale, units and words such as Just now come from the `dates` strings; `formatDate` gives the same text.',
  ],
  instead: '[Time] for a date the app has already written as text.',
  playground: Playground,
  variants: [Formats, Live, Running, Saves, InData],
  code: DATE_CODE,
});

export default meta;
export { Formats, InData, Live, Overview, Playground, Running, Saves };
