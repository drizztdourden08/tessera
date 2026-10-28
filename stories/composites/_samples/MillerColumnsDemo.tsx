/* @layer stories @kind component */
import { useState } from 'react';
import { MillerColumns, VirtualList } from '../../../src/composites';
import { Box, Icon, Text } from '../../../src/primitives';
import { PROJECT_FILES } from './tree-entries';
import type { TreeEntry } from './tree-entries';
import type { MillerColumnsDemoProps } from './miller-columns-demo.type';

const keyOf = (entry: TreeEntry) => entry.id;
const childrenOf = (entry: TreeEntry) => entry.children;
const labelOf = (entry: TreeEntry) => entry.name;
const drawn = (entry: TreeEntry) => (
  <>
    <Icon name={entry.folder ? 'folder' : 'file'} />
    {entry.name}
  </>
);

const flat = (list: readonly TreeEntry[]): TreeEntry[] => list.flatMap((entry) => [entry, ...flat(entry.children ?? [])]);

const MillerColumnsDemo = ({ shared = false, start = PROJECT_FILES }: MillerColumnsDemoProps) => {
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  const [opened, setOpened] = useState('Nothing opened');
  return (
    <Box className="story-column miller-columns-story">
      <MillerColumns
        label="Project files"
        items={start}
        getKey={keyOf}
        getChildren={childrenOf}
        getLabel={labelOf}
        renderItem={drawn}
        selection={{ selected: picked, onChange: setPicked }}
        onOpen={(entry) => setOpened(`Opened ${entry.name}`)}
      />
      {shared && (
        <VirtualList
          label="Every file"
          items={flat(start)}
          getKey={keyOf}
          renderItem={labelOf}
          rowSize="compact"
          selection={{ selected: picked, onChange: setPicked }}
        />
      )}
      <Text className="story-label">{picked.size === 0 ? opened : `${picked.size} picked`}</Text>
    </Box>
  );
};

export { MillerColumnsDemo };
