# ScreenWindow

Building block: the plain screen window, a ScreenLayer with a title, a close button and an empty container.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ScreenWindow } from '@drizztdourden08/tessera';
```

The source is `src/composites/ScreenWindow/ScreenWindow.tsx`. Its gallery page is Composites · Screens/ScreenWindow (`#/story/composites-screenwindow--overview`).

## A building block

No question in [decide.md](../decide.md) leads here. Other components are built on it.

## Use it when

- You build a new kind of screen on the window every screen kind shares.
- A screen fits none of the four kinds and needs only a title, a close button and its own content.

## Use something else when

- The screen has pages the user moves between from a side list. Use [WorkspaceScreen](WorkspaceScreen.md) instead.
- The screen is read, such as About or credits. Use [InfoScreen](InfoScreen.md) instead.
- The screen runs one short task with a status and actions. Use [UtilityScreen](UtilityScreen.md) instead.
- The screen is one big custom surface. Use [StageScreen](StageScreen.md) instead.

## Rules

- Reach for a screen kind first. Use ScreenWindow alone only when none of them fits.
- The padding inside the card is the same on all four sides. Never add padding around the children to make up for it.
- The container does not scroll: the children pick how they scroll, with a ScrollArea or their own layout.
- Keep extra to a few small controls; the close button always comes last.

## Accessibility

- The card is a modal dialog named by the title.
- The close button carries the Close label from the strings.

## Example

```tsx
import { ScreenWindow, ScrollArea } from '@drizztdourden08/tessera';

const SessionsScreen = ({ onClose }: { onClose: () => void }) => (
  <ScreenWindow title="Sessions" subtitle="Profile: mira" onClose={onClose}>
    <ScrollArea>Sessions list</ScrollArea>
  </ScreenWindow>
);
```

## Props

- `title`: `ReactNode`.
- `onClose`: `() => void`.
- `children`: `ReactNode`.
- `subtitle` (optional): `ReactNode`.
- `extra` (optional): `ReactNode`.
- `floating` (optional): `ReactNode`.
- `hidden` (optional): `boolean`.
- `size` (optional): `ScreenLayerSize`, one of `'fill'`, `'compact'`.
- `className` (optional): `string`. Default `''`.

## Tokens

It draws on `--space-lg`, `--space-md`, `--space-xl`, `--text-xl`.
