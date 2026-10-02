/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../../../src/ai/usage.type';

const usage = {
  job: 'A button with a visible word that runs one action.',
  useWhen: [
    'The action needs a word the user reads before pressing, such as Save or Add field.',
    'A form or a dialog has one main action: give that one variant="primary".',
    'The action starts work that takes a moment: set loading while it runs.',
  ],
  avoidWhen: [
    { case: 'There is room for an icon only.', use: 'IconButton' },
    { case: 'The press opens a URL instead of running an action.', use: 'Link' },
    { case: 'The press deletes a row and cannot be undone.', use: 'ConfirmIconButton' },
    { case: 'Several buttons act on one thing and read as one tool.', use: 'ButtonGroup' },
  ],
  rules: [
    'One primary button per view. The others are secondary, tertiary or ghost.',
    'Label it with a verb the user knows: Save, Delete, Add field.',
    'A leading icon goes in the icon prop, never in the children.',
    'Use size="sm" only in dense rows and toolbars.',
  ],
  a11y: [
    'Set loading, not disabled, while work is in flight. The button then reports aria-busy.',
    'The active prop sets aria-pressed. Use it only for a button that stays on.',
    'The visible word is the accessible name, so keep it short and plain.',
  ],
  tree: {
    path: ['actions', 'one action', 'a visible word'],
    rule: 'A word the user reads, and one action when pressed.',
  },
  example: `import { Button } from '@drizztdourden08/tessera';

const SaveBar = ({ saving, onSave }: { saving: boolean; onSave: () => void }) => (
  <Button variant="primary" loading={saving} onClick={onSave}>Save</Button>
);
`,
  propsHash: '36fefced694f0cce',
} satisfies ComponentUsage;

export { usage };
