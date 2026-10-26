# ContextMenu

A menu that opens where the user right-clicks, long presses or presses the menu key, built from the same data as DropdownMenu.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ContextMenu } from '@drizztdourden08/tessera';
```

The source is `src/composites/ContextMenu/ContextMenu.tsx`. Its gallery page is Composites · Menus/ContextMenu (`#/story/composites-contextmenu--overview`).

## Where the questions lead here

What are you placing? Something over the page. What sits over the page? A menu at the pointer, opened by right-click or long press.

ContextMenu opens a DropdownMenu at the pointer, or under the focused element from the keyboard.

## Use it when

- A row, a card, a canvas or a tab has actions that belong to it, such as Rename, Duplicate and Delete, and no room for a button each.
- The actions are a shortcut to what a menu button already offers, so a power user reaches them where the pointer is.
- An app opens the menu itself, for example from a gesture on a canvas, and passes the point.

## Use something else when

- The menu hangs from its own button. Use [DropdownMenu](DropdownMenu.md) instead.
- The actions must be visible without a gesture. Use [ActionBar](ActionBar.md) instead.
- The user looks for any action in the app by name. Use `CommandPalette` instead.

## Rules

- Wrap the target in ContextMenu and pass groups; the menu opens at the pointer on right-click and on a long press with touch.
- Never make the context menu the only way to an action; repeat each action in a button or a menu button.
- Shift+F10 and the menu key open the menu under the focused element, so the target must hold or contain something focusable.
- Items, groups, kinds and sub-menus are those of DropdownMenu; the menu flips to stay in the window.
- To drive it yourself, pass open, point and onClose; add onOpen to learn where a gesture asked for the menu.
- Set disabled to leave the browser menu in place, and longPress off when a long press already means something on the target.

## Accessibility

- The menu is role menu, with the keyboard of DropdownMenu: arrows, Home, End, typing and Escape.
- Opened with the keyboard, the menu takes focus on its first item and returns it to the element that opened it on close.
- Focus returns the same way when you drive the menu with open: after Escape, a pick or open set to false it goes back to the opener, and it stays put when the user clicked into another focusable element.

## Example

```tsx
import { ContextMenu } from '@drizztdourden08/tessera';
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
```

## Props

- `children` (optional): `ReactNode`.
- `open` (optional): `boolean`.
- `point` (optional): `ContextMenuPoint`.
- `disabled` (optional): `boolean`. Default `false`.
- `longPress` (optional): `boolean`. Default `true`.
- `onOpen` (optional): `(point: ContextMenuPoint) => void`.
- `onClose` (optional): `() => void`.
- `groups`: `readonly MenuGroup[]`.
- `label` (optional): `string`.
- `variant` (optional): `MenuVariant`, one of `'danger'`, `'ghost'`, `'info'`, `'primary'`, `'secondary'`, `'success'`, `'tertiary'`, `'warning'`.
- `intensity` (optional): `MenuIntensity`, one of `'strong'`, `'medium'`, `'subtle'`.
- `closeOnSelect` (optional): `boolean`.
- `filter` (optional): `boolean`.
- `filterPlaceholder` (optional): `string`.
- `className` (optional): `string`.
