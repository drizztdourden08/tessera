/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { DataTable } from '../../src/composites';
import { MEMORY_VIEW_STORAGE } from '../../src/data';
import { Text } from '../../src/primitives';
import { PLAYERS, PLAYER_SCHEMA } from './_samples/data-players';
import type { PlayerRow } from './_samples/data-players';
import { resolveSlotDefault } from './_samples/data-hints';
import { DataTableCellControls } from './_samples/DataTableCellControls';
import { DataTableControlled } from './_samples/DataTableControlled';
import { DataTableDetailConfirm } from './_samples/DataTableDetailConfirm';
import { DataTableDetailForm } from './_samples/DataTableDetailForm';
import { DataTableGroupActions } from './_samples/DataTableGroupActions';
import { DataTableRowDrag } from './_samples/DataTableRowDrag';
import { DataTableRowMarquee } from './_samples/DataTableRowMarquee';
import { DataTableRowStates } from './_samples/DataTableRowStates';
import { DataTableThumbnail } from './_samples/DataTableThumbnail';
import { DataTableUnits } from './_samples/DataTableUnits';
import { DataTableHints } from './_samples/DataTableHints';
import { renderState } from './_samples/data-table-state';
import { slotHref } from './_samples/slot-href';
import { LongGroupsDemo } from './_samples/LongGroupsDemo';
import { LinkSandbox } from '../primitives/_samples/LinkSandbox';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import './DataTable.stories.css';

type GroupChoice = 'none' | 'game' | 'status';

type DataTableArgs = {
  selectable: boolean;
  groupBy: GroupChoice;
  persistLayout: boolean;
  emptyMessage: string;
};

const PLAYER_COUNT: readonly [string, string] = ['player', 'players'];

const playerId = (player: PlayerRow): string => player.id;

const PlayersDemo = ({ selectable, groupBy, persistLayout, emptyMessage }: DataTableArgs) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(new Set());
  const fallbackGroupBy = groupBy === 'none' ? undefined : [groupBy];
  const picked = selectable ? `${selectedIds.size} selected` : `Selected: ${selectedId ?? 'none'}`;

  return (
    <LinkSandbox className="data-table-story">
      <Text className="story-label">{picked}</Text>
      <DataTable
        key={`${groupBy}-${String(persistLayout)}`}
        rows={PLAYERS}
        schema={PLAYER_SCHEMA}
        getRowId={playerId}
        viewKey={persistLayout ? `stories:players-${groupBy}` : undefined}
        viewStorage={MEMORY_VIEW_STORAGE}
        fallbackGroupBy={fallbackGroupBy}
        selectedId={selectedId}
        onSelect={setSelectedId}
        selectedIds={selectable ? selectedIds : undefined}
        onSelectionChange={setSelectedIds}
        selectable={selectable}
        countLabel={PLAYER_COUNT}
        emptyMessage={emptyMessage}
        resolveIdRefDefault={resolveSlotDefault}
        resolveIdRefHref={slotHref}
      />
    </LinkSandbox>
  );
};


const ARGS: Partial<DataTableArgs> = { selectable: false, groupBy: 'none', persistLayout: true, emptyMessage: 'No players have joined this session yet.' };

const ARG_TYPES: PlaygroundArgTypes<DataTableArgs> = {
    emptyMessage: { group: 'Content', control: 'text' },
    selectable: { group: 'Behaviour', control: 'boolean', description: 'Checkbox column with Ctrl, Shift and Escape selection' },
    persistLayout: { group: 'Behaviour', control: 'boolean', description: 'Bind a view key so column changes survive a remount' },
    groupBy: { group: 'Data', control: 'select', options: ['none', 'game', 'status'], description: 'Grouping the table opens with' },
  };

const meta = {
  title: 'Composites · Data views/DataTable',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DataTableArgs>;

const Players = {
  name: 'Session roster',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PlayersDemo {...args} />,
} satisfies PlaygroundStory<DataTableArgs>;

const References = {
  name: 'Reference columns',
  render: () => <DataTableHints />,
} satisfies StoryLiteStoryDefinition<DataTableArgs>;

const LongGroups = {
  name: 'Long groups',
  render: () => <LongGroupsDemo />,
} satisfies StoryLiteStoryDefinition<DataTableArgs>;

const GroupActions = {
  name: 'Group header actions: select every player of a game',
  render: () => <DataTableGroupActions />,
} satisfies StoryLiteStoryDefinition<DataTableArgs>;

const RowDrag = {
  name: 'Row drag: reorder by the grip or Up and Down, drag a row out to the folder',
  render: () => <DataTableRowDrag />,
} satisfies StoryLiteStoryDefinition<DataTableArgs>;

const RowMarquee = {
  name: 'Marquee over rows, in groups, with rows drawn as you scroll',
  render: () => <DataTableRowMarquee />,
} satisfies StoryLiteStoryDefinition<DataTableArgs>;

const Thumbnail = {
  name: 'Thumbnail cell: renderCell and rowHeight',
  render: () => <DataTableThumbnail />,
} satisfies StoryLiteStoryDefinition<DataTableArgs>;

const CellControls = {
  name: 'Controls in cells: Tags, a Tooltip and an IconButton leave the selection alone',
  render: () => <DataTableCellControls />,
} satisfies StoryLiteStoryDefinition<DataTableArgs>;

const Units = {
  name: 'Numbers with a unit: 12.4 MB, sorted as numbers',
  render: () => <DataTableUnits />,
} satisfies StoryLiteStoryDefinition<DataTableArgs>;

const RowStates = {
  name: 'Row states: active, pending, error and muted',
  render: () => <DataTableRowStates />,
} satisfies StoryLiteStoryDefinition<DataTableArgs>;

const Controlled = {
  name: 'Controlled sort and expand, driven by buttons',
  render: () => <DataTableControlled />,
} satisfies StoryLiteStoryDefinition<DataTableArgs>;

const DetailConfirm = {
  name: 'Row detail: inline delete confirm',
  render: () => <DataTableDetailConfirm />,
} satisfies StoryLiteStoryDefinition<DataTableArgs>;

const DetailForm = {
  name: 'Row detail: small edit form, inside groups',
  render: () => <DataTableDetailForm />,
} satisfies StoryLiteStoryDefinition<DataTableArgs>;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Demonstrator
      rows={axis(['Grouped by game', 'Selectable'])}
      align="stretch"
      cell={(kind) => (kind === 'Selectable'
        ? <PlayersDemo selectable groupBy="none" persistLayout={false} emptyMessage="" />
        : <PlayersDemo selectable={false} groupBy="game" persistLayout={false} emptyMessage="" />)}
    />
  ),
} satisfies StoryLiteStoryDefinition<DataTableArgs>;


const CODE = `import { DataTable } from '@drizztdourden08/tessera';

<DataTable
  rows={players}
  schema={PLAYER_SCHEMA}
  getRowId={(player) => player.id}
  viewKey="session:players"
  fallbackGroupBy={['game']}
  selectedId={selectedId}
  onSelect={setSelectedId}
  countLabel={['player', 'players']}
/>`;

const Overview = overviewStory({
  component: 'DataTable',
  description: 'A table of records whose columns come from a schema, for any collection the user browses, sorts and picks from.',
  points: [
    'Give it `rows`, a `schema` and `getRowId`; columns follow the schema, and a number can carry a `unit`.',
    'Column menus sort, group, rename, resize and remove columns; `viewKey` keeps the layout between visits.',
    '`selectable` adds a checkbox column for picking many rows with [[Ctrl]], [[Shift]] and [[Esc]].',
    '`defaultExpanded` picks the groups that start open; `virtualizeFrom` draws only the rows in view.',
    '`groupActions` adds header buttons; `onRowMove` and `rowDragData` move rows; `getRects` feeds a marquee.',
    '`renderCell`, `rowState` (with warning), `rowHeight` shape rows; `renderDetail` adds a panel; you own `sort`.',
  ],
  instead: '[ListItemRow] for a short list of rich rows with no columns to sort.',
  playground: Players,
  variants: [AllVariants],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.data-table__row' },
      { name: 'Empty', props: { empty: true } },
      STATE.selected,
      { name: 'Sorted', props: { sorted: true } },
    ],
  },
  code: CODE,
});

export default meta;
export {
  AllVariants, CellControls, Controlled, DetailConfirm, DetailForm, GroupActions, LongGroups, Overview, Players, References, RowDrag, RowMarquee, RowStates, Thumbnail, Units,
};
