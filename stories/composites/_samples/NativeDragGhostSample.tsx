/* @layer stories @kind component */
import { useState } from 'react';
import { useNativeDragGhost } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import type { DragEvent } from 'react';
import '../DragGhost.stories.css';

interface NativeDragGhostSampleProps {
  count: number;
}

const NativeDragGhostSample = (props: NativeDragGhostSampleProps) => {
  const { count } = props;
  const ghost = useNativeDragGhost();
  const [dropped, setDropped] = useState('nothing yet');
  const thumbnails = Array.from({ length: count }, (_, at) => (
    <Box key={at} className="drag-ghost-story__thumb"><Text>{at + 1}</Text></Box>
  ));
  const start = (event: DragEvent<HTMLElement>) => {
    event.dataTransfer.setData('text/plain', `${count} items`);
    ghost.onDragStart(event, { count, thumbnails });
  };
  const drop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDropped(event.dataTransfer.getData('text/plain'));
  };
  return (
    <Box className="drag-ghost-story drag-ghost-story--native">
      <Box className="drag-ghost-story__source" draggable onDragStart={start}><Text>{`Drag ${count} items`}</Text></Box>
      <Box className="drag-ghost-story__target" onDragOver={(event) => event.preventDefault()} onDrop={drop}>
        <Text>{`Dropped: ${dropped}`}</Text>
      </Box>
    </Box>
  );
};

export { NativeDragGhostSample };
