# PointerPalette

A sectioned grid of icon cells that opens at a point, so a tool or mode is picked with the hand that stays on the canvas.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { PointerPalette } from '@drizztdourden08/tessera';
```

The source is `src/composites/PointerPalette/PointerPalette.tsx`. Its gallery page is Composites · Menus/PointerPalette (`#/story/composites-pointerpalette--overview`).

## Where the questions lead here

What are you placing? Something over the page. What sits over the page? A grid of icons at the pointer, picked by hold and release.

PointerPalette is the sectioned icon grid that opens at a point and picks by hold and release, click or key.

## Use it when

- An editor offers a quick palette of tools at the pointer, opened by a key or a press, with a hold and release to pick.
- The choices are few icons in named sections, and each can show its key.

## Use something else when

- The choices are commands in a list that opens at the pointer. Use [ContextMenu](ContextMenu.md) instead.
- The grid sits in the page, not at a point. Use [ChoiceGrid](ChoiceGrid.md) instead.

## Rules

- Pass open, at, sections, value, onPick, onClose and aria-label. The app keeps open and the point; the palette keeps nothing.
- A section has an id, an optional label and its items. An item has an id, an icon, a label, an optional shortcut and an optional disabled.
- Icon takes the props of Icon, such as { name: "pencil" }. shortcut takes the keys of Shortcut and is drawn small in the corner of the cell.
- At is a point in the window, such as the pointer position. The palette opens just below and after it, and flips above or to the left when there is no room.
- Set holding while the press that opened the palette is still down. The first release then picks the cell under the pointer; a release elsewhere keeps the palette open for clicks and keys.
- Leave holding out when a key or a tap opened it. The palette then waits for a click or Enter.
- A pick calls onPick and then onClose. Escape and a press outside call onClose, and focus goes back to where it was.
- Columns is the cells in a row of each section, 4 by default.

## Accessibility

- The grid is one Tab stop and a listbox named by aria-label; its sections are groups named by their labels.
- Focus enters on the active cell. Arrows move across sections, Home and End jump, and Enter or Space picks.
- The release gesture is for pointers only; the keys do the same job.

## Example

```tsx
import { useState } from 'react';
import { Box, PointerPalette } from '@drizztdourden08/tessera';
import type { PalettePoint } from '@drizztdourden08/tessera';

const sections = [
  {
    id: 'draw',
    label: 'Draw',
    items: [
      { id: 'pencil', icon: { name: 'pencil' }, label: 'Pencil', shortcut: 'b' },
      { id: 'eraser', icon: { name: 'eraser' }, label: 'Eraser', shortcut: 'e' },
    ],
  },
] as const;

const Canvas = () => {
  const [at, setAt] = useState<PalettePoint | null>(null);
  const [tool, setTool] = useState('pencil');
  return (
    <>
      <Box onPointerDown={(event) => setAt({ x: event.clientX, y: event.clientY })} />
      <PointerPalette
        aria-label="Tools"
        open={at !== null}
        at={at ?? { x: 0, y: 0 }}
        sections={sections}
        value={tool}
        holding
        onPick={setTool}
        onClose={() => setAt(null)}
      />
    </>
  );
};
```

## Props

- `open`: `boolean`.
- `at`: `PalettePoint`.
- `sections`: `readonly PaletteSection[]`.
- `value` (optional): `string | null`.
- `columns` (optional): `number`.
- `holding` (optional): `boolean`.
- `onPick`: `(id: string) => void`.
- `onClose`: `() => void`.
- `aria-label`: `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-focus`, `--c-hover`, `--c-primary`, `--c-surface`, `--c-text`, `--c-text-muted`, `--opacity-disabled`, `--radius-md`, `--radius-sm`, `--shadow-dropdown`, `--size-64`, `--space-2xs`, `--space-sm`, `--space-xs`, `--text-xs`, `--z-popover`.
