/* @layer stories @kind component */
import { DataTable } from '../../../src/composites';
import type { TableColumn, ViewStorage } from '../../../src/data';
import { Box } from '../../../src/primitives';
import type { StateProps } from '../../_template/states/states.type';
import { PLAYER_SCHEMA, PLAYERS } from './data-players';
import type { PlayerRow } from './data-players';

const PLAYER_COUNT: readonly [string, string] = ['player', 'players'];
const NO_ROWS: readonly PlayerRow[] = [];
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
      getRowId={(player) => player.id}
      fallbackColumns={STATE_COLUMNS}
      viewKey={props.sorted === true ? 'stories:players-sorted' : undefined}
      viewStorage={props.sorted === true ? SORTED_STORAGE : undefined}
      selectedId={props.selected === true ? STATE_ROWS[0]?.id : null}
      countLabel={PLAYER_COUNT}
      emptyMessage="No players have joined this session yet."
    />
  </Box>
);

export { renderState };
