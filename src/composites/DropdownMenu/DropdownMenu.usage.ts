/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A menu of actions, checks, choices and sub-menus, built from data, that hangs from its own button or from an anchor.',
  useWhen: [
    'A view has more actions than its toolbar can show, or actions used too rarely to earn a button, such as Export or Reset layout.',
    'A few on or off checks or one choice from a short list sit with those actions, such as which panels show.',
    'An action undoes work and the menu is where the user finds it: kind confirm asks with a second press, without a dialog.',
  ],
  avoidWhen: [
    { case: 'The entries are settings with richer controls, such as a slider or a number.', use: 'ControlMenu' },
    { case: 'The user picks one value for a form field.', use: 'Select' },
    { case: 'The actions belong to one item and should show while there is room.', use: 'ActionBar' },
    { case: 'The user looks for any action in the app by name.', use: 'CommandPalette' },
  ],
  rules: [
    'The app owns every checked value and every action; the menu only calls onSelect and draws what it is given.',
    'Give an action that undoes work kind confirm: the first press reads Click again to and the label, in the danger tone; the second runs it.',
    'Pass confirm on such an item for words of your own; the item returns to its label on Escape, on leaving it or after four seconds.',
    'Split groups by meaning with a label or a separator; turn on filter past about a dozen items.',
  ],
  a11y: [
    'The menu is role menu named by label; items are menuitem, menuitemcheckbox or menuitemradio, and a confirm item stays a menuitem.',
    'The arrow keys, Home, End and typing move through the items; Escape closes the menu, or first returns an asking item to its label.',
    'The label of a confirm item is a polite live region, so the question is read when it shows, and the item keeps its width.',
  ],
  tree: {
    path: ['actions', 'several related buttons', 'too many, or secondary'],
    rule: 'DropdownMenu keeps rare and secondary actions one click away, and asks before the ones that undo work.',
  },
  example: `import { DropdownMenu } from '@drizztdourden08/tessera';
import type { MenuGroup } from '@drizztdourden08/tessera';

interface LayoutMenuProps {
  locked: boolean;
  onLock: () => void;
  onSave: () => void;
  onReset: () => void;
}

const LayoutMenu = ({ locked, onLock, onSave, onReset }: LayoutMenuProps) => {
  const groups: MenuGroup[] = [{
    id: 'layout',
    label: 'Layout',
    items: [
      { id: 'lock', icon: 'lock', label: 'Lock widgets', checked: locked, onSelect: onLock },
      { id: 'save', icon: 'save', label: 'Save layout', onSelect: onSave },
      { separator: true },
      { id: 'reset', icon: 'rotate-ccw', label: 'Reset layout', kind: 'confirm', onSelect: onReset },
    ],
  }];
  return <DropdownMenu trigger={{ label: 'Layout', icon: 'layout-grid' }} groups={groups} />;
};
`,
  propsHash: '5bbeecc62f70147f',
} satisfies ComponentUsage;

export { usage };
