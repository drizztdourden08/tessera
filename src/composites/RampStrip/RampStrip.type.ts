/* @layer renderer-components @kind types */
import type { DragEvent, KeyboardEvent, MouseEvent, ReactNode, RefObject } from 'react';
import type { ColorSwatchProps } from '../../primitives/ColorSwatch';
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';
import type { MenuNode } from '../DropdownMenu';

type RampSize = 'sm' | 'md' | 'preview';

type RampContextEvent = MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>;

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
  onStepClick?: (index: number, event: MouseEvent<HTMLElement>) => void;
  onStepDoubleClick?: (index: number, event: MouseEvent<HTMLElement>) => void;
  onStepContextMenu?: (index: number, event: RampContextEvent) => void;
  stepData?: (index: number) => DataAttributes;
  selectionKeys?: boolean;
  wrap?: boolean;
  size?: RampSize;
  numbered?: boolean;
  className?: string;
}

interface RampStripInput {
  steps: readonly RampStep[];
  value: number | null;
  selectionKeys: boolean;
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
  data: DataAttributes | undefined;
  onPress: (event: MouseEvent<HTMLElement>) => void;
  onDoubleClick: ((event: MouseEvent<HTMLElement>) => void) | undefined;
  onContextMenu: ((event: RampContextEvent) => void) | undefined;
  onDragStart: ((event: DragEvent<HTMLElement>) => void) | undefined;
}

interface RampStepContextProps {
  onContextMenu?: (event: RampContextEvent) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
}

interface RampStripControl {
  rootRef: RefObject<HTMLElement | null>;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  tabStop: number | null;
  onFocusStep: (index: number) => void;
}

export type { RampContextEvent, RampSelection, RampSelectionInput, RampSize, RampStep, RampStepContextProps, RampStripControl, RampStripInput, RampStripProps, RampStripStepProps };
