/* @layer renderer-components @kind types */
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';
import type { ReferencedByHit } from '../RecordEditor';

interface DeleteGuardDialogProps {
  open: boolean;
  subjectLabel: string;
  hits: readonly ReferencedByHit[];
  error?: string;
  onConfirm: () => void;
  onCancel: () => void;
  id?: string;
  data?: DataAttributes;
}

export type { DeleteGuardDialogProps };
