/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'An ItemList beside the editor of the picked item, that asks before a pick, New or Back throws unsaved edits away.',
  useWhen: [
    'A screen lists saved things on the left and edits the picked one on the right, such as presets or servers.',
    'The editor holds edits until the user saves, so moving away must ask first.',
  ],
  avoidWhen: [
    { case: 'The detail is read only, or every edit saves at once.', use: 'ListDetailLayout' },
    { case: 'Only the list is needed, with no editor beside it.', use: 'ItemList' },
  ],
  rules: [
    'Set dirty from the editor: true while its value differs from the saved one.',
    'Pass onSave so the question offers Save and open; return false, or reject, when the save fails.',
    'Pass onDiscard to throw the draft away; onSelect runs after it.',
    'Keep the list props in list; ListDetail adds the selection and guards New, with create or onCreate.',
    'New asks before a create form in list opens, and opens it after Discard or a save that worked; picking the new item is up to the app.',
    'With createOpen in list, New reaches onCreateOpenChange only after the answer; a createOpen the app sets on its own skips the question.',
    'The question is a bar over the editor by default; pass guard dialog to ask in a modal dialog instead.',
    'Put a SaveBar at the foot of the editor, for Save and Discard while the user stays on the item.',
    'Every prop of ListDetailLayout passes through, such as storageKey, collapsed and emptyDetail; detail shows only while an item is picked.',
  ],
  a11y: [
    'The question takes focus on Keep editing, and Escape stays; focus goes back where it was, such as to New.',
    'By default the question is an alertdialog over the editor; with guard dialog it is a modal dialog.',
    'The list keeps every key of ItemList; the panes keep every key of ListDetailLayout, with Enter on the divider to fold the list.',
  ],
  tree: {
    path: ['layout', 'a list beside an editor, with unsaved edits guarded'],
    rule: 'ListDetail joins ItemList and ListDetailLayout and asks the same question before edits are lost in every app.',
  },
  example: `import { ListDetail } from '@drizztdourden08/tessera';
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
    <ListDetail
      list={{ title: 'Presets', items: presets, getId: (preset) => preset.id, getName: (preset) => preset.name }}
      selectedId={selectedId}
      onSelect={(id) => { setDraft(null); setSelectedId(id); }}
      detail={saved && <pre>{JSON.stringify(draft ?? saved)}</pre>}
      dirty={draft !== null}
      onSave={async () => { if (draft) await save(draft); }}
      onDiscard={() => setDraft(null)}
      storageKey="presets.list"
    />
  );
};
`,
  propsHash: '1d776bc2f6d7abee',
} satisfies ComponentUsage;

export { usage };
