/* @layer renderer-components @kind types */
import type { ReferencedByHit } from '../RecordEditor';

interface DeleteGuardDialogProps {
  open: boolean;
  subjectLabel: string;
  hits: readonly ReferencedByHit[];
  error?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export type { DeleteGuardDialogProps };
