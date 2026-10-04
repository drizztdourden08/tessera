/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A ManagedList beside the editor of the picked item, that asks before a pick, New or Back throws unsaved edits away.',
  useWhen: [
    'A screen lists saved things on the left and edits the picked one on the right, such as presets or servers.',
    'The editor holds edits until the user saves, so moving away must ask first.',
  ],
  avoidWhen: [
    { case: 'The detail is read only, or every edit saves at once.', use: 'MasterDetailLayout' },
    { case: 'Only the list is needed, with no editor beside it.', use: 'ManagedList' },
  ],
  rules: [
    'Set dirty from the editor: true while its value differs from the saved one.',
    'Pass onSave so the question offers Save and open; return false, or reject, when the save fails.',
    'Pass onDiscard to throw the draft away; onSelect runs after it.',
    'Keep the list props in list; MasterDetail adds the selection and guards New.',
    'A create form in list opens without the question, since it throws no edits away; picking the new item is up to the app.',
  ],
  a11y: [
    'The question takes focus on Stay here, and Escape stays; focus goes back where it was.',
    'With guard dialog the question is a modal dialog; with guard inline it is an alertdialog over the editor.',
    'The list keeps every key of ManagedList, and under 768 px Back sits at the top of the editor.',
  ],
  tree: {
    path: ['layout', 'a list beside an editor, with unsaved edits guarded'],
    rule: 'MasterDetail joins ManagedList and MasterDetailLayout and asks the same question before edits are lost in every app.',
  },
  example: `import { MasterDetail } from '@drizztdourden08/tessera';
import { useState } from 'react';

interface Preset {
  id: string;
  name: string;
  options: Record<string, number>;
}

const PresetsScreen = ({ presets, save }: { presets: Preset[]; save: (preset: Preset) => Promise<void> }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Preset | null>(null);
  const saved = presets.find((preset) => preset.id === selectedId);
  return (
    <MasterDetail
      list={{ title: 'Presets', items: presets, getId: (preset) => preset.id, getName: (preset) => preset.name }}
      selectedId={selectedId}
      onSelect={(id) => { setDraft(null); setSelectedId(id); }}
      detail={saved ? <pre>{JSON.stringify(draft ?? saved)}</pre> : null}
      dirty={draft !== null}
      onSave={async () => { if (draft) await save(draft); }}
      onDiscard={() => setDraft(null)}
      storageKey="presets.list-width"
    />
  );
};
`,
  propsHash: '5986387546342875',
} satisfies ComponentUsage;

export { usage };
