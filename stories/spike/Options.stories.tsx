/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { FormGroupTabs, FormRow, JsonInput, KeyValueEditor, NamedRange, SetPicker } from './parts/OptionInputs';
import './spike.css';

const meta = { title: 'Spike/Options', parameters: { renderer: 'react' } } satisfies StoryLiteMeta;

const ITEMS = ['Progressive Sword', 'Progressive Glove', 'Bombs (10)', 'Arrows (10)', 'Moon Pearl', 'Hookshot', 'Pegasus Boots', 'Magic Mirror', 'Flippers', 'Lamp'];

const PLANDO = `{
  "uncle_leaving_text": "Have fun, Bram",
  "ganon_phase_3_alt": "Got wax in your ears?"
}`;

const BROKEN = `{
  "uncle_leaving_text": "Have fun, Bram"
  "ganon_phase_3_alt": "Got wax in your ears?"
}`;

const T23 = {
  name: 'T-23',
  render: () => (
    <Box className="spike-shot spike-shot--w1024">
      <Text className="spike-caption">Preset editor with FormGroupTabs and FormRow: changed counts per tab, reset per row</Text>
      <FormGroupTabs active="items" advanced={9} tabs={[{ id: 'game', label: 'Game Options', count: 41, changed: 3 }, { id: 'items', label: 'Item & Location Options', count: 12, changed: 3 }, { id: 'dungeon', label: 'Dungeon Items', count: 6 }]} />
      <Box>
        <FormRow label="Start Inventory" description="Start with these items. KeyValueEditor in count mode: a stepper per row, a duplicate check, the add row searches the 312 valid items." changed>
          <KeyValueEditor value={{ 'Progressive Sword': 1, 'Bombs (10)': 2, 'Pegasus Boots': 1 }} keys={ITEMS} />
        </FormRow>
        <FormRow label="Plando Texts" description="Set the text of chosen text boxes. JsonInput: mono, grows with its text, Format." changed>
          <JsonInput text={PLANDO} />
        </FormRow>
        <FormRow label="Plando Texts" description="The same JsonInput while the JSON does not parse." changed problem="Not saved: fix the JSON first.">
          <JsonInput text={BROKEN} error="Expected ',' or '}' after the value on line 2" />
        </FormRow>
        <FormRow label="Progression Balancing" description="Can move progression earlier, to try and prevent the player from getting stuck early. NamedRange: the named values first, Custom opens a number.">
          <NamedRange value="custom" custom={65} names={[{ label: 'Disabled', value: 0 }, { label: 'Normal', value: 50 }, { label: 'Extreme', value: 99 }]} />
        </FormRow>
        <FormRow label="Start Hints" description="Start with these items' locations hinted. SetPicker: chosen items as removable tags, a searchable checklist below." changed advanced>
          <SetPicker query="o" selected={['Moon Pearl', 'Hookshot']} options={ITEMS} />
        </FormRow>
      </Box>
    </Box>
  ),
};

const Overview = { name: 'Overview', render: () => <Text variant="body">T-23 option inputs preview.</Text> };

export default meta;
export { Overview, T23 };
