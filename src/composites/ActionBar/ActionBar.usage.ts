/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The actions on one item in a single row: the primary action last, the ones that do not fit folded into a More menu.',
  useWhen: [
    'An editor header or a list row offers three or more actions on the same item, such as Duplicate, Export and Delete.',
    'The row must stay on one line in a narrow window, with the least used actions one click away under More.',
  ],
  avoidWhen: [
    { case: 'The row holds one icon action that asks before it acts.', use: 'ConfirmIconButton' },
    { case: 'The buttons are separate decisions that never fold, such as Cancel and Save in a dialog.', use: 'ButtonRow' },
    { case: 'Every action is secondary and none needs to show.', use: 'DropdownMenu' },
  ],
  rules: [
    'List the actions in the order the user reads them; give the main one kind primary and it sits last, never folded.',
    'Give every destructive action kind danger: it takes the danger look and asks first, in the bar or from the menu.',
    'Pass confirm to name the question and the check, such as Delete Keysanity?; the default asks with the label and a question mark.',
    'Set keep in a list row, often to one, so every row folds the same way.',
  ],
  a11y: [
    'The bar is a group named by label, and More is an icon button named More, as tall as the action buttons, that opens a keyboard menu.',
    'An action that asks shows the question with a green check and a quiet cross, focus on the cross; Escape or the cross puts focus back on the action.',
    'The hidden copies used to measure the row are inert and out of the Tab order.',
  ],
  tree: {
    path: ['actions', 'several related buttons', 'actions on one item, folding into More when narrow'],
    rule: 'ActionBar keeps the actions of one item on one line, styles danger the same way everywhere and always asks before it.',
  },
  example: `import { ActionBar } from '@drizztdourden08/tessera';
import type { ActionItem } from '@drizztdourden08/tessera';

interface PresetHeaderProps {
  name: string;
  onDuplicate: () => void;
  onDelete: () => void;
  onSave: () => void;
}

const PresetHeader = ({ name, onDuplicate, onDelete, onSave }: PresetHeaderProps) => {
  const actions: ActionItem[] = [
    { id: 'duplicate', label: 'Duplicate', icon: 'copy', onSelect: onDuplicate },
    { id: 'delete', label: 'Delete', icon: 'trash-2', kind: 'danger', onSelect: onDelete, confirm: { title: \`Delete \${name}?\`, confirmLabel: \`Delete \${name}\` } },
    { id: 'save', label: 'Save', icon: 'save', kind: 'primary', onSelect: onSave },
  ];
  return <ActionBar label={name} actions={actions} />;
};
`,
  propsHash: 'd85bd3cf444eb9a9',
} satisfies ComponentUsage;

export { usage };
