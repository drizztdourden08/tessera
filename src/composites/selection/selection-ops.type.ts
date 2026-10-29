/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { SelectionCell, SelectionClick, SelectionModel } from './selection.type';

interface SelectionOpsInput {
  usable: readonly string[];
  selected: ReadonlySet<string>;
  onChange: (keys: ReadonlySet<string>) => void;
  onPick?: (key: string) => void;
  seed: string | null;
  cellOf?: (key: string) => SelectionCell | undefined;
  isHole?: (key: string) => boolean;
  anchor: { current: string | null };
}

type SelectionOps = Pick<SelectionModel, 'click' | 'toggle' | 'extend' | 'step'>;

interface TypedText {
  text: string;
  at: number;
}

interface TypeAheadKeyInput {
  usable: readonly string[];
  labelOf: (key: string) => string;
  onFocusKey: (key: string) => void;
  typed: RefObject<TypedText>;
}

export type { SelectionClick, SelectionOps, SelectionOpsInput, TypeAheadKeyInput, TypedText };
