/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The bar at the foot of an editor: whether its edits are saved, the reason a save failed, and Save and Discard.',
  useWhen: [
    'A screen edits one thing, such as a preset or a session, and keeps the edits until the user saves.',
    'The user needs to see at a glance whether the edits are saved, and to save or drop them from one place.',
  ],
  avoidWhen: [
    { case: 'Each setting applies the moment it changes.', use: 'SettingsRow' },
    { case: 'A new thing is named before it exists.', use: 'InlineCreateForm' },
    { case: 'The edits are steps of one task with Back and Next.', use: 'WizardNav' },
  ],
  rules: [
    'Put the bar last in the editor, so it stays at the foot of the scrolling area.',
    'Move state through clean, dirty, saving, then saved or error; the app owns it and the bar only draws it.',
    'Pass error as a sentence that says what to do, such as Free some space and save again.',
    'Pass onDiscard to offer Discard; leave it out when the edits cannot be dropped.',
  ],
  a11y: [
    'The save state is a status region, so a screen reader hears Saving, Saved or Not saved with the reason.',
    'Save and Discard are off while there is nothing to save, and Save shows a spinner while it saves.',
  ],
  tree: {
    path: ['feedback', 'whether the edits are saved, with Save and Discard'],
    rule: 'SaveBar says whether an editor is saved and holds Save and Discard at its foot, the same way in every app.',
  },
  example: `import { SaveBar } from '@drizztdourden08/tessera';
import type { SaveBarState } from '@drizztdourden08/tessera';
import type { ReactNode } from 'react';

interface PresetEditorProps {
  fields: ReactNode;
  state: SaveBarState;
  error?: string;
  save: () => void;
  discard: () => void;
}

const PresetEditor = ({ fields, state, error, save, discard }: PresetEditorProps) => (
  <section>
    {fields}
    <SaveBar state={state} error={error} onSave={save} onDiscard={discard} />
  </section>
);
`,
  propsHash: 'c2b4fc1e412d6956',
} satisfies ComponentUsage;

export { usage };
