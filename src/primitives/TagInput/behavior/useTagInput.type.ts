/* @layer renderer-components @kind types */
import type { TagValidator } from '../TagInput.type';
import type { useTagInput } from './useTagInput';

interface UseTagInputParams {
  value: readonly string[];
  onChange: (next: readonly string[]) => void;
  suggestions?: readonly string[];
  maxSuggestions?: number;
  disabled: boolean;
  validate?: TagValidator;
  enforce?: boolean;
  createError?: string | null;
}

type TagInputState = ReturnType<typeof useTagInput>;

export type { UseTagInputParams, TagInputState };
