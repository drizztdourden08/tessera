/* @layer renderer-components @kind types */
import type { PatternSlotSpec } from '../behavior/parse-pattern.type';
import type { PatternField } from '../behavior/pattern-field.type';
import type { NumberPanel, SlotPanel } from '../behavior/slot-panel.type';

interface SlotPanelProps {
  field: PatternField;
  slot: PatternSlotSpec;
}

interface TypedPanelProps extends SlotPanelProps {
  panel: SlotPanel;
}

interface NumberPanelProps extends SlotPanelProps {
  panel: NumberPanel;
}

export type { NumberPanelProps, SlotPanelProps, TypedPanelProps };
