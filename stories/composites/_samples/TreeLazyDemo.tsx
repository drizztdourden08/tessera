/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { Tree } from '../../../src/composites';
import { Box, Icon, Text } from '../../../src/primitives';
import { LAZY_FOLDERS } from './tree-entries';
import type { TreeEntry } from './tree-entries';

const LOAD_DELAY = 800;

const loaded = (entry: TreeEntry): TreeEntry => ({ ...entry, children: [0, 1, 2].map((at) => ({ id: `${entry.id}-${at}`, name: `Loaded file ${at + 1}`, folder: false })) });

const withChildren = (list: readonly TreeEntry[], id: string): TreeEntry[] => list.map((entry) => (entry.id === id ? loaded(entry) : entry));

const TreeLazyDemo = () => {
  const [items, setItems] = useState<readonly TreeEntry[]>(LAZY_FOLDERS);
  const [loading, setLoading] = useState<ReadonlySet<string>>(new Set());
  const asked = useRef(0);

  const load = (entry: TreeEntry) => {
    asked.current += 1;
    setLoading((now) => new Set([...now, entry.id]));
    setTimeout(() => {
      setItems((now) => withChildren(now, entry.id));
      setLoading((now) => new Set([...now].filter((id) => id !== entry.id)));
    }, LOAD_DELAY);
  };

  return (
    <Box className="story-column tree-story">
      <Tree
        label="Lazy folders"
        items={items}
        getKey={(entry) => entry.id}
        getChildren={(entry) => entry.children}
        isBranch={(entry) => entry.folder}
        getLabel={(entry) => entry.name}
        renderLead={(entry) => <Icon name={entry.folder ? 'folder' : 'file'} />}
        loadingKeys={loading}
        onLoadChildren={load}
      />
      <Text className="story-label">{`Asked to load ${asked.current} time${asked.current === 1 ? '' : 's'}`}</Text>
    </Box>
  );
};

export { TreeLazyDemo };
