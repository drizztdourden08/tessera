/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { NumberInput } from '../../../primitives/NumberInput';
import { asNumber } from '../behavior/as-number';
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { slotLabel } from '../behavior/slot-label';
import { TIME_TYPES } from '../DynamicInput.constants';
import { PanelSection } from './PanelSection';
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
          if (Number.isFinite(next)) field.setSlot(slot.name, clampNumber(next, slot.min, slot.max));
        };
        return (
          <PanelSection key={slot.name} title={label}>
            <NumberInput
              buttons="sides"
              value={asNumber(field.value[slot.name]) ?? ''}
              min={slot.min}
              max={slot.max}
              step={slot.step}
              onChange={set}
              size={field.size}
              aria-label={label}
            />
          </PanelSection>
        );
      })}
    </Box>
  );
};

export { TimePanel };
