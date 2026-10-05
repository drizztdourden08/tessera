/* @layer stories @kind component */
import '../../../src/composites/field-kits';
import { CodeBlock } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { LOCATIONS } from './data-locations';
import { useLocationRows } from './use-location-rows';
import { useSphereClauses } from './use-sphere-clauses';

type FilterDemoProps = {
  search: string;
  minSphere: number;
  progressionOnly: boolean;
};

const EngineFilterDemo = ({ search, minSphere, progressionOnly }: FilterDemoProps) => {
  const clauses = useSphereClauses(minSphere, progressionOnly);

  const shown = useLocationRows(clauses, search);

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
