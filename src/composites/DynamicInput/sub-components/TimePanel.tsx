/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Stepper } from '../../../primitives/Stepper';
import { Span } from '../../../primitives/text-elements';
import { asNumber } from '../behavior/as-number';
import { clampToRange } from '../behavior/clamp-to-range';
import { slotLabel } from '../behavior/slot-label';
import { TIME_TYPES } from '../DynamicInput.constants';
import type { PatternSlotSpec } from '../behavior/parse-pattern.type';
import type { SlotPanelProps } from './SlotPanel.type';

const TimePanel = (props: SlotPanelProps) => {
  const { field } = props;
  const parts = TIME_TYPES
    .map((type) => field.parsed.slots.find((slot) => slot.type === type))
    .filter((slot): slot is PatternSlotSpec => slot !== undefined);

  return (
    <Box className="dynamic-input__time">
      {parts.map((slot) => {
        const label = slotLabel(slot, field);
        const set = (next: number) => {
          if (Number.isFinite(next)) field.setSlot(slot.name, clampToRange(next, slot));
        };
        return (
          <Box key={slot.name} className="dynamic-input__panel-body">
            <Span tone="muted" className="dynamic-input__panel-title">{label}</Span>
            <Stepper
              value={asNumber(field.value[slot.name]) ?? Number.NaN}
              min={slot.min}
              max={slot.max}
              step={slot.step}
              onChange={set}
              size={field.size}
              ariaLabel={label}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export { TimePanel };
