/* @layer renderer-components @kind types */
import type { PatternSlotSpec } from '../behavior/parse-pattern.type';
import type { PatternField } from '../behavior/pattern-field.type';
import type { SlotKind } from '../behavior/slot-kind.type';

interface SegmentProps {
  field: PatternField;
  slot: PatternSlotSpec;
  index: number;
}

interface TypedSegmentProps extends SegmentProps {
  kind: SlotKind;
}

interface DecimalShadeProps {
  text: string;
}

export type { DecimalShadeProps, SegmentProps, TypedSegmentProps };
