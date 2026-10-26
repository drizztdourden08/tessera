/* @layer stories @kind component */
import { useState } from 'react';
import { DataTable } from '../../../src/composites';
import { Box, Icon, IconButton, Tag, Text, Tooltip } from '../../../src/primitives';
import { PLAYER_SCHEMA, PLAYERS } from './data-players';
import type { PlayerRow } from './data-players';

const DataTableCellControls = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [log, setLog] = useState('Click a plain cell to select its row; use a control inside a cell and the selection stays.');

  const renderCell = (player: PlayerRow, path: string) => {
    if (path === 'game') {
      return (
        <Box className="data-table-cell-tags">
          <Text>{player.game}</Text>
          {player.tags.map((tag) => (
            <Tag key={tag} selected={false} onSelect={() => setLog(`Tag ${tag} of ${player.name}`)}>{tag}</Tag>
          ))}
        </Box>
      );
    }
    if (path === 'name') {
      return (
        <Tooltip content={`${player.name} plays ${player.game}`} focusable>
          <Text>{player.name}</Text>
        </Tooltip>
      );
    }
    if (path === 'status') {
      return (
        <IconButton variant="ghost" size="xs" label={`Details of ${player.name}`} onClick={() => setLog(`Details of ${player.name}`)}>
          <Icon name="info" size={14} />
        </IconButton>
      );
    }
    return undefined;
  };

  return (
    <Box className="data-table-story">
      <Text className="story-label">{`Selected: ${selectedId ?? 'none'}. ${log}`}</Text>
      <DataTable
        rows={PLAYERS}
        schema={PLAYER_SCHEMA}
        getRowId={(player) => player.id}
        selectedId={selectedId ?? undefined}
        onSelect={setSelectedId}
        renderCell={renderCell}
        countLabel={['player', 'players']}
      />
    </Box>
  );
};

export { DataTableCellControls };
