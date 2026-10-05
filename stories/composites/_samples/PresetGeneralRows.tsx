/* @layer stories @kind component */
import { FormRow } from '../../../src/composites';
import { SectionHeader, Select, Textarea, TextInput } from '../../../src/primitives';
import { GAME_OPTIONS } from './preset-form.constants';
import type { PresetRowsProps } from './preset-samples.type';

const PresetGeneralRows = ({ preset, onChange }: PresetRowsProps) => (
  <>
    <SectionHeader title="General" level={3} />
    <FormRow label="Name" description="Shown in the list and to the players who join.">
      <TextInput value={preset.name} onChange={(event) => onChange({ name: event.target.value })} />
    </FormRow>
    <FormRow label="Game">
      <Select options={GAME_OPTIONS} value={preset.game} onChange={(game) => onChange({ game })} />
    </FormRow>
    <FormRow label="Notes" description="For you and the other players; the seed ignores them.">
      <Textarea rows={3} value={preset.notes} placeholder="Rules, the race time, who hosts" onChange={(event) => onChange({ notes: event.target.value })} />
    </FormRow>
  </>
);

export { PresetGeneralRows };
