/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ControlSize } from '../../primitives/field-control/field-control.type';
import type { SWATCH_GRID_STRINGS } from '../../primitives/strings/swatch-grid-strings.constants';
import type { ReorderDrag } from '../reorder/reorder.type';

interface SwatchColor {
  id: string;
  value: string | null;
  label?: string;
}

interface SwatchRange {
  from: number;
  to: number;
}

interface SwatchGridProps {
  label: string;
  colors: readonly SwatchColor[];
  size?: ControlSize;
  columns?: number;
  showIndex?: boolean;
  selectedId?: string;
  secondaryId?: string;
  range?: SwatchRange;
  onSelect?: (id: string) => void;
  onSecondarySelect?: (id: string) => void;
  onRangeChange?: (from: number, to: number) => void;
  onMove?: (from: number, to: number) => void;
  empty?: ReactNode;
  className?: string;
}

type SwatchStrings = typeof SWATCH_GRID_STRINGS;

type SwatchPickKind = 'select' | 'range' | 'secondary';

interface SwatchModifiers {
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

interface SwatchPickInput {
  colors: readonly SwatchColor[];
  selectedIndex: number;
  onSelect?: (id: string) => void;
  onSecondarySelect?: (id: string) => void;
  onRangeChange?: (from: number, to: number) => void;
}

interface SwatchKeysInput {
  count: number;
  columns?: number;
  selectedIndex: number;
  move?: (from: number, to: number) => void;
  onRangeChange?: (from: number, to: number) => void;
}

interface SwatchFocus {
  message: string;
  announce: (message: string) => void;
  expect: (id: string) => void;
}

interface SwatchCellProps {
  color: SwatchColor;
  index: number;
  total: number;
  name: string;
  size: ControlSize;
  showIndex: boolean;
  selected: boolean;
  secondary: boolean;
  inRange: boolean;
  tabbable: boolean;
  drag?: ReorderDrag;
  onPick: (index: number, held: SwatchModifiers) => void;
}

export type {
  SwatchCellProps, SwatchColor, SwatchFocus, SwatchGridProps, SwatchKeysInput, SwatchModifiers, SwatchPickInput, SwatchPickKind,
  SwatchRange, SwatchStrings,
};
