/* @layer stories @kind component */
import { useEffect } from 'react';
import { buildSchema, useDataTable } from '../../../src/data';
import type { SortEntry } from '../../../src/data';
import '../../../src/composites/field-kits';
import { Box, CodeBlock, Text } from '../../../src/primitives';
import { LOCATIONS, LOCATION_CONFIG } from './data-locations';
import { EngineGrid } from './engine-grid';
import { useLocationRows } from './use-location-rows';
import { useSphereClauses } from './use-sphere-clauses';
import { ENGINE_COLUMNS, GROUPINGS } from './engine-columns.constants';
import type { EnginePlaygroundProps } from './engine-playground.type';

const SCHEMA = buildSchema(LOCATIONS, LOCATION_CONFIG);
const COLUMNS = ENGINE_COLUMNS.map(({ path }) => ({ path }));

const EnginePlayground = (props: EnginePlaygroundProps) => {
  const { grouping, sortBy, descending, search, minSphere, progressionOnly } = props;
  const clauses = useSphereClauses(minSphere, progressionOnly);
  const rows = useLocationRows(clauses, search);

  const table = useDataTable({ rows, schema: SCHEMA, initial: COLUMNS });
  const { setState } = table;
  const groupBy = GROUPINGS[grouping];
  useEffect(() => {
    const sort: SortEntry[] = sortBy === 'none' ? [] : [{ path: sortBy, dir: descending ? 'desc' : 'asc' }];
    setState({ columns: COLUMNS, sort, groupBy });
  }, [setState, sortBy, descending, groupBy]);

  const state = { sort: table.sort, groupBy: table.groupBy, clauses: clauses.map(({ path, op, value }) => ({ path, op, value })) };

  return (
    <Box className="story-column engine-story">
      <Text className="story-label">{`${rows.length} of ${LOCATIONS.length} locations`}</Text>
      <EngineGrid table={table} columns={ENGINE_COLUMNS} />
      <Text className="story-label">The state behind it, plain data</Text>
      <CodeBlock language="json" code={JSON.stringify(state, null, 2)} />
    </Box>
  );
};

export { EnginePlayground };
