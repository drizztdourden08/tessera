/* @layer stories @kind component */
import { useMemo } from 'react';
import { RowGrid } from '../RowGrid';
import { playerColumns } from './player-columns';
import { PLAYERS } from './players.constants';
import type { Player, PlayersGridProps } from './players.type';
import { usePlayers } from './usePlayers';

const PlayersGrid = ({ initial = PLAYERS, density, numbered = true, className }: PlayersGridProps) => {
  const { players, update, add, remove, move, duplicate } = usePlayers(initial);
  const columns = useMemo(() => playerColumns(players, update), [players, update]);
  return (
    <RowGrid<Player>
      label="Players"
      rows={players}
      columns={columns}
      rowKey={(player) => player.id}
      rowLabel={(player, index) => player.name || `Player ${String(index + 1)}`}
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
