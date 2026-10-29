# SplitButton

A button that runs its main action, joined to a chevron that opens a menu of related actions, such as New with the kinds of thing to create.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { SplitButton } from '@drizztdourden08/tessera';
```

The source is `src/composites/SplitButton/SplitButton.tsx`. Its gallery page is Composites · Actions/SplitButton (`#/story/composites-splitbutton--overview`).

## Where the questions lead here

What are you placing? Actions. One action, or several related buttons? One action. What does the action look like? A main action with a menu of related ones.

SplitButton gives the usual action one press and keeps its variants one step behind a chevron.

## Use it when

- One action is the usual choice and a few variants of it sit one step behind, such as New file with New folder and New from template.
- A tool toggles on and off with one press and also offers settings or modes in a menu beside it.
- A toggle such as Onion skin whose opacity, frame range and tint sit in a panel behind the chevron.

## Use something else when

- A menu of actions where no one is the usual choice. Use [DropdownMenu](DropdownMenu.md) instead.
- Peer actions on one thing, read as one tool. Use `ButtonGroup` instead.
- The user picks one of a few modes and the pick is the value. Use [SegmentedControl](SegmentedControl.md) instead.
- A panel of settings opened from a button that has no main action of its own. Use [ControlMenu](ControlMenu.md) instead.

## Rules

- Label names the main action and onClick runs it. The chevron never runs it.
- Items are the menu nodes of a DropdownMenu: actions, checks, radios and separators.
- Pass panel instead of items when the chevron should open settings: it renders ControlMenuRow rows (sliders, segmented choices, toggles) in a panel under the chevron and receives close.
- A panel stays open while its controls change; a click outside or Escape closes it. Call close from a control only when the choice should end the visit.
- Pass pressed for a toggle: the main button shows the on look and reports aria-pressed. Leave it out for a plain action.
- Variant and size follow Button; the chevron takes the same variant and a matching size.
- Pass menuLabel when Options does not say what the menu holds, such as New options.
- Keep the menu to a few related actions; more belong in a DropdownMenu.

## Accessibility

- The pair is a group named by the label; the main button and the chevron are two tab stops.
- The chevron is named by menuLabel, reports aria-haspopup and aria-expanded, and opens the menu with a click, Enter or Space.
- The menu returns focus to the chevron when it closes.
- With panel the chevron reports aria-haspopup dialog; the panel takes focus on its first control, is named by menuLabel, and Escape returns focus to the chevron.

## Example

```tsx
import { Icon, SplitButton } from '@drizztdourden08/tessera';

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
```

## Props

- `label`: `string`.
- `items` (optional): `readonly MenuNode[]`.
- `panel` (optional): `(close: () => void) => ReactNode`.
- `onClick`: `() => void`.
- `icon` (optional): `ReactNode`.
- `variant` (optional): `ButtonVariant`, one of `'primary'`, `'secondary'`, `'tertiary'`, `'danger'`, `'warning'`, `'info'`, `'success'`, `'ghost'`. Default `'secondary'`.
- `size` (optional): `ButtonSize`, one of `'xs'`, `'sm'`, `'md'`, `'lg'`. Default `'md'`.
- `pressed` (optional): `boolean`.
- `disabled` (optional): `boolean`.
- `menuLabel` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-danger`, `--c-danger-bright`, `--c-danger-soft`, `--c-focus`, `--c-hairline`, `--c-hover`, `--c-info`, `--c-info-bright`, `--c-info-soft`, `--c-primary`, `--c-primary-bright`, `--c-primary-dim`, `--c-primary-soft`, `--c-secondary`, `--c-secondary-bright`, `--c-secondary-soft`, `--c-success`, `--c-success-bright`, `--c-success-soft`, `--c-surface`, `--c-tertiary`, `--c-tertiary-bright`, `--c-tertiary-soft`, `--c-text`, `--c-text-dim`, `--c-text-muted`, `--c-warning`, `--c-warning-bright`, `--c-warning-soft`, `--control-sub-width`, `--duration-fast`, `--leading-normal`, `--menu-no-halo`, `--opacity-disabled`, `--radius-md`, `--shadow-2`, `--shadow-dropdown`, `--size-1`, `--size-128`, `--size-16`, `--size-160`, `--size-192`, `--size-224`, `--size-24`, `--size-256`, `--size-4`, `--size-448`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-base`, `--text-md`, `--text-sm`, `--text-xs`, `--tracking-caps`, `--tracking-wide`, `--transition-fast`, `--weight-medium`, `--weight-semi`, `--z-modal`.
