/* @layer renderer-components @kind types */
interface EditorFooterProps {
  canSave: boolean;
  isDirty: boolean;
  saving: boolean;
  saveError?: string | null;
  disabled: boolean;
  onRevert: () => void;
  onSave: () => void | Promise<void>;
  onDelete?: () => void;
}

export type { EditorFooterProps };
