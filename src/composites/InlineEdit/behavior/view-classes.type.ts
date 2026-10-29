/* @layer renderer-components @kind types */
import type { InlineEditLook } from '../InlineEdit.type';

interface ViewClassesInput {
  multiline: boolean;
  dense: boolean;
  look: InlineEditLook;
  className: string | undefined;
}

export type { ViewClassesInput };
