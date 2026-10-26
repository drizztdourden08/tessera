/* @layer stories @kind component */
import { useCallback, useState } from 'react';
import type { DragEvent } from 'react';
import { DataTable } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { LinkSandbox } from '../../primitives/_samples/LinkSandbox';
import { PEERS, PEER_SCHEMA } from './data-peers';
import type { PeerRow } from './data-peers';
import { PEER_COUNT, PEER_VIRTUAL_FROM, peerId } from './peer-table.constants';
import './DataTableRowDrag.css';

const FOLDER_TYPE = 'text/x-peer-id';

const dragData = (peer: PeerRow): Record<string, string> => ({ [FOLDER_TYPE]: peer.id });
const accept = (event: DragEvent<HTMLElement>) => event.preventDefault();

const DataTableRowDrag = () => {
  const [rows, setRows] = useState<readonly PeerRow[]>(PEERS.slice(4, 304));
  const [filed, setFiled] = useState<readonly string[]>([]);

  const move = useCallback((fromKey: string, toIndex: number) => {
    setRows((before) => {
      const from = before.findIndex((peer) => peer.id === fromKey);
      const moved = before[from];
      if (moved === undefined) return before;
      const next = before.filter((peer) => peer.id !== fromKey);
      next.splice(toIndex, 0, moved);
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
        Drag the grip, or press Up or Down on it, to reorder. Drag a row onto the folder to file it. 300 rows, drawn as you scroll.
      </Text>
      <Box className="data-table-row-drag">
        <DataTable
          rows={rows}
          schema={PEER_SCHEMA}
          getRowId={peerId}
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
