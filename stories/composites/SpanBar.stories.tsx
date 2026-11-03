/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { SpanBarDemo } from './_samples/SpanBarDemo';
import { SpanBarTinted } from './_samples/SpanBarTinted';

type SpanBarArgs = {
  label: string;
  selected: boolean;
  readOnly: boolean;
  time: boolean;
  lane: boolean;
  snap: 'cell' | 'none';
  colour: 'rose' | 'amber' | 'green' | 'teal' | 'blue' | 'violet';
};

const ARGS: Partial<SpanBarArgs> = { label: 'Walk', selected: false, readOnly: false, time: false, lane: true, snap: 'cell', colour: 'blue' };

const ARG_TYPES: PlaygroundArgTypes<SpanBarArgs> = {
  label: { group: 'Content', control: 'text' },
  colour: { group: 'Appearance', control: 'select', options: ['rose', 'amber', 'green', 'teal', 'blue', 'violet'] },
  selected: { group: 'State', control: 'boolean' },
  readOnly: { group: 'State', control: 'boolean' },
  snap: { group: 'Behaviour', control: 'select', options: ['cell', 'none'], description: 'Snap the span to cell borders, or follow the pointer.' },
  time: { group: 'Layout', control: 'boolean', description: 'Cells of different widths, such as frames with different hold times.' },
  lane: { group: 'Behaviour', control: 'boolean', description: 'Drag on the empty lane to draw a new span.' },
};

const meta = {
  title: 'Composites · Inputs/SpanBar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SpanBarArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SpanBarDemo {...args} />,
} satisfies PlaygroundStory<SpanBarArgs>;

const Rest = {
  name: 'Rest',
  render: () => <SpanBarDemo />,
} satisfies StoryLiteStoryDefinition<SpanBarArgs>;

const Selected = {
  name: 'Selected',
  render: () => <SpanBarDemo selected />,
} satisfies StoryLiteStoryDefinition<SpanBarArgs>;

const ReadOnly = {
  name: 'Read only',
  render: () => <SpanBarDemo readOnly />,
} satisfies StoryLiteStoryDefinition<SpanBarArgs>;

const Coloured = {
  name: 'Colour',
  render: () => <SpanBarDemo colour="violet" label="Jump" />,
} satisfies StoryLiteStoryDefinition<SpanBarArgs>;

const Narrow = {
  name: 'Narrow, no label',
  render: () => <SpanBarDemo label="" />,
} satisfies StoryLiteStoryDefinition<SpanBarArgs>;

const TimeMode = {
  name: 'Cells of different widths',
  render: () => <SpanBarDemo time colour="teal" />,
} satisfies StoryLiteStoryDefinition<SpanBarArgs>;

const LaneCreate = {
  name: 'Draw a new span on the lane',
  render: () => <SpanBarDemo lane colour="green" />,
} satisfies StoryLiteStoryDefinition<SpanBarArgs>;

const Tinted = {
  name: 'Tint, data attributes and one tab stop',
  render: () => <SpanBarTinted />,
} satisfies StoryLiteStoryDefinition<SpanBarArgs>;

const Overview = overviewStory({
  component: 'SpanBar',
  description: 'A bar over a row of cells. Drag it to move, stretch it from either end, or use the keys.',
  points: [
    '`cells` gives the left and width of every cell, so equal cells and cells of different widths work alike.',
    'Drag the body to move the span, and drag the left or right edge to resize it; `snap` picks cell or free.',
    '[[Alt]] + [[Shift]] + arrows move the end; [[Alt]] + [[Ctrl]] + arrows move the span; [[Enter]] activates.',
    '`onDraft` follows a drag in progress, and `onChange` fires once when it ends; [[Esc]] cancels the drag.',
    '`SpanLane` is the row that holds the bars; dragging on its empty part draws a new span through `onCreate`.',
    '`announce` reads the new range after a key step; `tint` colours one span and `data` adds data attributes.',
  ],
  instead: '[ScrubRuler] to pick one cell on the same cells.',
  playground: Playground,
  variants: [Rest, Selected, ReadOnly, Coloured, Tinted, Narrow, TimeMode, LaneCreate],
});

export default meta;
export { Coloured, LaneCreate, Narrow, Overview, Playground, ReadOnly, Rest, Selected, Tinted, TimeMode };
