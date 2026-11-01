/* @layer stories @kind component */
import { useState } from 'react';
import { Tree } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { PROJECT_FILES } from './tree-entries';
import type { TreeEntry } from './tree-entries';

const keyOf = (entry: TreeEntry) => entry.id;
const childrenOf = (entry: TreeEntry) => entry.children;
const labelOf = (entry: TreeEntry) => entry.name;
const OPEN: readonly string[] = ['src', 'components'];

const thumbOf = (entry: TreeEntry) => <Box className="tree-story__thumb">{entry.name.slice(0, 1).toUpperCase()}</Box>;

const TreeRoomyDemo = () => {
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  return (
    <Box className="story-column tree-story">
      <Tree
        label="Layers"
        items={PROJECT_FILES}
        getKey={keyOf}
        getChildren={childrenOf}
        getLabel={labelOf}
        renderLead={thumbOf}
        defaultExpandedKeys={OPEN}
        selection={{ selected: picked, onChange: setPicked }}
        rowSize="roomy"
        guides
      />
      <Text className="story-label">Rows of 48 px hold a 40 px thumbnail; the thumbnail, label and trail stay centred.</Text>
    </Box>
  );
};

export { TreeRoomyDemo };
