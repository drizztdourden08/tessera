/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { ScrubRulerDemo } from './_samples/ScrubRulerDemo';
import { ScrubRulerExtras } from './_samples/ScrubRulerExtras';

type ScrubRulerArgs = {
  time: boolean;
  markers: boolean;
  withBand: boolean;
  readOnly: boolean;
};

const ARGS: Partial<ScrubRulerArgs> = { time: false, markers: true, withBand: true, readOnly: false };

const ARG_TYPES: PlaygroundArgTypes<ScrubRulerArgs> = {
  time: { group: 'Layout', control: 'boolean', description: 'Cells of different widths.' },
  markers: { group: 'Content', control: 'boolean', description: 'Draggable markers such as a hit frame.' },
  withBand: { group: 'Content', control: 'boolean', description: 'A range band, drawn by dragging on the ruler.' },
  readOnly: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Composites · Inputs/ScrubRuler',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ScrubRulerArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ScrubRulerDemo {...args} />,
} satisfies PlaygroundStory<ScrubRulerArgs>;

const Scrubbing = {
  name: 'Scrubbing',
  render: () => <ScrubRulerDemo />,
} satisfies StoryLiteStoryDefinition<ScrubRulerArgs>;

const Band = {
  name: 'With a range band',
  render: () => <ScrubRulerDemo withBand />,
} satisfies StoryLiteStoryDefinition<ScrubRulerArgs>;

const Markers = {
  name: 'With markers',
  render: () => <ScrubRulerDemo markers />,
} satisfies StoryLiteStoryDefinition<ScrubRulerArgs>;

const ReadOnly = {
  name: 'Read only',
  render: () => <ScrubRulerDemo readOnly markers withBand />,
} satisfies StoryLiteStoryDefinition<ScrubRulerArgs>;

const Empty = {
  name: 'No cells',
  render: () => <ScrubRulerDemo empty />,
} satisfies StoryLiteStoryDefinition<ScrubRulerArgs>;

const TimeMode = {
  name: 'Cells of different widths',
  render: () => <ScrubRulerDemo time markers />,
} satisfies StoryLiteStoryDefinition<ScrubRulerArgs>;

const Extras = {
  name: 'Second band, edge markers, compact',
  render: () => <ScrubRulerExtras />,
} satisfies StoryLiteStoryDefinition<ScrubRulerArgs>;

const Overview = overviewStory({
  component: 'ScrubRuler',
  description: 'A ruler over a row of cells. Drag along it to move the current cell, or use the keys.',
  points: [
    'The track is one slider: arrows step one cell, [[PageUp]] and [[PageDown]] ten, [[Home]] and [[End]] jump.',
    '`markers` are sliders held between `min` and `max`; `markerAnchor="edge"` puts them on the cell border.',
    '`band` marks a range drawn by dragging; `secondBand` adds a read-only range beside it.',
    '`onCellContextMenu` reports the cell under the pointer; `compact` shrinks the ruler to 20 px.',
    '`tickEvery` thins the labels to fit, `auto` by default; `tickLabel` writes each one.',
    '`cells` shares its geometry with SpanBar, so a ruler and its bars line up for any cell widths.',
  ],
  instead: '[SpanBar] for a range of cells that is moved as one piece.',
  playground: Playground,
  variants: [Scrubbing, Band, Markers, Extras, ReadOnly, Empty, TimeMode],
});

export default meta;
export { Band, Empty, Extras, Markers, Overview, Playground, ReadOnly, Scrubbing, TimeMode };
