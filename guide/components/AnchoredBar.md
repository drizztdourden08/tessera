# AnchoredBar

A small bar or dialog kept beside a rectangle, clamped to its box and docked at an edge when the target scrolls out of view.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { AnchoredBar } from '@drizztdourden08/tessera';
```

The source is `src/composites/AnchoredBar/AnchoredBar.tsx`. Its gallery page is Composites · Overlays/AnchoredBar (`#/story/composites-anchoredbar--overview`).

## Where the questions lead here

What are you placing? Something over the page. What sits over the page? A bar or small dialog kept beside a rectangle.

AnchoredBar adds a clamp, a dock, follow and focus handling to Anchored, for a bar that belongs to a rectangle.

## Use it when

- A toolbar or a small form belongs to a selection on a canvas or a long page, such as a rename bar over a clip.
- The bar must stay reachable when its target scrolls away, or must follow it as the page moves.

## Use something else when

- The panel only needs to sit beside a rectangle, with no clamp, dock or focus handling. Use `Anchored` instead.
- The user must answer before the app goes on. Use [Dialog](Dialog.md) instead.

## Rules

- Return the target box from anchorRect; return null while there is none and the bar stays hidden.
- Pass boundary, a ref, an element or a CSS selector, to clamp the bar inside a box, and subscribe to hear the scrolls and resizes of that box.
- Set placement to bottom-center or top-center to pick the side of the target; auto puts the bar below and flips it above when there is no room below.
- Set dock to keep the bar in view at an edge when the target is off screen, and dockedText to say why.
- Set inline when the bar sits in a scroll box instead of the top layer.
- Name the bar with label and pick role: dialog, alertdialog, toolbar or status.
- Pass initialFocus, a selector, to focus a control once the bar is placed, and onEscape to close it.
- Set error to draw the danger border while the input in the bar is refused.

## Accessibility

- The bar has the role you pass and a name from label; a dialog is not modal.
- Focus moves to initialFocus once the bar is placed, and goes back where it was when the bar closes.
- Escape runs onEscape and stops there, so a parent dialog stays open.
- The bar is hidden from the tab order until it is measured.

## Example

```tsx
import { AnchoredBar, Button } from '@drizztdourden08/tessera';

const SelectionBar = ({ rect, close }: { rect: () => DOMRect | null; close: () => void }) => (
  <AnchoredBar anchorRect={rect} dock="bottom-center" role="toolbar" label="Selection" onEscape={close}>
    <Button size="sm">Apply</Button>
  </AnchoredBar>
);
```

## Props

- `anchorRect`: `() => AnchoredRect | null`.
- `boundary` (optional): `BarBoundary`.
- `subscribe` (optional): `(notify: () => void) => () => void`.
- `inline` (optional): `boolean`.
- `placement` (optional): `BarPlacement`, one of `'bottom-center'`, `'top-center'`, `'auto'`.
- `margin` (optional): `SpaceToken`, one of `'2xs'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`.
- `gap` (optional): `SpaceToken`, one of `'2xs'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`.
- `dock` (optional): `BarDock`, one of `'top-center'`, `'bottom-center'`, `'none'`.
- `follow` (optional): `boolean`.
- `role` (optional): `BarRole`, one of `'dialog'`, `'alertdialog'`, `'toolbar'`, `'status'`.
- `label` (optional): `string`.
- `initialFocus` (optional): `string`.
- `onEscape` (optional): `() => void`.
- `error` (optional): `boolean`.
- `dockedText` (optional): `ReactNode`.
- `className` (optional): `string`.
- `children` (optional): `ReactNode`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border-strong`, `--c-danger`, `--c-surface`, `--c-text`, `--c-text-muted`, `--radius-md`, `--shadow-2`, `--space-sm`, `--space-xs`, `--z-floating`.
