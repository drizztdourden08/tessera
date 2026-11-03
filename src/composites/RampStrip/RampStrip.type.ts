/* @layer renderer-components @kind types */
import type { DragEvent, KeyboardEvent, MouseEvent, ReactNode, RefObject } from 'react';
import type { ColorSwatchProps } from '../../primitives/ColorSwatch';
import type { MenuNode } from '../DropdownMenu';

type RampSize = 'sm' | 'md' | 'preview';

interface RampStep {
  color: string;
  caption?: ReactNode;
  label?: string;
  unused?: boolean;
  disabled?: boolean;
  marks?: ColorSwatchProps['marks'];
}

interface RampStripProps {
  steps: readonly RampStep[];
  value: number | null;
  onChange: (index: number) => void;
  'aria-label': string;
  selected?: ReadonlySet<number>;
  onSelectionChange?: (selected: ReadonlySet<number>) => void;
  onSwatchDragStart?: (index: number, event: DragEvent<HTMLElement>) => void;
  swatchMenu?: (index: number) => readonly MenuNode[];
  size?: RampSize;
  numbered?: boolean;
  className?: string;
}

interface RampStripInput {
  steps: readonly RampStep[];
  value: number | null;
  onChange: (index: number) => void;
  onSelectionChange?: (selected: ReadonlySet<number>) => void;
}

interface RampSelectionInput {
  steps: readonly RampStep[];
  value: number | null;
  selected?: ReadonlySet<number>;
  onChange: (index: number) => void;
  onSelectionChange?: (selected: ReadonlySet<number>) => void;
}

interface RampSelection {
  picked: (index: number) => boolean;
  press: (index: number, event: MouseEvent<HTMLElement>) => void;
}

interface RampStripStepProps {
  step: RampStep;
  index: number;
  picked: boolean;
  multi: boolean;
  size: RampSize;
  numbered: boolean;
  strip: RampStripControl;
  menu: readonly MenuNode[] | undefined;
  onPress: (event: MouseEvent<HTMLElement>) => void;
  onDragStart: ((event: DragEvent<HTMLElement>) => void) | undefined;
}

interface RampStripControl {
  rootRef: RefObject<HTMLElement | null>;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  tabStop: number | null;
  onFocusStep: (index: number) => void;
}

export type { RampSelection, RampSelectionInput, RampSize, RampStep, RampStripControl, RampStripInput, RampStripProps, RampStripStepProps };
