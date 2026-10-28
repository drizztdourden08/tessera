/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { SelectionOps, TypedText } from './selection-ops.type';

interface SelectionKeyInput {
  ops: SelectionOps;
  usable: readonly string[];
  selected: ReadonlySet<string>;
  onChange: (keys: ReadonlySet<string>) => void;
  labelOf?: (key: string) => string;
  onFocusKey?: (key: string) => void;
  typed: RefObject<TypedText>;
}

export type { SelectionKeyInput };
