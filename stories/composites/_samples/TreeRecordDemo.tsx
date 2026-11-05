/* @layer stories @kind component */
import { useState } from 'react';
import { RecordHeader, Tree } from '../../../src/composites';
import { Box, Text, TypeMark } from '../../../src/primitives';
import { RECORD_TREE } from './tree-records.constants';
import type { RecordNode } from './tree-records.constants';

const keyOf = (node: RecordNode) => node.id;
const childrenOf = (node: RecordNode) => node.children;
const labelOf = (node: RecordNode) => node.title;
const headerOf = (node: RecordNode) => (
  <RecordHeader
    density="row"
    icon={<TypeMark icon={node.icon} label={node.kind} color="violet" variant="outline" />}
    code={node.code}
    title={node.title}
  />
);

const TreeRecordDemo = () => {
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  return (
    <Box className="story-column tree-story">
      <Tree
        label="Work items"
        items={RECORD_TREE}
        getKey={keyOf}
        getChildren={childrenOf}
        getLabel={labelOf}
        renderLabel={headerOf}
        defaultExpandedKeys={['story']}
        selection={{ selected: picked, onChange: setPicked }}
        guides
      />
      <Text className="story-label">A RecordHeader in renderLabel sits on the centre line of the row, next to the twisty.</Text>
    </Box>
  );
};

export { TreeRecordDemo };
