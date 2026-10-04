# ScreenLayer

Building block: the overlay and the card of every screen, with one gap around the card that follows the room.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ScreenLayer } from '@drizztdourden08/tessera';
```

The source is `src/composites/ScreenLayer/ScreenLayer.tsx`. Its gallery page is Composites · Screens/ScreenLayer (`#/story/composites-screenlayer--overview`).

## A building block

No question in [decide.md](../decide.md) leads here. Other components are built on it.

## Use it when

- You build a new kind of screen that none of the screen kinds or ScreenWindow can hold.

## Use something else when

- You show a screen with pages and a side list. Use [WorkspaceScreen](WorkspaceScreen.md) instead.
- You show About, credits or another screen to read. Use [InfoScreen](InfoScreen.md) instead.
- You show one short task with a status, such as an update check. Use [UtilityScreen](UtilityScreen.md) instead.
- You show one big custom surface, such as calibration. Use [StageScreen](StageScreen.md) instead.
- You need a title, a close button and an empty container. Use [ScreenWindow](ScreenWindow.md) instead.

## Rules

- Use it only inside a screen kind. App code shows screens through the kinds.
- Put it in a positioned parent: it covers that parent, usually the whole app.
- Never set a margin or a padding on the gap: the layer works it out from its room.
- Draw the inside of the card yourself, including its padding, which is the same on all four sides.
- Use size="compact" for a card that fits its content, up to a readable width.
- Set square for a window shown fullscreen: the card drops its corner radius and its outer border, and the host draws what surrounds it.

## Accessibility

- The card is a modal dialog. Pass labelledBy with the id of a visible title, or label when there is none.
- Hidden takes the layer out of the page and out of the accessibility tree, and keeps its content mounted.
- Floating comes before the card in the page order, so a switcher in it is the first Tab stop; it still draws on the top edge of the card.

## Example

```tsx
import type { ReactNode } from 'react';
import { ScreenLayer } from '@drizztdourden08/tessera';

const KioskScreen = ({ children }: { children: ReactNode }) => (
  <ScreenLayer label="Kiosk" className="kiosk-screen">
    {children}
  </ScreenLayer>
);
```

## Props

- `children`: `ReactNode`.
- `floating` (optional): `ReactNode`.
- `hidden` (optional): `boolean`. Default `false`.
- `size` (optional): `ScreenLayerSize`, one of `'fill'`, `'compact'`. Default `'fill'`.
- `square` (optional): `boolean`. Default `false`.
- `label` (optional): `string`.
- `labelledBy` (optional): `string`.
- `className` (optional): `string`. Default `''`.

## Tokens

It draws on `--border-width-thin`, `--c-hairline`, `--c-layer`, `--control-h-md`, `--dialog-w-md`, `--radius-xl`, `--shadow-3`, `--space-2xl`, `--space-lg`, `--space-sm`, `--space-xl`, `--z-backdrop`, `--z-base`.
