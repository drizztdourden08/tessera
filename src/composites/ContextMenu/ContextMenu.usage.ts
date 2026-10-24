/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A menu that opens where the user right-clicks, long presses or presses the menu key, built from the same data as DropdownMenu.',
  useWhen: [
    'A row, a card, a canvas or a tab has actions that belong to it, such as Rename, Duplicate and Delete, and no room for a button each.',
    'The actions are a shortcut to what a menu button already offers, so a power user reaches them where the pointer is.',
    'An app opens the menu itself, for example from a gesture on a canvas, and passes the point.',
  ],
  avoidWhen: [
    { case: 'The menu hangs from its own button.', use: 'DropdownMenu' },
    { case: 'The actions must be visible without a gesture.', use: 'ActionBar' },
    { case: 'The user looks for any action in the app by name.', use: 'CommandPalette' },
  ],
  rules: [
    'Wrap the target in ContextMenu and pass groups; the menu opens at the pointer on right-click and on a long press with touch.',
    'Never make the context menu the only way to an action; repeat each action in a button or a menu button.',
    'Shift+F10 and the menu key open the menu under the focused element, so the target must hold or contain something focusable.',
    'Items, groups, kinds and sub-menus are those of DropdownMenu; the menu flips to stay in the window.',
    'To drive it yourself, pass open, point and onClose; add onOpen to learn where a gesture asked for the menu.',
    'Set disabled to leave the browser menu in place, and longPress off when a long press already means something on the target.',
  ],
  a11y: [
    'The menu is role menu, with the keyboard of DropdownMenu: arrows, Home, End, typing and Escape.',
    'Opened with the keyboard, the menu takes focus on its first item and returns it to the element that opened it on close.',
  ],
  tree: {
    path: ['something over the page', 'a menu at the pointer, opened by right-click or long press'],
    rule: 'ContextMenu opens a DropdownMenu at the pointer, or under the focused element from the keyboard.',
  },
  example: `import { ContextMenu } from '@drizztdourden08/tessera';
import type { MenuGroup } from '@drizztdourden08/tessera';

interface TabProps {
  name: string;
  onRename: () => void;
  onClose: () => void;
}

const Tab = ({ name, onRename, onClose }: TabProps) => {
  const groups: MenuGroup[] = [{
    id: 'tab',
    items: [
      { id: 'rename', icon: 'pencil', label: 'Rename', onSelect: onRename },
      { separator: true },
      { id: 'close', icon: 'x', label: 'Close tab', tone: 'danger', onSelect: onClose },
    ],
  }];
  return <ContextMenu groups={groups} label={name}>{name}</ContextMenu>;
};
`,
  propsHash: '14ade5956c87808a',
} satisfies ComponentUsage;

export { usage };
