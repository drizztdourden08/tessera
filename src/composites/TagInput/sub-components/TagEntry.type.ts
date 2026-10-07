/* @layer renderer-components @kind types */
import type { ControlName } from '../../../primitives/field-control/control-name.type';
import type { TagInputState } from '../behavior/useTagInput.type';

interface TagEntryProps {
  tags: TagInputState;
  fieldId: string;
  naming: ControlName;
  describedBy?: string;
  listId: string;
  optionId: (idx: number) => string;
  placeholder: string;
  disabled: boolean;
}

export type { TagEntryProps };
