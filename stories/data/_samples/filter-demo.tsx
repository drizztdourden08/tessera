/* @layer stories @kind component */
import { useMemo } from 'react';
import { buildSchema, compile, compileTextSearch, createClause } from '../../../src/data';
import type { FilterClause } from '../../../src/data';
import { CodeBlock } from '../../../src/composites';
import '../../../src/composites/field-kits';
import { Box, Text } from '../../../src/primitives';
import { LOCATIONS, LOCATION_CONFIG } from './data-locations';

type FilterDemoProps = {
  search: string;
  minSphere: number;
  progressionOnly: boolean;
};

const SCHEMA = buildSchema(LOCATIONS, LOCATION_CONFIG);

const EngineFilterDemo = ({ search, minSphere, progressionOnly }: FilterDemoProps) => {
  const clauses = useMemo<readonly FilterClause[]>(() => [
    createClause('sphere', 'gte', minSphere),
    ...(progressionOnly ? [createClause('progression', 'isTrue')] : []),
  ], [minSphere, progressionOnly]);

  const shown = useMemo(() => {
    const matches = compile(clauses, SCHEMA);
    const text = compileTextSearch(search);
    return LOCATIONS.filter((row) => matches(row) && (!text || text(row)));
  }, [clauses, search]);

  const asData = clauses.map(({ path, op, value, enabled }) => ({ path, op, value, enabled }));

  return (
    <Box className="story-column">
      <Text className="story-label">Clauses</Text>
      <CodeBlock language="json" code={JSON.stringify(asData, null, 2)} />
      <Text className="story-label">{`${shown.length} of ${LOCATIONS.length} locations match`}</Text>
      {shown.map((row) => (
        <Text key={row.id}>{`${row.name} (${row.game}), sphere ${row.sphere}: ${row.item}`}</Text>
      ))}
    </Box>
  );
};

export { EngineFilterDemo };
