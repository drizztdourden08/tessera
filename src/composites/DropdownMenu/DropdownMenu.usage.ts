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
    'A check or radio item that is off shows a faint centred dot; turned on, the dot morphs into a check or a filled radio in the menu tone, so an off item never shows a mark.',
    'Give an action that undoes work kind confirm: the first press reads Click again to and the label, in the danger tone; the second runs it.',
    'Give an action that deletes, such as Delete in a row menu, tone danger, so it reads in the danger tone at rest; a confirm item turns red only while it asks.',
    'Pass confirm on such an item for words of your own; the item returns to its label on Escape, on leaving it or after four seconds.',
    'An item icon is a name from the set, iconify data such as an imported Lucide icon, Icon path data, or any element.',
    'Split groups by meaning with a label or a separator; turn on filter past about a dozen items.',
    'Give an item onHighlight to start loading what it opens: it runs once each time the item is hovered, focused or reached with the arrow keys, and never while it is disabled.',
    'Give an item data to put data attributes on it, such as { "data-menu-entry": "rename" }, and ariaDescription for a hint a screen reader adds after the label; description is already read as part of the item.',
    'The trigger keeps its icon while the menu is open; to show another, change trigger icon from onOpenChange.',
    'size sets the trigger: sm by default, md beside 39 px fields, xs in a dense bar such as a widget title bar.',
    'itemSize roomy sets the items at 13 px with taller rows, for a menu that reads as a list of choices; default keeps the compact rows. Sub-menus follow their parent.',
    'Give an item kind select, with options, selected and onPick, to put a labelled Select inside the menu beside the action rows; picking a value never closes the menu, and the arrow keys walk through the select row like any other row.',
    'align sets the edge of the trigger the menu lines up with: auto by default, so a trigger in the right half of the window gets its menu under its end, opening to the left at its full width; pass start or end only when the layout needs that one edge.',
    'Anchored menus take side: below or above a button, right or left of a tool in a rail. Right and left line up with the top of the anchor and flip to the other side when there is no room.',
    'openOnHover on a trigger opens the menu after a short delay and closes it a moment after the pointer leaves both; click and the arrow keys still work. An anchored menu takes the same through hover, with focusOnOpen off so a hover does not take focus.',
    'To open a menu from a button of your own on hover, call useHoverOpen({ open, byHover, anchorRef, onOpen, onClose }) and spread the result on the button; pass it as hover to an anchored menu. byHover is true when the hover opened it, so a click or key opening stays open.',
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
  propsHash: '7fbd046daea15745',
} satisfies ComponentUsage;

export { usage };
