/* @layer renderer-components @kind types */
import type { TagAdvice } from '../TagInput.type';

interface TagHintProps {
  advice: TagAdvice;
  createError: string | null;
  blocked: boolean;
}

export type { TagHintProps };
