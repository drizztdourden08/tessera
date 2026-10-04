/* @layer stories @kind component */
import { useState } from 'react';
import { FormGroupTabs, FormRow, KeyValueEditor } from '../../../src/composites';
import type { KeyValueRecord } from '../../../src/composites';
import { Box, JsonInput, NamedRange, SetPicker } from '../../../src/primitives';
import { BALANCING, BROKEN, HINTED, ITEMS, PLANDO, START_INVENTORY } from '../../primitives/_samples/option-samples.constants';
import { NOT_SAVED, OPTION_GROUPS } from './option-editor-samples.constants';
import './option-editor-story.css';

const same = (a: unknown, b: unknown): boolean => JSON.stringify(a) === JSON.stringify(b);

const PresetOptionsDemo = () => {
  const [tab, setTab] = useState('items');
  const [query, setQuery] = useState('');
  const [advanced, setAdvanced] = useState(true);
  const [inventory, setInventory] = useState<KeyValueRecord>(START_INVENTORY);
  const [plando, setPlando] = useState<unknown>(PLANDO);
  const [broken, setBroken] = useState<boolean>(true);
  const [fixed, setFixed] = useState(false);
  const [balancing, setBalancing] = useState(65);
  const [hints, setHints] = useState<readonly string[]>(HINTED);
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
        <FormRow label="Plando Texts" changed={!same(plando, {})} onReset={() => setPlando({})} description="Set the text of chosen text boxes. JsonInput: mono, grows with its text, Format.">
          <JsonInput value={plando} onChange={setPlando} shape="object" />
        </FormRow>
        <FormRow label="Plando Texts" changed={!fixed} description="The same JsonInput while the JSON does not parse." problem={broken ? NOT_SAVED : undefined} onReset={() => setFixed(true)}>
          <JsonInput key={String(fixed)} value={PLANDO} onChange={() => {}} shape="object" defaultText={fixed ? undefined : BROKEN} onProblem={(problem) => setBroken(problem !== null)} />
        </FormRow>
        <FormRow
          label="Progression Balancing" changed={balancing !== 50} onReset={() => setBalancing(50)}
          description="Can move progression earlier, to try and prevent the player from getting stuck early. NamedRange: the named values first, Custom opens a number."
        >
          <NamedRange value={balancing} onChange={setBalancing} names={BALANCING} min={0} max={99} />
        </FormRow>
        {advanced && (
          <FormRow
            label="Start Hints" advanced changed={hints.length > 0} onReset={() => setHints([])}
            description="Start with these items' locations hinted. SetPicker: chosen items as removable tags, a searchable checklist below."
          >
            <SetPicker options={ITEMS} value={hints} onChange={setHints} />
          </FormRow>
        )}
      </Box>
    </Box>
  );
};

export { PresetOptionsDemo };
