/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { RowGrid } from '../../../src/composites';
import { playerColumns } from './player-columns';
import { PLAYERS } from './row-grid-players.constants';
import type { Player, PlayersGridProps } from './row-grid-players.type';
import { usePlayers } from './usePlayers';

const PlayersGrid = ({ initial = PLAYERS, density, numbered = true, className, onEdit, selectable = false }: PlayersGridProps) => {
  const { players, update, add, remove, move, duplicate } = usePlayers(initial, onEdit);
  const [selected, setSelected] = useState(selectable ? initial[1]?.id : undefined);
  const pick = useMemo(() => (selectable ? { selected, toggle: (id: string) => setSelected((now) => (now === id ? undefined : id)) } : undefined), [selectable, selected]);
  const columns = useMemo(() => playerColumns(players, update, pick), [players, update, pick]);
  return (
    <RowGrid<Player>
      label="Players"
      rows={players}
      columns={columns}
      rowKey={(player) => player.id}
      rowLabel={(player, index) => player.name || `Player ${String(index + 1)}`}
      selectedKey={selected}
      numbered={numbered}
      density={density}
      onAdd={add}
      addLabel="Add player"
      onRemove={remove}
      onMove={move}
      rowMenu={(player) => [{ id: 'duplicate', label: 'Duplicate', icon: 'copy', onSelect: () => duplicate(player) }]}
      summary={players.length === 1 ? '1 player' : `${String(players.length)} players`}
      empty="No players yet. Add one to start the session."
      className={className}
    />
  );
};

export { PlayersGrid };
