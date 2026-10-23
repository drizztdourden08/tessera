# ScreenWindow

Building block: the plain screen window, a ScreenLayer with a title bar, a page header or only corner buttons at its top, a close button and an empty container.

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
- With the title row, the padding inside the card is the same on all four sides. Never add padding around the children to make up for it.
- Pass titleRow={false} for a card or a hub with no title row: the title row goes, the title sits in a small chip half over the top left corner of the card, and a round X sits half over the top right corner.
- The corner chip has the height, surface, border and shadow of the round X, with small dim text. Pass icon for a 14 px glyph before the title. A long title ends in an ellipsis before it reaches the buttons on the right.
- The chip adds no height and never a row inside the content. Pass cornerTitle={false} to keep the corner bare, for example when a floating switch already names the screen: the chip goes and the title only names the dialog.
- With titleRow={false}, pass the title as plain text, keep back for windows with a title row, and expect a tighter window: a smaller gap around the card, lg padding on the sides and bottom, and 8 px between the switch and the content.
- Pass movable with titleRow={false} to add a lock left of the X. Locked, the default, the window sits centred; unlocked, it moves by the top edge of the card and resizes from every edge and corner, inside the screen and down to minSize.
- Pass storageKey to remember the lock and the moved rect, or keep them in the app with locked, onLockChange, defaultRect and onRectChange. Locking snaps the window back to the centre; unlocking puts it back where it was moved.
- UtilityScreen uses header; WorkspaceScreen and StageScreen put a ScreenPage inside the title bar window; InfoScreen keeps the title bar alone.
- The container does not scroll: the children pick how they scroll, with a ScrollArea or their own layout.
- Keep extra to a few small controls; the close button always comes last.
- Size goes to the ScreenLayer: fill by default, compact for one short task, info for a small window to read with no tools, as InfoScreen sets.
- Set square for a window shown fullscreen: it drops the corner radius and the outer border.
- The window is a container named screen-window. Fit content to the window with @container screen-window, never with a media query on the viewport: the window can sit in a gallery frame, a split pane or a window of its own.
- Short of room, the title bar puts the subtitle on a line under the title, and extra folds away before the title shrinks.

## Accessibility

- The card is a modal dialog named by the title.
- The close button carries the Close label from the strings.
- Escape calls onClose once no menu, popover or dialog is open above the window, so one press closes one thing.
- With titleRow={false}, the text of the corner chip names the dialog. The chip is not a control: it takes no focus, and its icon is hidden from screen readers. With cornerTitle={false}, the title still names the dialog.
- With titleRow={false}, the corner X keeps the Close label and shows a tooltip with the Esc key; the lock is a toggle button with aria-pressed, named Lock window position.
- Unlocked, the top edge is a Move window button after the corner buttons in the Tab order: the arrow keys move the window by 16 px, and by 64 px with Shift.

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

const DataCard = ({ onClose }: { onClose: () => void }) => (
  <ScreenWindow title="Data" icon={<Icon name="layers" />} titleRow={false} onClose={onClose}>
    <ScrollArea>Data pages</ScrollArea>
  </ScreenWindow>
);
```

## Props

- `title`: `ReactNode`.
- `onClose`: `() => void`.
- `back` (optional): `BackAction`.
- `children`: `ReactNode`.
- `header` (optional): `ScreenWindowHeader`.
- `titleRow` (optional): `boolean`.
- `icon` (optional): `ReactNode`.
- `cornerTitle` (optional): `boolean`.
- `movable` (optional): `boolean`.
- `locked` (optional): `boolean`.
- `defaultLocked` (optional): `boolean`.
- `onLockChange` (optional): `(locked: boolean) => void`.
- `defaultRect` (optional): `Rect`.
- `onRectChange` (optional): `(rect: Rect) => void`.
- `minSize` (optional): `Size`.
- `storageKey` (optional): `string`.
- `subtitle` (optional): `ReactNode`.
- `extra` (optional): `ReactNode`.
- `floating` (optional): `ReactNode`.
- `hidden` (optional): `boolean`.
- `size` (optional): `ScreenLayerSize`, one of `'fill'`, `'compact'`, `'info'`.
- `square` (optional): `boolean`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border-strong`, `--c-layer`, `--c-primary`, `--c-text`, `--c-text-dim`, `--c-text-muted`, `--collapse-toggle-d`, `--control-h-md`, `--duration-slow`, `--ease-in-out`, `--radius-pill`, `--shadow-lg`, `--size-1`, `--size-14`, `--size-2`, `--size-224`, `--space-2xs`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xl`, `--space-xs`, `--text-xl`, `--text-xs`, `--weight-medium`.
