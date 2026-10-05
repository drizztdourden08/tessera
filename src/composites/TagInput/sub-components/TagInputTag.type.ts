/* @layer renderer-components @kind types */
import type { TagAdvice } from '../TagInput.type';

interface TagInputTagProps {
  tag: string;
  advice: TagAdvice;
  disabled: boolean;
  onRemove: () => void;
}

export type { TagInputTagProps };
