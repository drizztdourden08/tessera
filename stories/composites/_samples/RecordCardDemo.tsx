/* @layer stories @kind component */
import { useState } from 'react';
import { BrandMark } from '../../../src/brand';
import { RecordCard } from '../../../src/composites';
import { Badge } from '../../../src/primitives/Badge';
import { Box } from '../../../src/primitives/Box';
import { Button } from '../../../src/primitives/Button';
import { Text } from '../../../src/primitives/Text';
import { TypeMark } from '../../../src/primitives/TypeMark';
import { RecordCardMenu } from './RecordCardMenu';
import type { RecordCardDemoProps } from './RecordCardDemo.type';
import { RECORD_ROWS } from './RecordCardSamples.constants';

const RecordCardDemo = ({ density = 'card', open, defaultOpen = false, brand = false, controlled = false }: RecordCardDemoProps) => {
  const [own, setOwn] = useState(defaultOpen);
  const [row] = RECORD_ROWS;
  const icon = brand ? <BrandMark app="archipelia" size="sm" /> : <TypeMark icon="bug" label="Bug" tone="danger" />;
  const state = controlled ? { open: own, onOpenChange: setOwn } : { open, defaultOpen };
  return (
    <Box className="record-card-story__one">
      <RecordCard title={row.title} icon={icon} code={row.code} content={<Badge variant="inline" value="Open" color="info" />} menu={<RecordCardMenu />} density={density} {...state}>
        <Text>{row.note}</Text>
      </RecordCard>
      {controlled && <Button variant="tertiary" size="sm" onClick={() => setOwn(!own)}>{own ? 'Fold it' : 'Open it'}</Button>}
    </Box>
  );
};

export { RecordCardDemo };
