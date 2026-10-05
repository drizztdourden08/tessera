/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { axis } from '../_template/axis';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { RowGridFrame } from './_samples/RowGridFrame';
import { RowGridSessionPage } from './_samples/RowGridSessionPage';
import { BOXES, ROW_GRID_ARG_TYPES, ROW_GRID_ARGS, ROW_GRID_CODE } from './_samples/row-grid-story.constants';
import type { RowGridArgs, RowSet } from './_samples/row-grid-story.type';
import './RowGrid.stories.css';

const meta = {
  title: 'Composites · Forms/RowGrid',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RowGridArgs>;

const Playground = {
  name: 'Playground',
  args: ROW_GRID_ARGS,
  argTypes: ROW_GRID_ARG_TYPES,
  render: (args) => <RowGridFrame width={args.width} rows={args.rows} density={args.density} numbered={args.numbered} />,
} satisfies PlaygroundStory<RowGridArgs>;

const Players = {
  name: 'The players of a session, live: type, pick, drag the grip, add and remove',
  render: () => <RowGridFrame width="full" />,
} satisfies StoryLiteStoryDefinition<RowGridArgs>;

const Widths = {
  name: 'The same grid in boxes 768, 512 and 384 px wide',
  render: () => (
    <Demonstrator rows={axis(BOXES)} align="start" cell={(width) => <RowGridFrame width={width} />} />
  ),
} satisfies StoryLiteStoryDefinition<RowGridArgs>;

const Session = {
  name: 'In the session builder, with a SaveBar at its foot',
  render: () => <RowGridSessionPage />,
} satisfies StoryLiteStoryDefinition<RowGridArgs>;

const Checks = {
  name: 'A check per cell: a shared name, an empty name and no game',
  render: () => <RowGridFrame width="full" rows="invalid" />,
} satisfies StoryLiteStoryDefinition<RowGridArgs>;

const Compact = {
  name: 'Compact, six rows',
  render: () => <RowGridFrame width="full" rows="six" density="compact" />,
} satisfies StoryLiteStoryDefinition<RowGridArgs>;

const STATE_SETS: readonly { name: string; rows: RowSet }[] = [
  { name: 'filled', rows: 'three' },
  { name: 'with errors', rows: 'invalid' },
  { name: 'empty', rows: 'none' },
];

const Overview = overviewStory({
  component: 'RowGrid',
  description: 'A short list edited in place, one row per item and one input per column: a table when wide, cards when narrow.',
  points: [
    'The grid picks its layout from its own width: a table, a table with a folded column, then cards.',
    'Each column has a `min` and a `max`, so a wide page never stretches the inputs; `fold` marks what moves first.',
    'The app keeps the rows: `onAdd`, `onRemove` and `onMove` change them, and the grid draws them.',
    'The grip and the row menu reorder; [[Ctrl+Up]] and [[Ctrl+Down]] move to the same column in the next row.',
    '`error` per column marks the input and writes the fix under it, in every layout.',
    '`density` `compact` fits more rows in a short panel; `numbered` adds a row number.',
  ],
  instead: '[DataTable] for many records to browse, sort and pick; [RecordEditor] for one record with many fields.',
  playground: Playground,
  variants: [Players, Widths, Session, Checks, Compact],
  states: {
    render: (props: StateProps) => <RowGridFrame width="1024" rows={(props.rows as RowSet | undefined) ?? 'three'} />,
    list: STATE_SETS.map(({ name, rows }) => ({ name, props: { rows } })),
  },
  code: ROW_GRID_CODE,
});

export default meta;
export { Checks, Compact, Overview, Players, Playground, Session, Widths };
