/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { axis } from '../_template/axis';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { PreviewChoices } from './_shared/PreviewChoices';
import { PreviewList } from './_shared/PreviewList';
import { PreviewUsageView } from './_shared/PreviewUsageView';
import { ROW_GRID_USAGE } from './RowGrid/row-grid-usage.constants';
import { FramedGrid } from './RowGrid/_samples/FramedGrid';
import { SessionBuilderPage } from './RowGrid/_samples/SessionBuilderPage';
import {
  BOXES, KEYS, ROW_GRID_ARG_TYPES, ROW_GRID_ARGS, ROW_GRID_CHOICES, ROW_GRID_CODE, WIDTH_PLAN,
} from './RowGrid/_samples/row-grid-story.constants';
import type { RowGridArgs, RowSet } from './RowGrid/_samples/row-grid-story.type';
import './RowGrid.stories.css';

const meta = {
  title: 'Preview · For approval/RowGrid',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RowGridArgs>;

const Playground = {
  name: 'Playground',
  args: ROW_GRID_ARGS,
  argTypes: ROW_GRID_ARG_TYPES,
  render: (args) => <FramedGrid width={args.width} rows={args.rows} density={args.density} numbered={args.numbered} />,
} satisfies PlaygroundStory<RowGridArgs>;

const Players = {
  name: 'The players of a session, live: type, pick, drag the grip, add and remove',
  render: () => <FramedGrid width="full" />,
} satisfies StoryLiteStoryDefinition<RowGridArgs>;

const Widths = {
  name: 'The same grid in boxes 768, 512 and 384 px wide',
  render: () => (
    <Demonstrator rows={axis(BOXES)} align="start" cell={(width) => <FramedGrid width={width} />} />
  ),
} satisfies StoryLiteStoryDefinition<RowGridArgs>;

const Session = {
  name: 'In the session builder, under the editor bar of EditorHeader',
  render: () => <SessionBuilderPage />,
} satisfies StoryLiteStoryDefinition<RowGridArgs>;

const Checks = {
  name: 'A check per cell: a shared name, an empty name and no game',
  render: () => <FramedGrid width="full" rows="invalid" />,
} satisfies StoryLiteStoryDefinition<RowGridArgs>;

const Compact = {
  name: 'Compact, six rows',
  render: () => <FramedGrid width="full" rows="six" density="compact" />,
} satisfies StoryLiteStoryDefinition<RowGridArgs>;

const STATE_SETS: readonly { name: string; rows: RowSet }[] = [
  { name: 'filled', rows: 'three' },
  { name: 'with errors', rows: 'invalid' },
  { name: 'empty', rows: 'none' },
];

const Overview = overviewStory({
  component: 'RowGrid',
  description: 'A design for the owner to approve, not a released part: rows of inputs edited in place, a table when wide and cards when narrow.',
  points: [
    '**For approval:** this page lives in the gallery only, and nothing on it ships until it is approved.',
    'The grid picks its layout from its own width: a table, a table with a folded column, then cards.',
    'Each column has a `min` and a `max`, so a wide page never stretches the inputs; `fold` marks what moves first.',
    'The grip and the row menu reorder; [[Ctrl+Up]] and [[Ctrl+Down]] move to the same column in the next row.',
    '`error` per column marks the input and writes the fix under it, in every layout.',
  ],
  instead: '[DataTable] for many records to browse, sort and pick; [RecordEditor] for one record with many fields.',
  playground: Playground,
  variants: [Players, Widths, Session, Checks, Compact],
  sections: [
    { title: 'At each width', node: <PreviewList title="What the grid does" lines={WIDTH_PLAN} /> },
    { title: 'Keys, adding, removing and moving', node: <PreviewList title="How it answers" lines={KEYS} /> },
    { title: 'Options weighed', node: <PreviewChoices choices={ROW_GRID_CHOICES} /> },
    { title: 'How to use it', node: <PreviewUsageView name="RowGrid" usage={ROW_GRID_USAGE} /> },
  ],
  states: {
    render: (props: StateProps) => <FramedGrid width="1024" rows={(props.rows as RowSet | undefined) ?? 'three'} />,
    list: STATE_SETS.map(({ name, rows }) => ({ name, props: { rows } })),
  },
  code: ROW_GRID_CODE,
});

export default meta;
export { Checks, Compact, Overview, Players, Playground, Session, Widths };
