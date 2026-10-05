/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';

interface ConfirmAskOptions<T> {
  onConfirm: (value: T) => void;
  onCancel?: (value: T) => void;
  onAsk?: (value: T) => void;
  onSettle?: (value: T, ran: boolean) => void;
  disabled?: boolean;
  timeout?: number;
  initial?: T | null;
}

interface ConfirmAskControls {
  confirm: () => void;
  cancel: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
}

interface ConfirmAsk<T> extends ConfirmAskControls {
  asking: T | null;
  ask: (value: T) => void;
}

export type { ConfirmAsk, ConfirmAskControls, ConfirmAskOptions };
