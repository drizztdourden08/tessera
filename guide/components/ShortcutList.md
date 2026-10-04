# ShortcutList

A list of keys, clicks and drags and what each one does, with the keys in one column and the descriptions in the next.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { ShortcutList } from '@drizztdourden08/tessera';
```

The source is `src/primitives/ShortcutList/ShortcutList.tsx`. Its gallery page is Primitives · Display/ShortcutList (`#/story/primitives-shortcutlist--overview`).

## Where the questions lead here

What are you placing? A status, a count or a label. What does it show? A list of keys and what they do.

ShortcutList keeps every key in one column and every description at one edge, however long the text runs.

## Use it when

- A panel, a menu or a help screen lists the keys and gestures a tool answers to.
- Some shortcuts only work at certain moments, such as while dragging, and read better under a heading of their own.

## Use something else when

- One key or one combination sits inside a sentence, a button or a menu item. Use `Shortcut` instead.
- The keys should be shown on a drawn keyboard, pressed in turn. Use `ShortcutTour` instead.

## Rules

- Lead each description with what happens, in a short phrase; keep the key cell to keys or one gesture.
- Write a gesture as an icon and a short verb, such as Drag title or Drag gap, never as a sentence.
- Group rows by when they work, with a short heading such as Any time or While dragging, and drop words the heading already says.
- Use size xs in menus, panels and cards, and md on a page of its own.

## Accessibility

- Each group is a description list: the keys are the term and the description its definition, so a screen reader reads them in pairs.
- Keycaps read their full key names, and a gesture reads its label.
- Pass label to name the whole list, and a group label names its group.

## Example

```tsx
import { ShortcutList } from '@drizztdourden08/tessera';

const DockShortcuts = () => (
  <ShortcutList
    label="Dock shortcuts"
    groups={[
      {
        label: 'Any time',
        items: [
          { gesture: { icon: 'move', label: 'Drag title' }, description: 'Move to a dock edge, a pane, a tab or over the main view' },
          { keys: 'alt', description: 'Peek: widgets fold away while held' },
        ],
      },
      {
        label: 'While dragging',
        items: [
          { keys: 'shift', description: 'Swap with the pane under the pointer' },
          { keys: 'esc', description: 'Cancel the drag' },
        ],
      },
    ]}
  />
);
```

## Props

- `size` (optional): `ShortcutSize`, one of `'md'`, `'xs'`. Default `'xs'`.
- `label` (optional): `string`.
- `className` (optional): `string`.
- `items` (optional): `readonly ShortcutListItem[] | undefined`.
- `groups` (optional): `undefined | readonly ShortcutListGroup[]`.

## Tokens

It draws on `--c-text-dim`, `--font-sans`, `--leading-tight`, `--size-16`, `--size-20`, `--space-2xs`, `--space-sm`, `--space-xs`, `--text-sm`, `--text-xs`.
