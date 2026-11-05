/* @layer stories @kind component */
import { RecordCard } from '../../../src/composites';
import { Badge } from '../../../src/primitives/Badge';
import { Box } from '../../../src/primitives/Box';
import { Text } from '../../../src/primitives/Text';
import { RECORD_ROWS } from './RecordCardSamples.constants';

const RecordCardGrid = () => (
  <Box className="record-card-story__grid">
    {RECORD_ROWS.map((row) => (
      <RecordCard key={row.code} fill defaultOpen title={row.title} code={row.code} content={<Badge variant="inline" value="Open" color="info" />}>
        <Text>{row.note}</Text>
      </RecordCard>
    ))}
  </Box>
);

export { RecordCardGrid };
