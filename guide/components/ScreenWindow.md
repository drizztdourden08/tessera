# ScreenWindow

Building block: the plain screen window, a ScreenLayer with a title bar or a page header at its top, a close button and an empty container.

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
- The title bar is the default top. Pass header to make a ContentHeader the top edge of the window instead: title is its title, and the close button sits at the end of its actions.
- With header the window has no padding and no card inside: the children pad themselves, so a scrolling body reaches the window edge.
- With header, subtitle and extra do not show; put such controls in header.strip or header.actions.
- Pass back to draw a back button before the title, in the title bar or in the page header, for a screen opened from another one. The host wires Alt+Left and the mouse back button to the same call.
- Without header, the padding inside the card is the same on all four sides. Never add padding around the children to make up for it.
- UtilityScreen uses header; WorkspaceScreen and StageScreen put a ScreenPage inside the title bar window; InfoScreen keeps the title bar alone.
- The container does not scroll: the children pick how they scroll, with a ScrollArea or their own layout.
- Keep extra to a few small controls; the close button always comes last.
- Set square for a window shown fullscreen: it drops the corner radius and the outer border.

## Accessibility

- The card is a modal dialog named by the title.
- The close button carries the Close label from the strings.

## Example

```tsx
import { Button, Icon, ScreenWindow, ScrollArea } from '@drizztdourden08/tessera';

const SessionsScreen = ({ onClose }: { onClose: () => void }) => (
  <ScreenWindow title="Sessions" subtitle="Profile: mira" onClose={onClose}>
    <ScrollArea>Sessions list</ScrollArea>
  </ScreenWindow>
);

const PlayersScreen = ({ onClose }: { onClose: () => void }) => (
  <ScreenWindow title="Players" header={{ icon: <Icon name="users" />, actions: <Button size="sm">Invite</Button> }} onClose={onClose}>
    <ScrollArea>Players list</ScrollArea>
  </ScreenWindow>
);
```

## Props

- `title`: `ReactNode`.
- `onClose`: `() => void`.
- `back` (optional): `BackAction`.
- `children`: `ReactNode`.
- `header` (optional): `ScreenWindowHeader`.
- `subtitle` (optional): `ReactNode`.
- `extra` (optional): `ReactNode`.
- `floating` (optional): `ReactNode`.
- `hidden` (optional): `boolean`.
- `size` (optional): `ScreenLayerSize`, one of `'fill'`, `'compact'`.
- `square` (optional): `boolean`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-text-dim`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xl`, `--text-xl`.
