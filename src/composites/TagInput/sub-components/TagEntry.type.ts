/* @layer renderer-components @kind types */
import type { TagInputState } from '../behavior/useTagInput.type';

interface TagEntryProps {
  tags: TagInputState;
  fieldId: string;
  listId: string;
  optionId: (idx: number) => string;
  placeholder: string;
  disabled: boolean;
}

export type { TagEntryProps };
