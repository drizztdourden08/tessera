/* @layer renderer-components @kind types */
interface InlineCreateActionsProps {
  ready: boolean;
  onSubmit: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

export type { InlineCreateActionsProps };
