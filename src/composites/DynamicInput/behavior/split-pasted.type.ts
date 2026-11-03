/* @layer renderer-components @kind types */
import type { PatternSlotSpec } from './parse-pattern.type';
import type { PatternChoice, PatternValue } from '../DynamicInput.type';

type PasteChoices = (slot: PatternSlotSpec, value: PatternValue) => readonly PatternChoice[];

interface PasteStep {
  slot: PatternSlotSpec;
  sep: string;
}

interface PasteShape {
  lead: string;
  steps: readonly PasteStep[];
}

interface PasteScan {
  text: string;
  steps: readonly PasteStep[];
  choices: PasteChoices;
}

interface PasteCut {
  end: number;
  next: number;
}

interface PasteOwner {
  index: number;
  release: () => void;
}

export type { PasteChoices, PasteCut, PasteOwner, PasteScan, PasteShape, PasteStep };
