/* @layer stories @kind types */
import type { RowGridDensity } from '../../../src/composites';

interface Player {
  id: string;
  name: string;
  game: string;
  preset: string;
  overrides: number;
  file?: string;
}

interface PlayersGridProps {
  initial?: readonly Player[];
  density?: RowGridDensity;
  numbered?: boolean;
  className?: string;
  onEdit?: () => void;
  selectable?: boolean;
}

interface PlayerCellProps {
  player: Player;
  onChange: (patch: Partial<Player>) => void;
  pick?: PlayerPick;
}

interface PlayerPick {
  selected?: string;
  toggle: (id: string) => void;
}

type PlayerUpdate = (id: string, patch: Partial<Player>) => void;

export type { Player, PlayerCellProps, PlayerPick, PlayersGridProps, PlayerUpdate };
