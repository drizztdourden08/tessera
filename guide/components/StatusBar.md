# StatusBar

The thin bar at the foot of an editor window: a row of labelled readouts such as cursor, zoom, colour and frame.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { StatusBar } from '@drizztdourden08/tessera';
```

The source is `src/composites/StatusBar/StatusBar.tsx`. Its gallery page is Composites · Layout/StatusBar (`#/story/composites-statusbar--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? Window chrome. Which part of the window? The status line at the foot.

StatusBar is the one thin line of readouts at the foot of an editor window.

## Use it when

- An editor or tool window shows live facts about its work, such as the pixel under the pointer and the current zoom.
- A readout needs a small colour chip beside its value, such as the colour you are drawing with.

## Use something else when

- The save state of a form and its Save and Discard buttons. Use [SaveBar](SaveBar.md) instead.
- One label and value on a line inside a panel, not a bar. Use `StatRow` instead.
- A headline number with its trend and chart. Use [StatTile](StatTile.md) instead.

## Rules

- Give each item a stable id, a short label and a value; keep the value short, such as 24, 17 or 800%.
- Set align to end for the readouts that describe the document, such as layer and frame, and leave the rest at the start.
- Set priority from 1 to 3 on the readouts that may go when the bar is narrow: 3 goes first, 1 last. An item with no priority never goes.
- Pass swatch as a CSS colour value and put the colour name or hex in the value, so the chip is never the only signal.
- Use tone on a value only when it is past a limit, and title for a longer description on hover.
- Pass actions for the few buttons that belong to the bar, such as sync or export; they end the bar as icon buttons with a tooltip.
- Give the bar a label that names the region, such as Editor status.
- Pass onItemContextMenu to open the app menu of a readout. It gets the item id and the event, from a right click, the Menu key or Shift+F10.

## Accessibility

- The bar is a labelled region and each readout is a term and its value in a description list.
- It has no live region, so a cursor position that changes on every pointer move is never announced.
- To announce a change, such as a finished export, use a separate live region, not the bar.
- Each action is a button named by its label, shown as a tooltip too; loading marks it busy and disabled takes it out of the Tab order.
- The swatch is hidden from assistive technology; its colour is read from the value beside it.
- With onItemContextMenu each readout is a tab stop with a focus ring, so the Menu key and Shift+F10 reach it.

## Example

```tsx
import { StatusBar } from '@drizztdourden08/tessera';

const EditorStatus = ({ x, y, colour }: { x: number; y: number; colour: string }) => (
  <StatusBar
    label="Editor status"
    items={[
      { id: 'cursor', label: 'Cursor', value: `${x}, ${y}`, icon: 'move' },
      { id: 'colour', label: 'Colour', value: colour, swatch: colour },
      { id: 'frame', label: 'Frame', value: '3 / 8', align: 'end', priority: 1 },
    ]}
  />
);
```

## Props

- `items`: `readonly StatusBarEntry[]`.
- `actions` (optional): `readonly StatusBarAction[]`. Default `[]`.
- `onItemContextMenu` (optional): `StatusBarMenuHook`.
- `label`: `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-chrome`, `--c-chrome-border`, `--c-danger`, `--c-focus`, `--c-info`, `--c-primary-text`, `--c-secondary`, `--c-success`, `--c-tertiary`, `--c-text`, `--c-text-muted`, `--c-warning`, `--radius-sm`, `--space-2xs`, `--space-sm`, `--space-xs`, `--status-bar-h`, `--status-bar-swatch`, `--text-xs`.
