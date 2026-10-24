/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { SwatchPalette } from './_samples/SwatchPalette';
import { SWATCH_ARG_TYPES, SWATCH_ARGS, SWATCH_CODE } from './_samples/swatch-story.constants';
import type { PaletteSet, SwatchArgs } from './_samples/swatch-story.type';
import './SwatchGrid.stories.css';

const meta = {
  title: 'Composites · Inputs/SwatchGrid',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SwatchArgs>;

const Playground = {
  name: 'Playground',
  args: SWATCH_ARGS,
  argTypes: SWATCH_ARG_TYPES,
  render: (args) => <SwatchPalette key={args.palette} palette={args.palette} size={args.size} showIndex={args.showIndex} columns={8} />,
} satisfies PlaygroundStory<SwatchArgs>;

const Sixteen = {
  name: 'Sixteen colours, live: select, Ctrl-click for the background, drag or Alt+arrows to reorder',
  render: () => <SwatchPalette columns={8} />,
} satisfies StoryLiteStoryDefinition<SwatchArgs>;

const FullPalette = {
  name: 'Two hundred fifty-six colours in a box that scrolls, fitted to the width',
  render: () => <SwatchPalette palette="full" size="sm" tall />,
} satisfies StoryLiteStoryDefinition<SwatchArgs>;

const TransparentSlot = {
  name: 'A transparent slot first, drawn as a checkerboard',
  render: () => <SwatchPalette palette="clear" columns={8} />,
} satisfies StoryLiteStoryDefinition<SwatchArgs>;

const RangeSelection = {
  name: 'A range: Shift+click or Shift+arrows from the selected swatch',
  render: () => <SwatchPalette columns={8} startRange={{ from: 2, to: 6 }} />,
} satisfies StoryLiteStoryDefinition<SwatchArgs>;

const STATE_SETS: readonly { name: string; palette: PaletteSet }[] = [
  { name: 'filled', palette: 'sixteen' },
  { name: 'with a transparent slot', palette: 'clear' },
  { name: 'empty', palette: 'none' },
];

const Overview = overviewStory({
  component: 'SwatchGrid',
  description: 'A grid of colour swatches to pick from, select a range of and put in order, such as a pixel art palette.',
  points: [
    'The app keeps the colours: `onMove` gets the old and the new index, and the grid draws what it is given.',
    'A `value` of null is a transparent slot, drawn as a checkerboard. `selectedId` marks the primary colour.',
    '[[Shift]] with a click or an arrow reports a range in `onRangeChange`. [[Ctrl]] with a click picks `secondaryId`.',
    'Arrows move focus in two dimensions. [[Alt]] with an arrow, or a drag, moves the swatch. A move is announced.',
    'A listbox of option buttons, one tab stop. Delete is left to the app.',
  ],
  instead: '[ColorPicker] to make any colour, or [ReorderList] for named rows in one column.',
  playground: Playground,
  variants: [Sixteen, FullPalette, TransparentSlot, RangeSelection],
  states: {
    render: (props: StateProps) => <SwatchPalette palette={(props.palette as PaletteSet | undefined) ?? 'sixteen'} columns={8} />,
    list: STATE_SETS.map(({ name, palette }) => ({ name, props: { palette } })),
  },
  code: SWATCH_CODE,
});

export default meta;
export { FullPalette, Overview, Playground, RangeSelection, Sixteen, TransparentSlot };
