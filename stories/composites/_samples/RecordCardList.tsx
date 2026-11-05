/* @layer stories @kind component */
import { RecordCard } from '../../../src/composites';
import { Badge } from '../../../src/primitives/Badge';
import { Box } from '../../../src/primitives/Box';
import { Text } from '../../../src/primitives/Text';
import { TypeMark } from '../../../src/primitives/TypeMark';
import { RecordCardMenu } from './RecordCardMenu';
import { RECORD_ROWS } from './RecordCardSamples.constants';

const RecordCardList = () => (
  <Box className="record-card-story__list">
    {RECORD_ROWS.map((row) => (
      <RecordCard key={row.code} density="row" title={row.title} icon={<TypeMark icon="bug" label="Bug" tone="danger" />} code={row.code} content={<Badge variant="inline" value="Open" color="info" />} menu={<RecordCardMenu />}>
        <Text>{row.note}</Text>
      </RecordCard>
    ))}
  </Box>
);

export { RecordCardList };
