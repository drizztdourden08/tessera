/* @layer stories @kind component */
import { useCallback, useState } from 'react';
import { LinkSandbox } from '../../primitives/_samples/LinkSandbox';
import { Box, Text } from '../../../src/primitives';
import { DataTable } from '../../../src/composites';
import { fakeDragSource } from './fake-drag-source';
import type { FakeDragGrab } from './fake-drag-source.type';
import { PEER_COUNT, PEER_GROUP_BY, PEER_VIRTUAL_FROM, peerId } from './peer-table.constants';
import { PEERS, PEER_SCHEMA } from './data-peers';
import type { PeerRow } from './data-peers';
import './DataTableRowDrag.css';

const PEER_DRAG_TYPE = 'peer';

const DataTableRowRef = () => {
  const [grab, setGrab] = useState<FakeDragGrab | null>(null);
  const [attached, setAttached] = useState(0);

  const rowRef = useCallback((_peer: PeerRow, key: string) => (element: HTMLElement | null) => {
    if (!element) return undefined;
    const detach = fakeDragSource(element, PEER_DRAG_TYPE, key, setGrab);
    setAttached((count) => count + 1);
    return () => {
      detach();
      setAttached((count) => count - 1);
    };
  }, []);

  return (
    <LinkSandbox className="data-table-story">
      <Text className="story-label">
        Each drawn row is a typed drag source through rowRef. Press a row to see what a drag system would carry; scroll to see rows attach and release.
      </Text>
      <Box className="data-table-row-drag">
        <DataTable
          rows={PEERS}
          schema={PEER_SCHEMA}
          getRowId={peerId}
          fallbackGroupBy={PEER_GROUP_BY}
          virtualizeFrom={PEER_VIRTUAL_FROM}
          rowRef={rowRef}
          countLabel={PEER_COUNT}
        />
        <Box className="data-table-row-drag__folder">
          <Text>{`Rows attached: ${attached}`}</Text>
          <Text>{grab ? `Grabbed ${grab.type}: ${grab.payload}` : 'Nothing grabbed yet'}</Text>
        </Box>
      </Box>
    </LinkSandbox>
  );
};

export { DataTableRowRef };
