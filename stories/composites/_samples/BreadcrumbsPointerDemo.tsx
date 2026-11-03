/* @layer stories @kind component */
import { useState } from 'react';
import { Breadcrumbs } from '../../../src/composites';
import type { BreadcrumbsProps } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';
import { TRAIL } from './breadcrumbs-story.constants';

const START_NOTE = 'Press the button to hold a pointer drag over the art segment.';

const BreadcrumbsPointerDemo = ({ springOpen }: Pick<BreadcrumbsProps, 'springOpen'>) => {
  const [overId, setOverId] = useState<string | null>(null);
  const [note, setNote] = useState(START_NOTE);

  return (
    <Box className="story-column breadcrumbs-demo">
      <Button size="sm" variant="secondary" onClick={() => setOverId(overId === null ? 'art' : null)}>
        {overId === null ? 'Hold a drag over art' : 'Release the drag'}
      </Button>
      <Breadcrumbs
        segments={TRAIL}
        onNavigate={(id) => setNote(`Opened ${id}`)}
        dropOverId={overId}
        springOpen={springOpen}
        onSpringOpen={(id) => setNote(`Spring open on ${id}`)}
        onSegmentRef={(id, element) => element?.setAttribute('data-bound', id)}
      />
      <Text className="story-label">{note}</Text>
    </Box>
  );
};

export { BreadcrumbsPointerDemo };
