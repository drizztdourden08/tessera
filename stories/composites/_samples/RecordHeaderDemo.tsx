/* @layer stories @kind component */
import { useState } from 'react';
import { BrandMark } from '../../../src/brand';
import { RecordHeader } from '../../../src/composites';
import { Badge } from '../../../src/primitives/Badge';
import { Box } from '../../../src/primitives/Box';
import { TypeMark } from '../../../src/primitives/TypeMark';
import { RecordCardMenu } from './RecordCardMenu';
import type { RecordHeaderDemoProps } from './RecordHeaderDemo.type';
import { RECORD_ROWS } from './RecordCardSamples.constants';

const RecordHeaderDemo = ({ density = 'card', chevron = true, brand = false }: RecordHeaderDemoProps) => {
  const [expanded, setExpanded] = useState(false);
  const [row] = RECORD_ROWS;
  const icon = brand ? <BrandMark app="archipelia" size="sm" /> : <TypeMark icon="bug" label="Bug" tone="danger" />;
  return (
    <Box className="record-header-story__one">
      <RecordHeader
        title={row.title}
        icon={icon}
        code={row.code}
        content={<Badge variant="inline" value="Open" color="info" />}
        menu={<RecordCardMenu />}
        density={density}
        chevron={chevron ? { expanded, onToggle: () => setExpanded(!expanded) } : undefined}
      />
    </Box>
  );
};

export { RecordHeaderDemo };
