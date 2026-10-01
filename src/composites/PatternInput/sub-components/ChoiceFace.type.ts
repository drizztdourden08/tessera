/* @layer renderer-components @kind types */
import type { PatternSlotSpec } from '../behavior/parse-pattern.type';
import type { PatternField } from '../behavior/pattern-field.type';
import type { PatternChoice } from '../PatternInput.type';

interface ChoiceFaceProps {
  field: PatternField;
  slot: PatternSlotSpec;
  choice: PatternChoice | undefined;
}

export type { ChoiceFaceProps };
