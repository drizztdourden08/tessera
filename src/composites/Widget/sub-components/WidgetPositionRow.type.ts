/* @layer renderer-components @kind types */
import type { WidgetState } from '../Widget.type';

type PositionValue = 'left' | 'right' | 'top' | 'bottom' | 'float';

interface WidgetPositionRowProps {
  widget: WidgetState;
  onChange: (patch: Partial<WidgetState>) => void;
  onClose: () => void;
}

export type { PositionValue, WidgetPositionRowProps };
