/* @layer renderer-components @kind types */
import type { ControlSize } from '../../../primitives/field-control/field-control.type';

interface InlineCreateActionsProps {
  ready: boolean;
  size: ControlSize;
  onSubmit: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

export type { InlineCreateActionsProps };
