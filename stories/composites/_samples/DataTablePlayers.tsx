/* @layer stories @kind component */
import { useState } from 'react';
import { DataTable } from '../../../src/composites';
import { MEMORY_VIEW_STORAGE } from '../../../src/data';
import { Text } from '../../../src/primitives';
import { LinkSandbox } from '../../primitives/_samples/LinkSandbox';
import { resolveSlotDefault } from './data-hints';
import { PLAYERS, PLAYER_SCHEMA } from './data-players';
import type { PlayerRow } from './data-players';
import { slotHref } from './slot-href';
import type { DataTableArgs } from './DataTablePlayers.type';

const PLAYER_COUNT: readonly [string, string] = ['player', 'players'];

const playerId = (player: PlayerRow): string => player.id;

const DataTablePlayers = ({ selectable, groupBy, persistLayout, emptyMessage }: DataTableArgs) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(new Set());
  const fallbackGroupBy = groupBy === 'none' ? undefined : [groupBy];
  const picked = selectable ? `${selectedIds.size} selected` : `Selected: ${selectedId ?? 'none'}`;

  return (
    <LinkSandbox className="data-table-story">
      <Text className="story-label">{picked}</Text>
      <DataTable
        key={`${groupBy}-${String(persistLayout)}`}
        rows={PLAYERS}
        schema={PLAYER_SCHEMA}
        getRowId={playerId}
        viewKey={persistLayout ? `stories:players-${groupBy}` : undefined}
        viewStorage={MEMORY_VIEW_STORAGE}
        fallbackGroupBy={fallbackGroupBy}
        selectedId={selectedId}
        onSelect={setSelectedId}
        selectedIds={selectable ? selectedIds : undefined}
        onSelectionChange={setSelectedIds}
        selectable={selectable}
        countLabel={PLAYER_COUNT}
        emptyMessage={emptyMessage}
        resolveIdRefDefault={resolveSlotDefault}
        resolveIdRefHref={slotHref}
      />
    </LinkSandbox>
  );
};

export { DataTablePlayers };
