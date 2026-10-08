/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefObject } from 'react';

interface ConfirmAskOptions<T> {
  onConfirm: (value: T) => void;
  onCancel?: (value: T) => void;
  onAsk?: (value: T) => void;
  onSettle?: (value: T, ran: boolean, held: boolean) => void;
  disabled?: boolean;
  timeout?: number;
  initial?: T | null;
}

interface ConfirmAskControls {
  confirm: () => void;
  cancel: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
  holdRef: RefObject<HTMLElement | null>;
}

interface ConfirmAsk<T> extends ConfirmAskControls {
  asking: T | null;
  ask: (value: T) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export type { ConfirmAsk, ConfirmAskControls, ConfirmAskOptions };
