# ActionTile

A tile with one headline value that also does one thing: runs an action, copies a text, or leads to the full view.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ActionTile } from '@drizztdourden08/tessera';
```

The source is `src/composites/ActionTile/ActionTile.tsx`. Its gallery page is Composites · Content/ActionTile (`#/story/composites-actiontile--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A headline number that does one thing.

ActionTile reads like a StatTile and adds one action, tools and a way to the full view, laid out the same in every app.

## Use it when

- A dashboard row sums up a session or a store, and each tile has one obvious next step, such as Stop, Copy address or Clean old runs.
- A tile stands for a larger view, such as a widget or a page, and the user should reach it from the tile.
- A data domain has its own folder, and the tile should open it beside its main action.

## Use something else when

- The tile only reads a value, with its trend, its change or a small chart. Use [StatTile](StatTile.md) instead.
- A label and its value sit on one row in a list of readings. Use `StatRow` instead.
- The item has several actions of equal weight, such as Edit, Duplicate and Delete. Use [ActionBar](ActionBar.md) instead.

## Rules

- Give each tile one action at most; put small extras, such as open the folder or copy the path, in tools.
- Name the action after what it does to the value, such as Clean old runs or Copy address, not OK or Go.
- Use the danger tone for an action that stops or deletes, and primary for the one action the row is about.
- Pass onOpen when the tile sums up a view, with openLabel naming that view, such as Show the Players widget.
- Write the label in sentence case; it shows as written, at 12 px.

## Accessibility

- The tile is a group named by its label, so its buttons are heard with the name of the tile.
- Tools and the open chevron are icon buttons named by their label, with the same name as a tooltip.
- A copy action or tool confirms with Copied in a polite status region.

## Example

```tsx
import { ActionTile } from '@drizztdourden08/tessera';

const SessionTiles = ({ address, onShowPlayers, onStop }: { address: string; onShowPlayers: () => void; onStop: () => void }) => (
  <>
    <ActionTile label="Players" icon="users" value="2 / 3" unit="connected" onOpen={onShowPlayers} openLabel="Show the Players widget" />
    <ActionTile label="Address" icon="link" value={address} action={{ label: 'Copy address', copy: address }} />
    <ActionTile
      label="Uptime"
      icon="clock"
      value="42 min"
      status={{ label: 'hosting', tone: 'success' }}
      action={{ label: 'Stop', icon: 'square', tone: 'danger', onSelect: onStop }}
    />
  </>
);
```

## Props

- `label`: `ReactNode`.
- `value`: `ReactNode`.
- `unit` (optional): `ReactNode`.
- `meta` (optional): `ReactNode`.
- `icon` (optional): `IconName`.
- `status` (optional): `ActionTileStatus`.
- `tone` (optional): `StatusTone`, one of `'neutral'`, `'success'`, `'warning'`, `'danger'`, `'info'`, `'primary'`, `'secondary'`, `'tertiary'`.
- `action` (optional): `ActionTileAction`.
- `tools` (optional): `readonly ActionTileTool[]`. Default `[]`.
- `onOpen` (optional): `() => void`.
- `openLabel` (optional): `string`.
- `size` (optional): `ActionTileSize`, one of `'sm'`, `'md'`. Default `'md'`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-inset`, `--c-text`, `--c-text-muted`, `--radius-md`, `--size-20`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-lg`, `--text-sm`, `--text-xl`, `--text-xs`, `--weight-semi`.
