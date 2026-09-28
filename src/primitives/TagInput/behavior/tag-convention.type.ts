/* @layer renderer-components @kind types */
import type { TagValidator } from '../TagInput.type';

interface BlockParams {
  raw: string;
  isNew: boolean;
  enforce: boolean;
  validate?: TagValidator;
}

export type { BlockParams };
