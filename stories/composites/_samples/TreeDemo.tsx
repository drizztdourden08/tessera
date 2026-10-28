/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { Tree } from '../../../src/composites';
import type { TreeHandle, TreeRowState } from '../../../src/composites';
import { Box, Icon, Span, Text } from '../../../src/primitives';
import { PROJECT_FILES } from './tree-entries';
import type { TreeEntry } from './tree-entries';
import { moveInTree } from './tree-moves';
import type { TreeDemoProps } from './tree-demo.type';

const keyOf = (entry: TreeEntry) => entry.id;
const childrenOf = (entry: TreeEntry) => entry.children;
const labelOf = (entry: TreeEntry) => entry.name;
const leadOf = (entry: TreeEntry, state: TreeRowState) => <Icon name={entry.folder ? (state.expanded ? 'folder-open' : 'folder') : 'file'} />;
const trailOf = (entry: TreeEntry) => (entry.children ? <Span tone="muted">{entry.children.length}</Span> : undefined);

const TreeDemo = (props: TreeDemoProps) => {
  const { mode = 'multiple', reorder = false, guides = false, query = '', rowSize, openOnPick = false, maxDepth, start = PROJECT_FILES, open = ['src', 'components'] } = props;
  const [items, setItems] = useState<readonly TreeEntry[]>(start);
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  const [note, setNote] = useState('Nothing moved yet');
  const handle = useRef<TreeHandle>(null);
  const needle = query.trim().toLowerCase();

  return (
    <Box className="story-column tree-story">
      <Tree
        ref={handle}
        label="Project files"
        items={items}
        getKey={keyOf}
        getChildren={childrenOf}
        getLabel={labelOf}
        renderLead={leadOf}
        renderTrail={trailOf}
        defaultExpandedKeys={open}
        selection={{ selected: picked, onChange: setPicked, mode }}
        openOnPick={openOnPick}
        guides={guides}
        rowSize={rowSize}
        filter={needle === '' ? undefined : (entry) => entry.name.toLowerCase().includes(needle)}
        onActivate={(entry) => setNote(`Opened ${entry.name}`)}
        reorder={reorder ? {
          maxDepth,
          onMove: (move) => {
            setItems((now) => moveInTree(now, move));
            setNote(`Moved ${move.keys.length} into ${move.parentKey ?? 'the top'} at ${move.index + 1}`);
          },
          renderThumbnail: () => <Icon name="file" />,
        } : undefined}
      />
      <Text className="story-label">{note}</Text>
    </Box>
  );
};

export { TreeDemo };
