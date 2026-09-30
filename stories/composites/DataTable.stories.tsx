/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { DataTable } from '../../src/composites';
import { MEMORY_VIEW_STORAGE } from '../../src/data';
import type { TableColumn, ViewStorage } from '../../src/data';
import { Box, Text } from '../../src/primitives';
import { PLAYERS, PLAYER_SCHEMA } from './_samples/data-players';
import type { PlayerRow } from './_samples/data-players';
import {
  HINTS, HINT_SCHEMA, resolveSlotDefault, resolveSlotField, resolveTargetFields,
} from './_samples/data-hints';
import type { HintRow } from './_samples/data-hints';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import './DataTable.stories.css';

type GroupChoice = 'none' | 'game' | 'status';

type DataTableArgs = {
  selectable: boolean;
  groupBy: GroupChoice;
  persistLayout: boolean;
  emptyMessage: string;
};

const PLAYER_COUNT: readonly [string, string] = ['player', 'players'];
const HINT_COUNT: readonly [string, string] = ['hint', 'hints'];
const NO_ROWS: readonly PlayerRow[] = [];

const playerId = (player: PlayerRow): string => player.id;
const hintId = (hint: HintRow): string => hint.id;

const PlayersDemo = ({ selectable, groupBy, persistLayout, emptyMessage }: DataTableArgs) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(new Set());
  const fallbackGroupBy = groupBy === 'none' ? undefined : [groupBy];
  const picked = selectable ? `${selectedIds.size} selected` : `Selected: ${selectedId ?? 'none'}`;

  return (
    <Box className="data-table-story">
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
      />
    </Box>
  );
};

const HintsDemo = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <Box className="data-table-story">
      <Text className="story-label">
        Finder and receiver are slot references. Open a column menu to pick which player field they show.
      </Text>
      <DataTable
        rows={HINTS}
        schema={HINT_SCHEMA}
        getRowId={hintId}
        selectedId={selectedId}
        onSelect={setSelectedId}
        countLabel={HINT_COUNT}
        resolveTargetFields={resolveTargetFields}
        resolveIdRefDisplay={resolveSlotField}
        resolveIdRefDefault={resolveSlotDefault}
      />
    </Box>
  );
};

const ARGS: Partial<DataTableArgs> = { selectable: false, groupBy: 'none', persistLayout: true, emptyMessage: 'No players have joined this session yet.' };

const ARG_TYPES: StoryLiteArgTypes<DataTableArgs> = {
    selectable: { control: 'boolean', description: 'Checkbox column with Ctrl, Shift and Escape selection' },
    groupBy: { control: 'select', options: ['none', 'game', 'status'], description: 'Grouping the table opens with' },
    persistLayout: { control: 'boolean', description: 'Bind a view key so column changes survive a remount' },
    emptyMessage: { control: 'text' },
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
} satisfies StoryLiteStoryDefinition<DataTableArgs>;

const References = {
  name: 'Reference columns',
  render: () => <HintsDemo />,
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

const STATE_ROWS = PLAYERS.slice(0, 1);
const STATE_COLUMNS: readonly TableColumn[] = [{ path: 'name' }, { path: 'game' }, { path: 'status' }];

const SORTED_STORAGE: ViewStorage = {
  load: () => Promise.resolve({ v: 1, columns: STATE_COLUMNS, sort: [{ path: 'name', dir: 'asc' }], groupBy: [], filters: [] }),
  save: () => undefined,
};

const renderState = (props: StateProps) => (
  <Box className="data-table-story data-table-story--state">
    <DataTable
      rows={props.empty === true ? NO_ROWS : STATE_ROWS}
      schema={PLAYER_SCHEMA}
      getRowId={playerId}
      fallbackColumns={STATE_COLUMNS}
      viewKey={props.sorted === true ? 'stories:players-sorted' : undefined}
      viewStorage={props.sorted === true ? SORTED_STORAGE : undefined}
      selectedId={props.selected === true ? STATE_ROWS[0]?.id : null}
      countLabel={PLAYER_COUNT}
      emptyMessage="No players have joined this session yet."
    />
  </Box>
);

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
  description: 'A table of records whose columns come from a schema. Use it for any collection a user browses, sorts and picks from. Its column menus sort, group, rename, resize, fit and remove columns, columns reorder by drag, and a view key keeps that layout between visits. It can add a checkbox column for picking many rows with Ctrl, Shift and Escape, and show a reference by a chosen field of its target.',
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
export { AllVariants, Overview, Players, References };
