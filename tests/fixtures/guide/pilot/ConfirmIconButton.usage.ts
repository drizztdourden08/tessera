/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../../../src/guide/usage.type';

const usage = {
  job: 'An icon button that asks for a second press before an action that cannot be undone.',
  useWhen: [
    'A row in a list or a table has a delete that cannot be undone.',
    'The action is small enough that a dialog would be too much.',
  ],
  avoidWhen: [
    { case: 'The action removes a whole view or many records, and the user should read what goes.', use: 'DeleteGuardDialog' },
    { case: 'The action can be undone.', use: 'IconButton' },
    { case: 'The action needs a word on the button.', use: 'Button' },
  ],
  rules: [
    'Use it for one row at a time, never for a bulk action.',
    'The icon prop names the action. The component draws the confirm and cancel glyphs itself.',
    'Write confirmLabel and cancelLabel as outcomes, such as Delete row and Keep row.',
    'Set placement to the edge the button sits on: end for a row action, start for a toolbar, center for a centred footer.',
  ],
  a11y: [
    'The label, confirmLabel and cancelLabel props each name a button, so all three are required.',
    'Escape closes the second step and brings back the first button.',
    'Focus moves to the cancel button when the second step opens.',
  ],
  tree: {
    path: ['actions', 'one action', 'irreversible, on a row'],
    rule: 'A second press confirms a delete on one row.',
  },
  example: `import { ConfirmIconButton, Icon } from '@drizztdourden08/tessera';

const DeleteRow = ({ onDelete }: { onDelete: () => void }) => (
  <ConfirmIconButton
    icon={<Icon name="delete" />}
    label="Delete row"
    confirmLabel="Delete it"
    cancelLabel="Keep it"
    placement="end"
    onConfirm={onDelete}
  />
);
`,
  propsHash: '91387c42c2daf297',
} satisfies ComponentUsage;

export { usage };
