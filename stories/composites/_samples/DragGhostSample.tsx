/* @layer stories @kind component */
import { DragGhost } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';

interface DragGhostSampleProps {
  count: number;
  thumbnails: number;
}

const DragGhostSample = (props: DragGhostSampleProps) => {
  const { count, thumbnails } = props;
  const nodes = Array.from({ length: thumbnails }, (_, at) => (
    <Box key={at} className="drag-ghost-story__thumb">
      <Text>{at + 1}</Text>
    </Box>
  ));
  return (
    <Box className="drag-ghost-story">
      <DragGhost count={count} thumbnails={nodes} />
    </Box>
  );
};

export { DragGhostSample };
