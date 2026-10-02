/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../../../src/ai/usage.type';

const usage = {
  job: 'A square button that holds only an icon and names its action in a label.',
  useWhen: [
    'The icon alone tells the action, such as close, edit or more.',
    'Space is tight, as in a table row, a toolbar or a panel header.',
    'The action sits beside others of its kind in a ButtonGroup.',
  ],
  avoidWhen: [
    { case: 'The action needs a word to be understood.', use: 'Button' },
    { case: 'The icon deletes a row and the delete cannot be undone.', use: 'ConfirmIconButton' },
    { case: 'The icon opens a list of more actions.', use: 'DropdownMenu' },
  ],
  rules: [
    'The child is one Icon or Glyph and nothing else.',
    'The default variant is ghost. Pick another only when the button must stand out.',
    'Set tone="danger" for a destructive action the user can still undo.',
  ],
  a11y: [
    'The label prop is required. It becomes aria-label, the only name a screen reader hears.',
    'Set loading, not disabled, while work is in flight. The icon then turns into a spinner.',
    'The active prop sets aria-pressed, for an icon that turns a view on and off.',
  ],
  tree: {
    path: ['actions', 'one action', 'an icon only'],
    rule: 'An icon the user knows, with its name in the label prop.',
  },
  example: `import { Icon, IconButton } from '@drizztdourden08/tessera';

const EditRow = ({ onEdit }: { onEdit: () => void }) => (
  <IconButton label="Edit" onClick={onEdit}>
    <Icon name="pencil" />
  </IconButton>
);
`,
  propsHash: '041e329f26bdfee8',
} satisfies ComponentUsage;

export { usage };
