/* @layer stories @kind component */
import { useState } from 'react';
import { FilterBar } from '../../../src/composites';
import { buildSchema, createClause, useDataTable } from '../../../src/data';
import type { FilterClause } from '../../../src/data';
import { Box, Field, Select, Span, Title } from '../../../src/primitives';
import { LOCATIONS, LOCATION_CONFIG } from './data-locations';
import { EngineGrid } from './engine-grid';
import { useLocationRows } from './use-location-rows';
import { ENGINE_COLUMNS, GROUPINGS, GROUPING_NAMES } from './engine-columns.constants';
import type { EnginePlaygroundProps } from './engine-playground.type';

type Grouping = EnginePlaygroundProps['grouping'];

const SCHEMA = buildSchema(LOCATIONS, LOCATION_CONFIG);
const COLUMNS = ENGINE_COLUMNS.map(({ path }) => ({ path }));
const GROUP_OPTIONS = GROUPING_NAMES.map((key) => ({ value: key, label: key }));
const STARTING_CLAUSES: readonly FilterClause[] = [createClause('progression', 'isTrue')];

const SpoilerExplorer = () => {
  const [search, setSearch] = useState('');
  const [clauses, setClauses] = useState<readonly FilterClause[]>(STARTING_CLAUSES);
  const [grouping, setGrouping] = useState<Grouping>('game');

  const rows = useLocationRows(clauses, search);

  const table = useDataTable({ rows, schema: SCHEMA, initial: COLUMNS, initialGroupBy: GROUPINGS.game });
  const games = new Set(rows.map((row) => row.game)).size;

  const regroup = (next: string): void => {
    const key = next as Grouping;
    setGrouping(key);
    table.setState({ columns: table.columns, sort: table.sort, groupBy: GROUPINGS[key] });
  };

  return (
    <Box className="spoiler-explorer">
      <Box className="spoiler-explorer__head">
        <Title level={3}>Spoiler log</Title>
        <Span tone="muted">{`${rows.length} locations across ${games} games. Click a column to sort.`}</Span>
      </Box>
      <Box className="spoiler-explorer__tools">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Find an item or a location..."
          searchLabel="Search the spoiler log"
          schema={SCHEMA}
          clauses={clauses}
          onChange={setClauses}
          extra={(
            <Field label="Group by" inline>
              <Select size="sm" value={grouping} onChange={regroup} options={GROUP_OPTIONS} />
            </Field>
          )}
        />
      </Box>
      <EngineGrid table={table} columns={ENGINE_COLUMNS} />
    </Box>
  );
};

export { SpoilerExplorer };
