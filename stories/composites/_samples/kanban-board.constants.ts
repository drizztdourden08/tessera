/* @layer stories @kind data */
import type { PlaygroundArgTypes } from '../../_template/controls/playground.type';
import type { KanbanArgs, TaskColumn } from './kanban-board.type';

const TASK_COLUMNS: readonly TaskColumn[] = [
  {
    id: 'todo',
    title: 'To do',
    cards: [
      { id: 'login', title: 'Fix the login redirect', tags: ['bug', 'api'] },
      { id: 'tour', title: 'Write the first run tour', tags: ['docs'] },
      { id: 'icons', title: 'Redraw the toolbar icons', tags: ['design'] },
    ],
  },
  {
    id: 'doing',
    title: 'Doing',
    cards: [
      { id: 'export', title: 'Export a board as a file', tags: ['api'] },
      { id: 'dark', title: 'Check dark mode contrast', tags: ['design', 'bug'] },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    cards: [{ id: 'cache', title: 'Cache the project list', tags: ['api'] }],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      { id: 'readme', title: 'Update the readme', tags: ['docs'] },
      { id: 'crash', title: 'Fix the crash on save', tags: ['bug'] },
    ],
  },
];

const KANBAN_ARGS: KanbanArgs = { width: 'full', columnWidth: 'fixed', folded: 'none', emptyReview: false, slots: false, addForm: false, edges: false, columnHeight: 'stretch', grip: true, foldable: true, stack: false };

const KANBAN_ARG_TYPES: PlaygroundArgTypes<KanbanArgs> = {
  width: { group: 'Layout', control: 'select', options: ['full', 'narrow', 'phone'], description: 'A narrow box makes the board scroll sideways; phone is under 420 px, where stack applies.' },
  columnHeight: { group: 'Layout', control: 'select', options: ['stretch', 'fit'], description: 'fit sizes each column to its cards instead of the board height.' },
  stack: { group: 'Layout', control: 'boolean', description: 'Stack the columns top to bottom when the board is under 420 px wide.' },
  grip: { group: 'Behaviour', control: 'boolean', description: 'Off hides the drag grip; the arrow keys still move a card.' },
  foldable: { group: 'Behaviour', control: 'boolean', description: 'Off removes the fold chevron from every column.' },
  columnWidth: { group: 'Layout', control: 'select', options: ['fixed', 'fill'], description: 'fill shares the board width between the columns, down to a minimum.' },
  folded: { group: 'State', control: 'select', options: ['none', 'todo', 'doing', 'review', 'done'], description: 'The column that starts folded to a rail.' },
  emptyReview: { group: 'Content', control: 'boolean', description: 'Take the cards out of Review.' },
  slots: { group: 'Content', control: 'boolean', description: 'Add a badge and an Add button to the header of some columns.' },
  addForm: { group: 'Content', control: 'boolean', description: 'Put an inline add form above the cards of To do.' },
  edges: { group: 'Content', control: 'boolean', description: 'Draw a danger edge on the cards that need the user, with cardEdgeTone.' },
};

const KANBAN_CODE = `import { KanbanBoard, moveCard } from '@drizztdourden08/tessera';

<KanbanBoard
  label="Sprint 12"
  columns={columns}
  cardLabel={(task) => task.title}
  renderCard={(task) => <TaskCard task={task} />}
  onMove={(move) => setColumns((now) => moveCard(now, move))}
  defaultCollapsed={['done']}
  cardEdgeTone={(task) => (task.needsYou ? 'danger' : undefined)}
  columnHeight="fit"
  grip={false}
  foldable={false}
  stack
/>

const columns = [
  { id: 'todo', title: 'To do', cards, badge: <Badge variant="inline" value="quiet" />, action: <Button size="xs" variant="ghost">Add</Button> },
  { id: 'doing', title: 'Doing', cards, top: <InlineCreateForm label="New card" onCreate={addCard} compact /> },
];`;

export { KANBAN_ARG_TYPES, KANBAN_ARGS, KANBAN_CODE, TASK_COLUMNS };
