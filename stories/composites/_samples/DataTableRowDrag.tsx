/* @layer stories @kind component */
import { useCallback, useState } from 'react';
import type { DragEvent } from 'react';
import { DataTable } from '../../../src/composites';
import type { RowMoveTarget } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { LinkSandbox } from '../../primitives/_samples/LinkSandbox';
import { PEERS, PEER_SCHEMA } from './data-peers';
import type { PeerRow } from './data-peers';
import { PEER_COUNT, PEER_GROUP_BY, PEER_VIRTUAL_FROM, peerId } from './peer-table.constants';
import './DataTableRowDrag.css';

const FOLDER_TYPE = 'text/x-peer-id';

const dragData = (peer: PeerRow): Record<string, string> => ({ [FOLDER_TYPE]: peer.id });
const accept = (event: DragEvent<HTMLElement>) => event.preventDefault();

const DataTableRowDrag = () => {
  const [rows, setRows] = useState<readonly PeerRow[]>(PEERS.slice(0, 300));
  const [filed, setFiled] = useState<readonly string[]>([]);

  const move = useCallback((fromKey: string, target: RowMoveTarget) => {
    setRows((before) => {
      const picked = before.find((peer) => peer.id === fromKey);
      if (picked === undefined) return before;
      const moved = { ...picked, state: target.groupKey ?? picked.state };
      const next = before.filter((peer) => peer.id !== fromKey);
      const below = next.findIndex((peer) => peer.id === target.beforeKey);
      const above = next.findIndex((peer) => peer.id === target.afterKey);
      next.splice(below >= 0 ? below : above + 1 || next.length, 0, moved);
      return next;
    });
  }, []);

  const file = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData(FOLDER_TYPE);
    if (id) setFiled((before) => (before.includes(id) ? before : [...before, id]));
  };

  return (
    <LinkSandbox className="data-table-story">
      <Text className="story-label">
        Drag the grip, or press Up or Down on it, to reorder; a row dropped in the other group takes that group. Drag a row onto the folder to file it.
      </Text>
      <Box className="data-table-row-drag">
        <DataTable
          rows={rows}
          schema={PEER_SCHEMA}
          getRowId={peerId}
          fallbackGroupBy={PEER_GROUP_BY}
          virtualizeFrom={PEER_VIRTUAL_FROM}
          onRowMove={move}
          rowDragData={dragData}
          countLabel={PEER_COUNT}
        />
        <Box className="data-table-row-drag__folder" onDragOver={accept} onDrop={file}>
          <Text>{`Folder: ${filed.length} filed`}</Text>
          <Text>{filed.slice(-3).join(', ')}</Text>
        </Box>
      </Box>
    </LinkSandbox>
  );
};

export { DataTableRowDrag };
