/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A button that runs its main action, joined to a chevron that opens a menu of related actions, such as New with the kinds of thing to create.',
  useWhen: [
    'One action is the usual choice and a few variants of it sit one step behind, such as New file with New folder and New from template.',
    'A tool toggles on and off with one press and also offers settings or modes in a menu beside it.',
  ],
  avoidWhen: [
    { case: 'A menu of actions where no one is the usual choice.', use: 'DropdownMenu' },
    { case: 'Peer actions on one thing, read as one tool.', use: 'ButtonGroup' },
    { case: 'The user picks one of a few modes and the pick is the value.', use: 'SegmentedControl' },
  ],
  rules: [
    'label names the main action and onClick runs it. The chevron never runs it.',
    'items are the menu nodes of a DropdownMenu: actions, checks, radios and separators.',
    'Pass pressed for a toggle: the main button shows the on look and reports aria-pressed. Leave it out for a plain action.',
    'variant and size follow Button; the chevron takes the same variant and a matching size.',
    'Pass menuLabel when Options does not say what the menu holds, such as New options.',
    'Keep the menu to a few related actions; more belong in a DropdownMenu.',
  ],
  a11y: [
    'The pair is a group named by the label; the main button and the chevron are two tab stops.',
    'The chevron is named by menuLabel, reports aria-haspopup and aria-expanded, and opens the menu with a click, Enter or Space.',
    'The menu returns focus to the chevron when it closes.',
  ],
  tree: {
    path: ['actions', 'one action', 'a main action with a menu of related ones'],
    rule: 'SplitButton gives the usual action one press and keeps its variants one step behind a chevron.',
  },
  example: `import { Icon, SplitButton } from '@drizztdourden08/tessera';

interface NewMenuProps {
  createFile: () => void;
  createFolder: () => void;
}

const NewMenu = ({ createFile, createFolder }: NewMenuProps) => (
  <SplitButton
    label="New file"
    icon={<Icon name="plus" />}
    onClick={createFile}
    menuLabel="New options"
    items={[
      { id: 'folder', label: 'New folder', onSelect: createFolder },
    ]}
  />
);
`,
  propsHash: '4638166a124f8456',
} satisfies ComponentUsage;

export { usage };
