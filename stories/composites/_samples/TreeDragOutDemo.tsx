/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Text } from '../../../src/primitives';
import { TreeDemo } from './TreeDemo';
import type { DragEvent } from 'react';

const TYPE = 'text/plain';

const TreeDragOutDemo = () => {
  const [dropped, setDropped] = useState<readonly string[]>([]);
  const [over, setOver] = useState(false);
  const take = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setOver(false);
    setDropped(event.dataTransfer.getData(TYPE).split('\n'));
  };
  const allow = (event: DragEvent<HTMLElement>) => {
    if (!event.dataTransfer.types.includes(TYPE)) return;
    event.preventDefault();
    setOver(true);
  };

  return (
    <Box className="story-column tree-story">
      <TreeDemo
        reorder
        guides
        onDragOut={(keys, event) => event.dataTransfer.setData(TYPE, keys.join('\n'))}
      />
      <Box className="tree-story__drop" data-over={over || undefined} onDragOver={allow} onDragLeave={() => setOver(false)} onDrop={take}>
        <Text>{dropped.length === 0 ? 'Drop rows here' : `Received ${dropped.join(', ')}`}</Text>
      </Box>
    </Box>
  );
};

export { TreeDragOutDemo };
