/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A row or a column of tools, built from data, with a hint on each, a menu beside the tools that have options, and More for the tools that do not fit.',
  useWhen: [
    'An editor has a rail of tools the user picks from, such as pencil, eraser and fill, along an edge of the work area.',
    'A tool has options, such as a brush size, that should open beside it on hover without a dialog.',
    'The same tools must work in a row and in a column, and fold the ones that do not fit.',
    'A wide panel lists the same tools as rows with their name, description and shortcut.',
  ],
  avoidWhen: [
    { case: 'The buttons are the actions of one item and fold into More when narrow.', use: 'ActionBar' },
    { case: 'The user picks one value for a form field from a short list.', use: 'SegmentedControl' },
    { case: 'The actions are rare or secondary and one button can hold them all.', use: 'DropdownMenu' },
  ],
  rules: [
    'Keep every value in the app; the toolbar draws items and calls onSelect, onChange and the options of each item.',
    'An item is a button, a toggle, a group of choices, a number, a popover or a separator. A tool the user picks is a toggle with pressed set on the current one.',
    'display on a group changes how it draws: set is a box of choices, menu folds it into one button that shows the current choice and opens a radio menu with icon and description, and slot does the same with a corner mark and pressed and onPress, so pressing the button runs the current choice.',
    'openOn hover, click or hold says how a menu opens. hold opens it after holdDelay milliseconds of pressing, 350 by default, and the press that opened it picks the item under the pointer when it is released. dwell is the hover delay.',
    'A popover item has a render(close) function. The panel opens beside the tool, moves focus into itself and gives focus back on Escape or when render calls close. In More it runs onFold, or shows disabled when there is none.',
    'badge draws a small glyph with a description on a tool, such as the number of stamps; borrowed shows a tool in the look of another one, with a dashed outline.',
    'A separator can take a label. A list draws it as a heading, a horizontal bar with labels on draws it beside the line, and More uses it as the heading of the folded group.',
    'keyBadges draws the key of a tool on its button. It is off by default, only a vertical bar uses it, and only a shortcut of one key shows. It is the one place a shortcut sits on a button, so leave it off unless the product asks for it.',
    'inlineOptions in a list opens the options of the pressed item under its row instead of in a menu.',
    'A number item takes fineStep, ladder, presets, suffix, scrub, showLabel and mixed, and draws a NumberField; the wheel steps it while it has focus. With showLabel the field sizes to its label and the widest value that min, max and step allow, so a short bar folds it into More instead of squeezing it.',
    'orientation horizontal shows the optional caption beside the icon; vertical shows icons only. The hint always carries the name, the description and the shortcut.',
    'labels false hides the caption in a horizontal bar, so it shows icons only. It defaults to true. A ToolbarDock passes its value for the toolbar in the render slot.',
    'icon is a name from the set or any node, such as your own bitmap. A name keeps its icon size and the 24 px snap of a pixel icon; a node is drawn as given, in the button and in More.',
    'Give shortcut as text such as Ctrl+Z, as keys, or as a list of { label, keys } such as Smaller and Larger. The hint draws one Shortcut row for each; the folded menu keeps the first. It never sits on the button, except with keyBadges.',
    'options on a button or toggle are DropdownMenu groups. They open on hover below a row and beside a column, and with the arrow key that points away from the toolbar. openOn click opens them on a press instead, and the press still runs onSelect or onChange.',
    'menuSide right or left says which side of a vertical toolbar its menus open on; a ToolbarDock slot hands it over, so a left bar opens right and a right bar opens left. Menus flip and stay inside the view near any edge, and look the same on every side.',
    'layout list draws each item as a row with its icon, name, description and shortcut, a group as a labelled set of rows and a number as a row with its field. Use it in a wide panel; it never folds and has no handle or caption.',
    'Items that do not fit fold into More; a group becomes a labelled set of choices and a number becomes a slider. Give an item a priority to choose what folds first: the lowest priority folds first, a missing one counts as 0, and equal priorities fold from the end. The items that stay keep their order.',
    'priority on a separator makes the items after it, up to the next separator, one group that folds as a unit. The group takes that priority for all its items, folds into More whole under its heading, and never splits across the bar and More. A separator without priority keeps the old behaviour.',
    'columns 2 puts a vertical bar in two columns, with a separator and the handle across both. columns auto stays in one column until the items do not fit, then wraps into two before it folds anything into More. columns 1 is the default, and a horizontal bar ignores it.',
    'hiddenItems is a list of item ids to leave out, in the bar, in More and in the list. Separators left at an end or doubled are dropped. A ToolbarDock slot hands over the list a user chose.',
    'onContextMenu(itemId, event) on the toolbar, or onContextMenu(event) on one item, runs on a right click and on Shift+F10 or the Menu key while the item has focus. The toolbar stops the browser menu and leaves showing yours to the app; a group gives the id of the group and a number gives its own.',
    'handle draws a grip at the start. A dock wires its own pointer handlers through handleProps; the toolbar has no drag logic.',
    'Give the toolbar a length: a row takes the width of its parent and a column the height of its parent. Without one, nothing folds.',
  ],
  a11y: [
    'The toolbar has role toolbar, aria-orientation and a name from label. Only one item is a tab stop.',
    'Arrow Right and Left in a row, or Down and Up in a column or a list, move focus and wrap; Home and End go to the ends.',
    'The arrow key that points away from the toolbar opens the options of the focused tool and moves focus into the menu. Escape closes it and returns focus to the tool.',
    'In a number field the arrow keys edit the value; Escape moves focus back to the item before it.',
    'A toggle reports aria-pressed and a tool with options reports aria-haspopup and aria-expanded. The shortcut is set as aria-keyshortcuts.',
  ],
  tree: {
    path: ['actions', 'several related buttons', 'tools in a row or column, with hints and options'],
    rule: 'Toolbar is the set of tools of an editor, with a hint on each and options beside the ones that have them.',
  },
  example: `import { Toolbar } from '@drizztdourden08/tessera';
import type { ToolbarItem } from '@drizztdourden08/tessera';

interface ToolRailProps {
  tool: string;
  pick: (tool: string) => void;
  undo: () => void;
}

const ToolRail = ({ tool, pick, undo }: ToolRailProps) => {
  const items: ToolbarItem[] = [
    { kind: 'toggle', id: 'pencil', label: 'Pencil', icon: 'pencil', description: 'Draw one pixel at a time.', shortcut: 'P', pressed: tool === 'pencil', onChange: () => pick('pencil') },
    { kind: 'toggle', id: 'eraser', label: 'Eraser', icon: 'eraser', description: 'Clear pixels.', shortcut: 'E', pressed: tool === 'eraser', onChange: () => pick('eraser') },
    { kind: 'separator', id: 'tools-end' },
    { kind: 'button', id: 'undo', label: 'Undo', icon: 'undo-2', shortcut: 'Ctrl+Z', onSelect: undo },
  ];
  return <Toolbar label="Drawing tools" orientation="vertical" items={items} />;
};
`,
  propsHash: 'ddba1bacfc4faccc',
} satisfies ComponentUsage;

export { usage };
