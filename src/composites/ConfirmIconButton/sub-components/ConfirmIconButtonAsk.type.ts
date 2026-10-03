/* @layer renderer-components @kind types */
import type { ConfirmIconButtonPlacement } from '../ConfirmIconButton.type';

interface ConfirmIconButtonAskProps {
  placement: ConfirmIconButtonPlacement;
  focusCancel: boolean;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export type { ConfirmIconButtonAskProps };
