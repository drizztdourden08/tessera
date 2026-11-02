/* @layer stories @kind component */
import { DataTable } from '../../../src/composites';
import { MEMORY_VIEW_STORAGE } from '../../../src/data';
import { Box, Text } from '../../../src/primitives';
import { PLAYERS, PLAYER_SCHEMA } from './data-players';
import type { PlayerRow } from './data-players';
import type { DataTablePlayerNoteProps } from './DataTablePlayerNote.type';

const playerId = (player: PlayerRow): string => player.id;

const DataTablePlayerNote = ({ note, footer, headerRules }: DataTablePlayerNoteProps) => (
  <Box className="data-table-story">
    <Text className="story-label">{note}</Text>
    <DataTable
      rows={PLAYERS}
      schema={PLAYER_SCHEMA}
      getRowId={playerId}
      viewStorage={MEMORY_VIEW_STORAGE}
      footer={footer}
      headerRules={headerRules}
    />
  </Box>
);

export { DataTablePlayerNote };
