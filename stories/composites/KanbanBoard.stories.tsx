/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { KanbanDemo } from './_samples/KanbanDemo';
import { KANBAN_ARG_TYPES, KANBAN_ARGS, KANBAN_CODE } from './_samples/kanban-board.constants';
import type { FoldedColumn, KanbanArgs } from './_samples/kanban-board.type';
import './KanbanBoard.stories.css';

const meta = {
  title: 'Composites · Data views/KanbanBoard',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<KanbanArgs>;

const Playground = {
  name: 'Playground',
  args: KANBAN_ARGS,
  argTypes: KANBAN_ARG_TYPES,
  render: (args) => (
    <KanbanDemo key={`${args.folded}-${String(args.emptyReview)}`} width={args.width} columnWidth={args.columnWidth} folded={args.folded} emptyReview={args.emptyReview} slots={args.slots} addForm={args.addForm} edges={args.edges} />
  ),
} satisfies PlaygroundStory<KanbanArgs>;

const Live = {
  name: 'Four columns, live: drag a card, or press the arrow keys on its grip',
  render: () => <KanbanDemo />,
} satisfies StoryLiteStoryDefinition<KanbanArgs>;

const Folded = {
  name: 'Done folded to a rail with its title and count',
  render: () => <KanbanDemo folded="done" />,
} satisfies StoryLiteStoryDefinition<KanbanArgs>;

const Narrow = {
  name: 'In a narrow box the board scrolls sideways, each column on its own',
  render: () => <KanbanDemo width="narrow" />,
} satisfies StoryLiteStoryDefinition<KanbanArgs>;

const Fill = {
  name: 'Fill: the columns share the width; in a narrow box they keep a minimum and the board scrolls',
  render: () => (
    <>
      <KanbanDemo columnWidth="fill" />
      <KanbanDemo columnWidth="fill" width="narrow" />
    </>
  ),
} satisfies StoryLiteStoryDefinition<KanbanArgs>;

const Empty = {
  name: 'An empty column still takes a card',
  render: () => <KanbanDemo emptyReview />,
} satisfies StoryLiteStoryDefinition<KanbanArgs>;

const HeaderSlots = {
  name: 'Header slots: a badge and an Add button; the folded To do keeps its badge and drops Add',
  render: () => <KanbanDemo slots folded="todo" />,
} satisfies StoryLiteStoryDefinition<KanbanArgs>;

const AddForm = {
  name: 'An inline add form above the cards, in top; folding To do hides it',
  render: () => <KanbanDemo addForm />,
} satisfies StoryLiteStoryDefinition<KanbanArgs>;

const CardEdges = {
  name: 'cardEdgeTone: a danger edge on the cards that need the user',
  render: () => <KanbanDemo edges />,
} satisfies StoryLiteStoryDefinition<KanbanArgs>;

const FOLDS: readonly FoldedColumn[] = ['none', 'doing'];

const Overview = overviewStory({
  component: 'KanbanBoard',
  description: 'Cards in named columns, such as tasks by state, that the user drags or moves by keys within a column or to another one.',
  points: [
    'The app names the columns and owns the cards; `onMove` reports the card, where it was and where it went.',
    'Drag the grip, or press [[Up]] and [[Down]] to move within a column and [[Left]] and [[Right]] to change column.',
    'Each move is announced, and focus stays on the card, even in its new column.',
    'A header has the count, `badge`, `action` and a fold button; `top` adds a form above the cards.',
    '`renderCard` draws the inside of a card; `cardEdgeTone` gives a card a coloured edge, such as `danger`.',
    'Each column scrolls on its own; `columnWidth="fill"` shares the width, and a narrow board scrolls.',
  ],
  instead: '[RowGrid] for one list edited in place, or [DataTable] for many records to sort and filter.',
  playground: Playground,
  variants: [Live, Fill, HeaderSlots, AddForm, CardEdges, Folded, Narrow, Empty],
  states: {
    render: (props: StateProps) => <KanbanDemo folded={(props.folded as FoldedColumn | undefined) ?? 'none'} />,
    list: FOLDS.map((folded) => ({ name: folded === 'none' ? 'all open' : 'one folded', props: { folded } })),
  },
  code: KANBAN_CODE,
});

export default meta;
export { AddForm, CardEdges, Empty, Fill, Folded, HeaderSlots, Live, Narrow, Overview, Playground };
