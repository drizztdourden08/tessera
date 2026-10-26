# Toolbar

A row or a column of tools, built from data, with a hint on each, a menu beside the tools that have options, and More for the tools that do not fit.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { Toolbar } from '@drizztdourden08/tessera';
```

The source is `src/composites/Toolbar/Toolbar.tsx`. Its gallery page is Composites · Actions/Toolbar (`#/story/composites-toolbar--overview`).

## Where the questions lead here

What are you placing? Actions. One action, or several related buttons? Several related buttons. How do the buttons relate? Tools in a row or column, with hints and options.

Toolbar is the set of tools of an editor, with a hint on each and options beside the ones that have them.

## Use it when

- An editor has a rail of tools the user picks from, such as pencil, eraser and fill, along an edge of the work area.
- A tool has options, such as a brush size, that should open beside it on hover without a dialog.
- The same tools must work in a row and in a column, and fold the ones that do not fit.
- A wide panel lists the same tools as rows with their name, description and shortcut.

## Use something else when

- The buttons are the actions of one item and fold into More when narrow. Use [ActionBar](ActionBar.md) instead.
- The user picks one value for a form field from a short list. Use [SegmentedControl](SegmentedControl.md) instead.
- The actions are rare or secondary and one button can hold them all. Use [DropdownMenu](DropdownMenu.md) instead.

## Rules

- Keep every value in the app; the toolbar draws items and calls onSelect, onChange and the options of each item.
- An item is a button, a toggle, a group of choices, a number or a separator. A tool the user picks is a toggle with pressed set on the current one.
- Orientation horizontal shows the optional caption beside the icon; vertical shows icons only. The hint always carries the name, the description and the shortcut.
- Icon is a name from the set or any node, such as your own bitmap. A name keeps its icon size and the 24 px snap of a pixel icon; a node is drawn as given, in the button and in More.
- Give shortcut as text such as Ctrl+Z, as keys, or as a list of { label, keys } such as Smaller and Larger. The hint draws one Shortcut row for each; the folded menu keeps the first. It never sits on the button.
- Options on a button or toggle are DropdownMenu groups. They open on hover below a row and beside a column, and with the arrow key that points away from the toolbar. openOn click opens them on a press instead, and the press still runs onSelect or onChange.
- MenuSide right or left says which side of a vertical toolbar its menus open on; a ToolbarDock slot hands it over, so a left bar opens right and a right bar opens left. Menus flip and stay inside the view near any edge, and look the same on every side.
- Layout list draws each item as a row with its icon, name, description and shortcut, a group as a labelled set of rows and a number as a row with its field. Use it in a wide panel; it never folds and has no handle or caption.
- Items that do not fit fold into More, in order; a group becomes a labelled set of choices and a number becomes a slider.
- Handle draws a grip at the start. A dock wires its own pointer handlers through handleProps; the toolbar has no drag logic.
- Give the toolbar a length: a row takes the width of its parent and a column the height of its parent. Without one, nothing folds.

## Accessibility

- The toolbar has role toolbar, aria-orientation and a name from label. Only one item is a tab stop.
- Arrow Right and Left in a row, or Down and Up in a column or a list, move focus and wrap; Home and End go to the ends.
- The arrow key that points away from the toolbar opens the options of the focused tool and moves focus into the menu. Escape closes it and returns focus to the tool.
- In a number field the arrow keys edit the value; Escape moves focus back to the item before it.
- A toggle reports aria-pressed and a tool with options reports aria-haspopup and aria-expanded. The shortcut is set as aria-keyshortcuts.

## Example

```tsx
import { Toolbar } from '@drizztdourden08/tessera';
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
```

## Props

- `items`: `readonly ToolbarItem[]`.
- `label`: `string`.
- `orientation` (optional): `ToolbarOrientation`, one of `'horizontal'`, `'vertical'`.
- `layout` (optional): `ToolbarShape`, one of `'bar'`, `'list'`.
- `size` (optional): `IconButtonSize`, one of `'xs'`, `'sm'`, `'md'`.
- `handle` (optional): `boolean`.
- `handleProps` (optional): `ToolbarHandleProps`.
- `menuSide` (optional): `ToolbarMenuSide`, one of `'right'`, `'left'`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--control-pad-sm`, `--radius-md`, `--size-2`, `--size-4`, `--size-48`, `--size-96`, `--space-2xs`, `--space-sm`, `--space-xs`.
