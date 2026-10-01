/* @layer renderer-components @kind types */
import type { PatternField } from '../behavior/pattern-field.type';
import type { PatternPart } from '../behavior/parse-pattern.type';

interface AdornmentProps {
  field: PatternField;
  name: string;
}

interface PatternPartProps {
  field: PatternField;
  part: PatternPart;
}

interface PatternCounterProps {
  field: PatternField;
  name: string;
}

export type { AdornmentProps, PatternCounterProps, PatternPartProps };
