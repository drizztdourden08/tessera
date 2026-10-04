/* @layer stories @kind types */
import type { RowGridDensity } from '../RowGrid.type';

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
}

interface PlayerCellProps {
  player: Player;
  onChange: (patch: Partial<Player>) => void;
}

type PlayerUpdate = (id: string, patch: Partial<Player>) => void;

export type { Player, PlayerCellProps, PlayersGridProps, PlayerUpdate };
