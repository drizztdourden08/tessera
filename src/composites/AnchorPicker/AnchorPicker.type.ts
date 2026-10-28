/* @layer renderer-components @kind types */
import type { ControlSize } from '../../primitives/field-control/field-control.type';

type Anchor = 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';

type AnchorPickerVariant = 'dots' | 'arrows';

type AnchorValue = Anchor | 'custom';

type AnchorPickerSize = ControlSize | 'xs';

type AnchorArrow = 'up' | 'up-right' | 'right' | 'down-right' | 'down' | 'down-left' | 'left' | 'up-left';

interface AnchorPickerProps {
  value: AnchorValue;
  onChange: (anchor: Anchor) => void;
  variant?: AnchorPickerVariant;
  size?: AnchorPickerSize;
  label?: string;
  customLabel?: string;
  disabled?: boolean;
  className?: string;
}

interface AnchorCell {
  row: number;
  col: number;
}

interface AnchorCellProps {
  anchor: Anchor;
  value: AnchorValue;
  variant: AnchorPickerVariant;
  size: AnchorPickerSize;
  disabled: boolean;
  onPick: (anchor: Anchor) => void;
}

export type { Anchor, AnchorArrow, AnchorCell, AnchorCellProps, AnchorPickerProps, AnchorPickerSize, AnchorPickerVariant, AnchorValue };
