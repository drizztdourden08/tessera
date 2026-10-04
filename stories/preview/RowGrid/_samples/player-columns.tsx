/* @layer stories @kind logic */
import { Select, TextInput } from '../../../../src/primitives';
import type { RowGridColumn } from '../RowGrid.type';
import { OverridesCell } from './OverridesCell';
import { GAMES, PLAYER_COLUMNS } from './players.constants';
import type { Player, PlayerUpdate } from './players.type';
import { PresetCell } from './PresetCell';

const nameError = (players: readonly Player[]) => (player: Player): string | undefined => {
  if (player.name.trim() === '') return 'Give the player a name.';
  return players.some((other) => other !== player && other.name.trim() === player.name.trim()) ? 'Two players share this name.' : undefined;
};

const playerColumns = (players: readonly Player[], update: PlayerUpdate): RowGridColumn<Player>[] => [
  {
    id: 'name',
    label: 'Name',
    ...PLAYER_COLUMNS.name,
    error: nameError(players),
    cell: (player) => <TextInput value={player.name} placeholder="Player name" onChange={(event) => update(player.id, { name: event.currentTarget.value })} />,
  },
  {
    id: 'game',
    label: 'Game',
    ...PLAYER_COLUMNS.game,
    error: (player) => (player.game === '' ? 'Pick a game.' : undefined),
    cell: (player) => <Select options={GAMES} value={player.game} placeholder="Pick a game" onChange={(game) => update(player.id, { game })} />,
  },
  {
    id: 'preset',
    label: 'Preset',
    ...PLAYER_COLUMNS.preset,
    cell: (player) => <PresetCell player={player} onChange={(patch) => update(player.id, patch)} />,
  },
  {
    id: 'overrides',
    label: 'Overrides',
    ...PLAYER_COLUMNS.overrides,
    fold: true,
    cell: (player) => <OverridesCell player={player} onChange={(patch) => update(player.id, patch)} />,
  },
];

export { playerColumns };
