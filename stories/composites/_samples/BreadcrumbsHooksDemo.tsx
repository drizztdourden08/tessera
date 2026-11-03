/* @layer stories @kind component */
import { useState } from 'react';
import { Breadcrumbs } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { hookProps, NOTES } from './breadcrumbs-hooks';
import type { CrumbHook } from './breadcrumbs-hooks';
import { TRAIL } from './breadcrumbs-story.constants';

const BreadcrumbsHooksDemo = ({ feature }: { feature: CrumbHook }) => {
  const [note, setNote] = useState(NOTES[feature]);

  return (
    <Box className="story-column breadcrumbs-demo">
      <Text draggable className="story-label" onDragStart={(event) => event.dataTransfer.setData('text/plain', 'item')}>Drag this text</Text>
      <Breadcrumbs segments={TRAIL} onNavigate={(id) => setNote(`Opened ${id}`)} {...hookProps(feature, setNote)} />
      <Text className="story-label">{note}</Text>
    </Box>
  );
};

export { BreadcrumbsHooksDemo };
