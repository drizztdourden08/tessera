/* @layer stories @kind component */
import { FormRow } from '../../../src/composites';
import { NumberInput, SectionHeader, SegmentedControl } from '../../../src/primitives';
import { GOAL_OPTIONS } from './preset-form.constants';
import { presetOptionRow } from './preset-option-row';
import type { PresetRowsProps } from './preset-samples.type';

const PresetGoalRows = ({ preset, onChange }: PresetRowsProps) => (
  <>
    <SectionHeader title="Goal" level={3} />
    <FormRow label="Goal" description="What ends the run." {...presetOptionRow(preset, onChange, 'goal')}>
      <SegmentedControl options={GOAL_OPTIONS} value={preset.goal} onChange={(goal) => onChange({ goal })} aria-label="Goal" />
    </FormRow>
    <FormRow label="Crystals for Ganon's Tower" description="Crystals that open the tower. Default 7." {...presetOptionRow(preset, onChange, 'tower')}>
      <NumberInput buttons="sides" value={preset.tower} min={0} max={7} onChange={(tower) => onChange({ tower })} />
    </FormRow>
    <FormRow label="Crystals for Ganon" description="Crystals Ganon needs before he can be hurt. Default 7." {...presetOptionRow(preset, onChange, 'ganon')}>
      <NumberInput buttons="sides" value={preset.ganon} min={0} max={7} onChange={(ganon) => onChange({ ganon })} />
    </FormRow>
  </>
);

export { PresetGoalRows };
