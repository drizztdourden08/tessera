/* @layer renderer-components @kind component */
import { NumberInput } from '../../../primitives/NumberInput';
import { Slider } from '../../../primitives/Slider';
import { asNumber } from '../behavior/as-number';
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { roundTo } from '../behavior/round-to';
import { slotLabel } from '../behavior/slot-label';
import { PanelSection } from './PanelSection';
import type { NumberPanelProps } from './SlotPanel.type';

const NumberPanel = (props: NumberPanelProps) => {
  const { field, slot, panel } = props;
  const label = slotLabel(slot, field);
  const current = asNumber(field.value[slot.name]);
  const { min, max, step, size } = { ...slot, size: field.size };
  const set = (next: number) => {
    if (Number.isFinite(next)) field.setSlot(slot.name, roundTo(clampNumber(next, slot.min, slot.max), slot.places));
  };

  return (
    <PanelSection title={label} fill={panel !== 'stepper'}>
      {panel === 'slider' && (
        <Slider className="dynamic-input__slider" value={current ?? min ?? 0} min={min ?? 0} max={max ?? 0} step={step} onChange={set} size={size} aria-label={label} />
      )}
      {panel === 'stepper' && (
        <NumberInput buttons="sides" value={current ?? ''} min={min} max={max} step={step} onChange={set} size={size} aria-label={label} />
      )}
      {panel === 'spin' && (
        <NumberInput className="dynamic-input__spin" value={current ?? ''} min={min} max={max} step={step} onChange={set} size={size} sizeToContent aria-label={label} />
      )}
    </PanelSection>
  );
};

export { NumberPanel };
