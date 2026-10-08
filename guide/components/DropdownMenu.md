# DropdownMenu

A menu of actions, checks, choices and sub-menus, built from data, that hangs from its own button or from an anchor.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { DropdownMenu } from '@drizztdourden08/tessera';
```

The source is `src/composites/DropdownMenu/DropdownMenu.tsx`. Its gallery page is Composites · Menus/DropdownMenu (`#/story/composites-dropdownmenu--overview`).

## Where the questions lead here

What are you placing? Actions. One action, or several related buttons? Several related buttons. How do the buttons relate? Too many, or secondary.

DropdownMenu keeps rare and secondary actions one click away, and asks before the ones that undo work.

## Use it when

- A view has more actions than its toolbar can show, or actions used too rarely to earn a button, such as Export or Reset layout.
- A few on or off checks or one choice from a short list sit with those actions, such as which panels show.
- An action undoes work and the menu is where the user finds it: kind confirm asks with a second press, without a dialog.

## Use something else when

- The entries are settings with richer controls, such as a slider or a number. Use [ControlMenu](ControlMenu.md) instead.
- The user picks one value for a form field. Use `Select` instead.
- The actions belong to one item and should show while there is room. Use [ActionBar](ActionBar.md) instead.
- The user looks for any action in the app by name. Use `CommandPalette` instead.

## Rules

- The app owns every checked value and every action; the menu only calls onSelect and draws what it is given.
- Give an action that undoes work kind confirm: the first press reads Click again to and the label, in the danger tone; the second runs it.
- Give an action that deletes, such as Delete in a row menu, tone danger, so it reads in the danger tone at rest; a confirm item turns red only while it asks.
- Pass confirm on such an item for words of your own; the item returns to its label on Escape, on leaving it or after four seconds.
- Split groups by meaning with a label or a separator; turn on filter past about a dozen items.
- Size sets the trigger: sm by default, md beside 39 px fields, xs in a dense bar such as a widget title bar.
- Align sets the edge of the trigger the menu lines up with: auto by default, so a trigger in the right half of the window gets its menu under its end, opening to the left at its full width; pass start or end only when the layout needs that one edge.

## Accessibility

- The menu is role menu named by label; items are menuitem, menuitemcheckbox or menuitemradio, and a confirm item stays a menuitem.
- The arrow keys, Home, End and typing move through the items; Escape closes the menu, or first returns an asking item to its label.
- The label of a confirm item is a polite live region, so the question is read when it shows, and the item keeps its width.

## Example

```tsx
import { DropdownMenu } from '@drizztdourden08/tessera';
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
```

## Props

- `trigger` (optional): `undefined | MenuTrigger`.
- `align` (optional): `MenuAlign | DropAlign`, one of `'auto'`, `'end'`, `'start'`.
- `groups`: `readonly MenuGroup[]`.
- `label` (optional): `string`.
- `variant` (optional): `MenuVariant`, one of `'danger'`, `'ghost'`, `'info'`, `'primary'`, `'secondary'`, `'success'`, `'tertiary'`, `'warning'`.
- `intensity` (optional): `MenuIntensity`, one of `'strong'`, `'medium'`, `'subtle'`.
- `closeOnSelect` (optional): `boolean`.
- `filter` (optional): `boolean`.
- `filterPlaceholder` (optional): `string`.
- `className` (optional): `string`.
- `anchorRef` (optional): `RefObject<HTMLElement | null>`.
- `side` (optional): `MenuSide`, one of `'below'`, `'above'`.
- `inline` (optional): `boolean`.
- `onClose` (optional): `() => void`.
- `size` (optional): `MenuSize`, one of `'xs'`, `'sm'`, `'md'`.
- `disabled` (optional): `boolean`.
- `onOpenChange` (optional): `(open: boolean) => void`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-danger`, `--c-danger-bright`, `--c-danger-soft`, `--c-hairline`, `--c-hover`, `--c-info`, `--c-info-bright`, `--c-info-soft`, `--c-primary`, `--c-primary-bright`, `--c-primary-dim`, `--c-primary-soft`, `--c-secondary`, `--c-secondary-bright`, `--c-secondary-soft`, `--c-success`, `--c-success-bright`, `--c-success-soft`, `--c-surface`, `--c-tertiary`, `--c-tertiary-bright`, `--c-tertiary-soft`, `--c-text`, `--c-text-dim`, `--c-text-muted`, `--c-warning`, `--c-warning-bright`, `--c-warning-soft`, `--duration-fast`, `--duration-normal`, `--ease-emphasized`, `--ease-standard`, `--listbox-attach`, `--listbox-space`, `--menu-no-halo`, `--radius-md`, `--radius-pill`, `--shadow-2`, `--shadow-dropdown`, `--size-1`, `--size-12`, `--size-16`, `--size-160`, `--size-2`, `--size-288`, `--size-4`, `--size-48`, `--size-6`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xs`, `--text-base`, `--text-sm`, `--text-xs`, `--tracking-caps`, `--transition-fast`, `--tunnel-fillet`, `--tunnel-lit-height`, `--tunnel-lit-top`, `--tunnel-open`, `--weight-semi`, `--z-modal`, `--z-popover`.
