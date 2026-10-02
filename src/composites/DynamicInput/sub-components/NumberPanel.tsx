/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { NumberInput } from '../../../primitives/NumberInput';
import { Slider } from '../../../primitives/Slider';
import { Stepper } from '../../../primitives/Stepper';
import { Span } from '../../../primitives/text-elements';
import { asNumber } from '../behavior/as-number';
import { clampToRange } from '../behavior/clamp-to-range';
import { roundTo } from '../behavior/round-to';
import { slotLabel } from '../behavior/slot-label';
import type { NumberPanelProps } from './SlotPanel.type';

const NumberPanel = (props: NumberPanelProps) => {
  const { field, slot, panel } = props;
  const label = slotLabel(slot, field);
  const current = asNumber(field.value[slot.name]);
  const { min, max, step, size } = { ...slot, size: field.size };
  const set = (next: number) => {
    if (Number.isFinite(next)) field.setSlot(slot.name, roundTo(clampToRange(next, slot), slot.places));
  };

  return (
    <Box className="dynamic-input__panel-body">
      <Span tone="muted" className="dynamic-input__panel-title">{label}</Span>
      {panel === 'slider' && (
        <Slider value={current ?? min ?? 0} min={min ?? 0} max={max ?? 0} step={step} onChange={set} size={size} aria-label={label} />
      )}
      {panel === 'stepper' && (
        <Stepper value={current ?? Number.NaN} min={min} max={max} step={step} onChange={set} size={size} ariaLabel={label} />
      )}
      {panel === 'spin' && (
        <NumberInput value={current ?? ''} min={min} max={max} step={step} onChange={set} size={size} aria-label={label} />
      )}
    </Box>
  );
};

export { NumberPanel };
