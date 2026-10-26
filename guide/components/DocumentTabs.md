# DocumentTabs

The strip of open documents above an editor: a tab per document with an unsaved mark and a close button, put in order by drag or keys, scrolling when they do not fit.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { DocumentTabs } from '@drizztdourden08/tessera';
```

The source is `src/composites/DocumentTabs/DocumentTabs.tsx`. Its gallery page is Composites · Navigation/DocumentTabs (`#/story/composites-documenttabs--overview`).

## Where the questions lead here

What are you placing? Navigation. Where does the user go? Between the open documents of an editor.

DocumentTabs is the strip of open documents the user switches, closes and reorders, the same way in every editor.

## Use it when

- The user has several documents open at once and switches between them, such as the drawings in a pixel art editor.
- The user closes a document from its tab, and the app may need to ask first because of unsaved changes.
- The user puts the open documents in the order they like.

## Use something else when

- The tabs are fixed views of one area, with no close and no reorder. Use `Tabs` instead.
- The tabs split one long form into groups with counts. Use [FormGroupTabs](FormGroupTabs.md) instead.
- The items are a short list of rows the user edits and puts in order. Use [RowGrid](RowGrid.md) instead.

## Rules

- Keep the tabs and the active id in the app; the strip only draws them and calls onActivate, onClose and onMove.
- OnClose only asks to close. The app may refuse, for example to confirm unsaved changes first; the tab stays until the app removes it from tabs.
- OnMove gets the old and the new index; change the order of tabs there.
- Set unsaved on a tab to show a dot that stays beside the close button on hover and focus.
- Title is the text on the tab, cut with an ellipsis; tooltip is the hover text and defaults to the title.
- When the tabs do not fit, the strip scrolls and keeps the active tab in view. Pass overflowMenu to add a menu that lists every tab.
- Show the document of the active tab beside the strip; DocumentTabs draws no panel.
- Pass onTabContextMenu to open the app menu of a tab. It gets the tab id and the event, from a right click, the Menu key or Shift+F10 on a focused tab. Call preventDefault on a mouse event to hide the browser menu.
- Pass onAdd to draw a + icon button after the last tab, inside the strip. Its label is translated from the strings, and onAdd only asks: the app adds the document to tabs.

## Accessibility

- The strip is a tablist named by label, and each tab is a button with role tab and aria-selected set on the active one. Only one tab is a tab stop.
- Left and Right move focus from tab to tab and wrap, Home and End go to the first and the last. Enter or Space activates the focused tab.
- Delete or Ctrl and W asks to close the focused tab. The close button of each tab is named Close and the title, and is not a tab stop.
- Alt and Left or Right moves the focused tab. Focus stays on the tab, and the move is announced.
- A tab with unsaved changes says so to screen readers. Middle click closes a tab.
- The Menu key and Shift+F10 on a focused tab call onTabContextMenu with the tab id. The add button is a named button and a tab stop of its own.
- The drop line follows the pointer while a tab is dragged, and the strip adds no motion when the user asks for less.

## Example

```tsx
import { DocumentTabs } from '@drizztdourden08/tessera';
import type { DocumentTab } from '@drizztdourden08/tessera';

interface OpenDrawingsProps {
  drawings: DocumentTab[];
  activeId: string;
  open: (id: string) => void;
  askToClose: (id: string) => void;
  move: (from: number, to: number) => void;
}

const OpenDrawings = ({ drawings, activeId, open, askToClose, move }: OpenDrawingsProps) => (
  <DocumentTabs
    label="Open drawings"
    tabs={drawings}
    activeId={activeId}
    onActivate={open}
    onClose={askToClose}
    onMove={move}
    overflowMenu
  />
);
```

## Props

- `tabs`: `readonly DocumentTab[]`.
- `activeId` (optional): `string`.
- `onActivate`: `(id: string) => void`.
- `onClose`: `(id: string) => void`.
- `onMove`: `(from: number, to: number) => void`.
- `label` (optional): `string`.
- `overflowMenu` (optional): `boolean`. Default `false`.
- `onTabContextMenu` (optional): `(tabId: string, event: MenuEvent) => void`.
- `onAdd` (optional): `() => void`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-focus`, `--c-hover`, `--c-primary`, `--c-primary-bright`, `--c-text`, `--c-text-dim`, `--c-warning`, `--control-h-xs`, `--document-tabs-count`, `--leading-tight`, `--opacity-muted`, `--radius-round`, `--size-1`, `--size-224`, `--size-8`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-base`, `--transition-fast`, `--transition-normal`, `--weight-medium`.
