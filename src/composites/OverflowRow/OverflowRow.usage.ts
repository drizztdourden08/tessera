/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'One row of any nodes that never wraps: when the width runs out, the least important ones fold into a popover behind a More button.',
  useWhen: [
    'A board or page header holds a name, a chip, a few facts and some icon buttons that must stay on one line at any width.',
    'The items are different kinds of nodes, not only actions, and some matter more than others.',
  ],
  avoidWhen: [
    { case: 'Every item is an action on one record, with a primary action and a confirm step.', use: 'ActionBar' },
    { case: 'The items are tools in groups that need hints and side menus.', use: 'Toolbar' },
    { case: 'The items are choices in a menu, not always visible.', use: 'DropdownMenu' },
  ],
  rules: [
    'List the items in the order the user reads them; folding never reorders the ones that stay.',
    'Give each item a stable id; the id decides what is folded.',
    'Give a higher priority to what must stay longer; the lowest priority unpinned item folds first, and the later one on a tie.',
    'Set pinned on what must always show, such as the name and the settings button.',
    'Set menuNode when an item needs another look inside the popover, such as a label next to an icon button; it defaults to node.',
    'Set moreLabel only when the default More does not fit the screen.',
  ],
  a11y: [
    'The More button is an icon button with an accessible name, and it shows only when something is folded.',
    'The popover closes with Escape or a press outside, and focus goes back to the More button.',
    'The hidden copies used to measure the row are inert and out of the Tab order.',
  ],
  tree: {
    path: ['actions', 'several related buttons', 'any nodes in one row, folding into a popover when narrow'],
    rule: 'OverflowRow keeps mixed nodes on one line and folds the lowest priority ones into a popover, never moving what stays.',
  },
  example: `import { OverflowRow } from '@drizztdourden08/tessera';
import type { OverflowRowItem } from '@drizztdourden08/tessera';
import { Icon, IconButton, Tag, Text } from '@drizztdourden08/tessera';

interface BoardHeaderProps {
  name: string;
  players: number;
  onSettings: () => void;
}

const BoardHeader = ({ name, players, onSettings }: BoardHeaderProps) => {
  const items: OverflowRowItem[] = [
    { id: 'name', pinned: true, node: <Text as="span" variant="title">{name}</Text> },
    { id: 'status', priority: 5, node: <Tag variant="urgency" color="success">Running</Tag> },
    { id: 'players', priority: 3, node: <Text as="span" variant="caption">{\`\${players} players\`}</Text> },
    { id: 'settings', pinned: true, node: <IconButton label="Settings" onClick={onSettings}><Icon name="settings" /></IconButton> },
  ];
  return <OverflowRow items={items} />;
};
`,
  propsHash: '71b7979a54068661',
} satisfies ComponentUsage;

export { usage };
