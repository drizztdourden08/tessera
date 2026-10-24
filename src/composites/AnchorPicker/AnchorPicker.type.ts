/* @layer renderer-components @kind types */
import type { ControlSize } from '../../primitives/field-control/field-control.type';

type Anchor = 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';

type AnchorPickerVariant = 'dots' | 'arrows';

type AnchorArrow = 'up' | 'up-right' | 'right' | 'down-right' | 'down' | 'down-left' | 'left' | 'up-left';

interface AnchorPickerProps {
  value: Anchor;
  onChange: (anchor: Anchor) => void;
  variant?: AnchorPickerVariant;
  size?: ControlSize;
  label?: string;
  disabled?: boolean;
  className?: string;
}

interface AnchorCell {
  row: number;
  col: number;
}

interface AnchorCellProps {
  anchor: Anchor;
  value: Anchor;
  variant: AnchorPickerVariant;
  disabled: boolean;
  onPick: (anchor: Anchor) => void;
}

export type { Anchor, AnchorArrow, AnchorCell, AnchorCellProps, AnchorPickerProps, AnchorPickerVariant };
