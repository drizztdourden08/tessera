/* @layer stories @kind component */
import { useState } from 'react';
import { RecordCard } from '../../../src/composites';
import { Badge } from '../../../src/primitives/Badge';
import { Box } from '../../../src/primitives/Box';
import { Button } from '../../../src/primitives/Button';
import { Text } from '../../../src/primitives/Text';
import { RecordCardDemoIcon } from './RecordCardDemoIcon';
import { RecordCardMenu } from './RecordCardMenu';
import type { RecordCardDemoProps } from './RecordCardDemo.type';
import { RECORD_ROWS } from './RecordCardSamples.constants';

const RecordCardDemo = ({ density = 'card', open, defaultOpen = false, brand = false, chevronOnIcon = false, controlled = false, menuOnHover = false, tint }: RecordCardDemoProps) => {
  const [own, setOwn] = useState(defaultOpen);
  const [row] = RECORD_ROWS;
  const state = controlled ? { open: own, onOpenChange: setOwn } : { open, defaultOpen };
  return (
    <Box className="record-card-story__one">
      <RecordCard title={row.title} icon={<RecordCardDemoIcon brand={brand} />} code={row.code} content={<Badge variant="inline" value="Open" color="info" />} menu={<RecordCardMenu />} density={density} chevronOnIcon={chevronOnIcon} tint={tint} menuOnHover={menuOnHover} {...state}>
        <Text>{row.note}</Text>
      </RecordCard>
      {controlled && <Button variant="tertiary" size="sm" onClick={() => setOwn(!own)}>{own ? 'Fold it' : 'Open it'}</Button>}
    </Box>
  );
};

export { RecordCardDemo };
