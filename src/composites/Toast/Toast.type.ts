/* @layer renderer-components @kind types */
type ToastVariant = 'danger' | 'warning' | 'info' | 'success';

type ToastPosition = 'bottom-right' | 'bottom-left';

type ToastCloseReason = 'expired' | 'dismissed' | 'action' | 'replaced';

interface ToastAction {
  label: string;
  onSelect: () => void;
}

interface ToastInput {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastAction;
  undo?: () => void;
  id?: string;
  onClose?: (reason: ToastCloseReason) => void;
}

interface ToastItem extends ToastInput {
  id: string;
  count?: number;
}

interface ToastProps {
  item: ToastItem;
  onDismiss: (id: string, reason: ToastCloseReason) => void;
}

interface ToastStackProps {
  position?: ToastPosition;
  max?: number;
}

interface ToastQueue {
  items: readonly ToastItem[];
  owner: string | null;
}

interface ToastStore {
  subscribe: (listener: () => void) => () => void;
  read: () => ToastQueue;
  show: (input: ToastInput) => string;
  dismiss: (id: string, reason?: ToastCloseReason) => void;
  clear: () => void;
  mint: () => string;
  claim: (stack: string) => () => void;
}

interface ToastApi {
  (input: ToastInput): string;
  dismiss: (id: string) => void;
  clear: () => void;
}

export type {
  ToastAction,
  ToastApi,
  ToastCloseReason,
  ToastInput,
  ToastItem,
  ToastPosition,
  ToastProps,
  ToastQueue,
  ToastStackProps,
  ToastStore,
  ToastVariant,
};
