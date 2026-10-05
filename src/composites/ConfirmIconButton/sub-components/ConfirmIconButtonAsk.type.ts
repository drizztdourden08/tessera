/* @layer renderer-components @kind types */
import type { ConfirmIconButtonPlacement, ConfirmIconButtonSize } from '../ConfirmIconButton.type';

interface ConfirmIconButtonAskProps {
  placement: ConfirmIconButtonPlacement;
  size?: ConfirmIconButtonSize;
  focusCancel: boolean;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export type { ConfirmIconButtonAskProps };
