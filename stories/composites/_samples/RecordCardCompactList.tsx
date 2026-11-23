/* @layer stories @kind component */
import { RecordCard } from '../../../src/composites';
import { Badge } from '../../../src/primitives/Badge';
import { Box } from '../../../src/primitives/Box';
import { TypeMark } from '../../../src/primitives/TypeMark';
import { RecordCardMenu } from './RecordCardMenu';
import { RECORD_ROWS } from './RecordCardSamples.constants';

const RecordCardCompactList = () => (
  <Box className="record-card-story__list">
    {RECORD_ROWS.map((row) => (
      <RecordCard
        key={row.code}
        density="compact"
        chevronOnIcon
        title={`${row.title}: ${row.note}`}
        icon={<TypeMark icon="bug" label="Bug" tone="danger" />}
        code={row.code}
        content={<Badge variant="inline" value="Open" color="info" />}
        end={<Badge variant="inline" value="AB" color="tame" />}
        menu={<RecordCardMenu />}
      />
    ))}
  </Box>
);

export { RecordCardCompactList };
