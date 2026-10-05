/* @layer stories @kind component */
import { FormRow } from '../../../src/composites';
import { SectionHeader, Select, Slider, Toggle } from '../../../src/primitives';
import { BALANCING } from '../../primitives/_samples/option-samples.constants';
import { POOL_OPTIONS } from './preset-form.constants';
import { presetOptionRow } from './preset-option-row';
import type { PresetPool, PresetRowsProps } from './preset-samples.type';

const PresetItemRows = ({ preset, onChange }: PresetRowsProps) => (
  <>
    <SectionHeader title="Items" level={3} />
    <FormRow label="Keysanity" description="Keys, maps and compasses can be anywhere in the world." {...presetOptionRow(preset, onChange, 'keysanity')}>
      <Toggle checked={preset.keysanity} onChange={(keysanity) => onChange({ keysanity })} aria-label="Keysanity" />
    </FormRow>
    <FormRow label="Item pool" description="How many upgrades the world holds." {...presetOptionRow(preset, onChange, 'pool')}>
      <Select options={POOL_OPTIONS} value={preset.pool} onChange={(pool) => onChange({ pool: pool as PresetPool })} />
    </FormRow>
    <FormRow label="Progression balancing" description="Moves the items a player needs earlier, so nobody waits." {...presetOptionRow(preset, onChange, 'balancing')}>
      <Slider value={preset.balancing} onChange={(balancing) => onChange({ balancing })} min={0} max={99} labels={BALANCING} input />
    </FormRow>
  </>
);

export { PresetItemRows };
