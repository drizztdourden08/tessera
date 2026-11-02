/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { FloatingPlacement } from '../../primitives/Floating';
import type { IconProps } from '../../primitives/Icon';
import type { ShortcutKeys } from '../../primitives/Shortcut';

interface PalettePoint {
  x: number;
  y: number;
}

interface PaletteRoom {
  width: number;
  height: number;
}

interface PaletteItem {
  id: string;
  icon: IconProps;
  label: string;
  shortcut?: ShortcutKeys;
  disabled?: boolean;
}

interface PaletteSection {
  id: string;
  label?: string;
  items: readonly PaletteItem[];
}

interface PointerPaletteProps {
  open: boolean;
  at: PalettePoint;
  sections: readonly PaletteSection[];
  value?: string | null;
  columns?: number;
  holding?: boolean;
  onPick: (id: string) => void;
  onClose: () => void;
  'aria-label': string;
  className?: string;
}

interface PaletteSurfaceProps extends Omit<PointerPaletteProps, 'open' | 'aria-label'> {
  label: string;
  origin: RefObject<HTMLElement | null>;
}

interface PaletteCellProps {
  item: PaletteItem;
  props: object;
}

type PaletteAnchor = FloatingPlacement;

export type { PaletteAnchor, PaletteCellProps, PaletteItem, PalettePoint, PaletteRoom, PaletteSection, PaletteSurfaceProps, PointerPaletteProps };
