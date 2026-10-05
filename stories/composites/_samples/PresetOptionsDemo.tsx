/* @layer stories @kind component */
import { useState } from 'react';
import { FormGroupTabs, FormRow, KeyValueEditor } from '../../../src/composites';
import type { KeyValueRecord } from '../../../src/composites';
import { Box, Combobox, Slider } from '../../../src/primitives';
import { BALANCING, BROKEN, HINTED, ITEMS, PLANDO, START_INVENTORY } from '../../primitives/_samples/option-samples.constants';
import { JsonField } from './JsonField';
import { NOT_SAVED, OPTION_GROUPS } from './option-editor-samples.constants';
import { useJsonText } from './useJsonText';
import './option-editor-story.css';

const same = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);

const PresetOptionsDemo = () => {
  const [tab, setTab] = useState('items');
  const [query, setQuery] = useState('');
  const [advanced, setAdvanced] = useState(true);
  const [inventory, setInventory] = useState<KeyValueRecord>(START_INVENTORY);
  const plando = useJsonText(PLANDO);
  const draft = useJsonText(PLANDO, BROKEN);
  const [balancing, setBalancing] = useState(65);
  const [hints, setHints] = useState<string[]>([...HINTED]);
  return (
    <Box className="option-editor-story option-editor-story--wide">
      <FormGroupTabs
        tabs={OPTION_GROUPS} activeTab={tab} onTabChange={setTab}
        query={query} onQueryChange={setQuery} advanced={advanced} onAdvancedChange={setAdvanced} advancedCount={9}
      />
      <Box className="option-editor-story__rows">
        <FormRow
          label="Start Inventory" changed={!same(inventory, {})} onReset={() => setInventory({})}
          description="Start with these items. KeyValueEditor in count mode: a stepper per row, a duplicate check, the add row searches the valid items."
        >
          <KeyValueEditor value={inventory} onChange={setInventory} keys={ITEMS} min={0} max={99} />
        </FormRow>
        <FormRow
          label="Plando Texts" changed={!same(plando.saved, {})} onReset={() => plando.set({})}
          description="Set the text of chosen text boxes. CodeBlock with editable: mono, grows with its text, checked by the app with JSON.parse."
        >
          <JsonField json={plando} />
        </FormRow>
        <FormRow
          label="Plando Texts" changed={draft.problem !== null || !same(draft.saved, PLANDO)} onReset={() => draft.set(PLANDO)}
          description="The same field while the JSON does not parse." problem={draft.problem ? `${NOT_SAVED} ${draft.problem.message}` : undefined}
        >
          <JsonField json={draft} />
        </FormRow>
        <FormRow
          label="Progression Balancing" changed={balancing !== 50} onReset={() => setBalancing(50)}
          description="Can move progression earlier, to try and prevent the player from getting stuck early. Slider: labels at the named values, a number field for any other."
        >
          <Slider value={balancing} onChange={setBalancing} min={0} max={99} labels={BALANCING} input />
        </FormRow>
        {advanced && (
          <FormRow
            label="Start Hints" advanced changed={hints.length > 0} onReset={() => setHints([])}
            description="Start with these items' locations hinted. Combobox with max: the chosen items as removable tags, typing searches the rest."
          >
            <Combobox items={ITEMS} min={0} max={ITEMS.length} values={hints} onValuesChange={setHints} placeholder="Type an item to hint" />
          </FormRow>
        )}
      </Box>
    </Box>
  );
};

export { PresetOptionsDemo };
