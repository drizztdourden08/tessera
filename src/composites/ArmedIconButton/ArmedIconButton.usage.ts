/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'An icon button pressed twice: the first press arms it and its icon loops a short motion, the second press acts.',
  useWhen: [
    'A row action replaces or removes something, such as loading a save state, saving over one or deleting one.',
    'Several such actions sit side by side on a row and each needs its own second press.',
  ],
  avoidWhen: [
    { case: 'The second press should be a separate check with a cancel beside it.', use: 'ConfirmIconButton' },
    { case: 'The action needs a message to explain what it does.', use: 'Dialog' },
    { case: 'Several actions on one item fold into More when narrow.', use: 'ActionBar' },
  ],
  rules: [
    'Pick the icon by what the action does: load-state to load, save-state to save over, trash-2 to delete.',
    'Name the action and its target in label, such as Load Slot 1: armed, it reads Click again to load Slot 1.',
    'Give load the info tone, overwrite the warning tone and delete the danger tone, as in a save row.',
    'Leave the timeout at 4 seconds; pass timeout={false} only where the button must wait until focus leaves.',
    'Run the action in onConfirm only; onCancel runs when the press times out, loses focus or meets Escape.',
  ],
  a11y: [
    'Armed, its name and its tooltip change to the armed label, and a polite status region says it once.',
    'Escape, a blur or the timeout disarms it, and focus stays on the button.',
    'Reduced motion shows the armed pose still, without the loop.',
  ],
  tree: {
    path: ['actions', 'one action', 'irreversible, on a row'],
    rule: 'ArmedIconButton shares the one ask of ConfirmIconButton: the same timeout, Escape, blur and focus return.',
  },
  example: `import { ArmedIconButton } from '@drizztdourden08/tessera';

const SaveSlotTools = ({ slot, onLoad, onSave, onDelete }: { slot: string; onLoad: () => void; onSave: () => void; onDelete: () => void }) => (
  <>
    <ArmedIconButton icon="load-state" tone="info" label={\`Load \${slot}\`} onConfirm={onLoad} />
    <ArmedIconButton icon="save-state" tone="warning" label={\`Overwrite \${slot}\`} onConfirm={onSave} />
    <ArmedIconButton icon="trash-2" tone="danger" label={\`Delete \${slot}\`} onConfirm={onDelete} />
  </>
);
`,
  propsHash: 'dbad7a84d57edcd8',
} satisfies ComponentUsage;

export { usage };
