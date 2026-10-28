/* @layer stories @kind component */
import { useState } from 'react';
import type { DragEvent } from 'react';
import { Breadcrumbs } from '../../../src/composites';
import type { BreadcrumbSegment, BreadcrumbsProps } from '../../../src/composites';
import { Box, Tag, Text } from '../../../src/primitives';
import { TRAIL } from './breadcrumbs-story.constants';

type BreadcrumbsDemoProps = Partial<Pick<BreadcrumbsProps, 'maxVisible' | 'label'>> & {
  withSiblings?: boolean;
  withDrop?: boolean;
  editable?: boolean;
  withTags?: boolean;
};

const BreadcrumbsDemo = (props: BreadcrumbsDemoProps) => {
  const { withSiblings = true, withDrop = false, editable = false, withTags = false, ...rest } = props;
  const [depth, setDepth] = useState(TRAIL.length);
  const [note, setNote] = useState('Press a segment, or drag a file onto one.');
  const trail: readonly BreadcrumbSegment[] = TRAIL.slice(0, depth).map((segment) => (withSiblings ? segment : { ...segment, siblings: undefined }));

  return (
    <Box className="story-column breadcrumbs-demo">
      <Breadcrumbs
        {...rest}
        segments={trail}
        onNavigate={(id) => { setDepth(TRAIL.findIndex((segment) => segment.id === id) + 1); setNote(`Opened ${id}`); }}
        onDropOn={withDrop ? (id: string, event: DragEvent<HTMLElement>) => setNote(`Dropped ${event.dataTransfer.types.join(', ')} on ${id}`) : undefined}
        onPathSubmit={editable ? (path) => setNote(`Go to ${path}`) : undefined}
        trailing={withTags ? <Tag>Folder</Tag> : undefined}
      />
      <Text className="story-label">{note}</Text>
    </Box>
  );
};

export { BreadcrumbsDemo };
