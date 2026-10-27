# SeatCard

One seat of a lobby: who sits there with a name, a meta line and actions, an open seat, a seat that needs the user, or a dashed card that adds a seat.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { SeatCard } from '@drizztdourden08/tessera';
```

The source is `src/composites/SeatCard/SeatCard.tsx`. Its gallery page is Composites · Content/SeatCard (`#/story/composites-seatcard--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? The seats of a lobby, taken, open or to add.

SeatCard gives every lobby the same four seats, with who sits there, the open seat and the add button in fixed places.

## Use it when

- A screen shows the places of a session as a game lobby, such as the agents of a project, the players of a match or the seats of a table.
- Some places are taken, some are open, and the user adds one more from the same grid.
- One taken seat needs the user, such as an agent waiting for an answer, and must stand out from the rest.

## Use something else when

- Items of a catalogue the user browses, with media, tags and details. Use [ItemCard](ItemCard.md) instead.
- Many items read as one line each, in a list. Use `ListItemRow` instead.
- A box of content under a header row with its own actions. Use `Card` instead.

## Rules

- Set state to filled, attention, empty or add. Put the cards in a SeatGrid so they share one size and wrap.
- A filled seat takes name and, optionally, lead (an avatar, an icon or any node), meta (one short line) and actions.
- Pass onSelect to a filled seat when it opens something; the name becomes the one button of the card and a click anywhere on the card goes through it.
- Use attention for a filled seat that waits on the user, and give reason a short phrase, such as Waiting for your answer. The colour is never the only signal.
- An empty seat takes label, such as Seat 3, and a short hint, such as Invite a player. It is quiet and not clickable.
- The add seat is a dashed button. Its label names what it adds, such as Add an agent, and onSelect only asks: the app adds the seat.
- Give a filled seat at most one or two actions; more fold under More, danger ones asking first.

## Accessibility

- The name of a filled seat is a heading, level 3 by default, so a screen reader can jump from seat to seat.
- With onSelect the name is the one button of the card, and the focus ring circles the card.
- The add seat is a real button named by its label, a tab stop with a focus ring.
- An attention seat says why in text with the reason, so it is heard and seen.

## Example

```tsx
import { SeatCard, SeatGrid } from '@drizztdourden08/tessera';

interface LobbyProps {
  addSeat: () => void;
  openAgent: () => void;
}

const Lobby = ({ addSeat, openAgent }: LobbyProps) => (
  <SeatGrid label="Agents of the project">
    <SeatCard state="filled" name="Planner" meta="Opus, 12 min" onSelect={openAgent} />
    <SeatCard state="attention" name="Builder" meta="Sonnet, 3 min" reason="Waiting for your answer" onSelect={openAgent} />
    <SeatCard state="empty" label="Seat 3" hint="Add an agent to fill it" />
    <SeatCard state="add" label="Add a seat" onSelect={addSeat} />
  </SeatGrid>
);
```

## Props

- `state`: `'filled' | 'attention' | 'empty' | 'add'`.
- `className` (optional): `string`.
- `name` (optional): `ReactNode`.
- `lead` (optional): `ReactNode`.
- `meta` (optional): `ReactNode`.
- `reason` (optional): `string`.
- `actions` (optional): `readonly ActionItem[]`.
- `onSelect` (optional): `() => void`.
- `level` (optional): `HeadingLevel`, one of `1`, `2`, `3`, `4`, `5`, `6`.
- `label` (optional): `ReactNode`.
- `hint` (optional): `ReactNode`.
- `disabled` (optional): `boolean`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border-strong`, `--c-focus`, `--c-inset`, `--c-primary`, `--c-primary-bright`, `--c-text`, `--c-text-muted`, `--c-warning-bright`, `--c-warning-dim`, `--font-sans`, `--opacity-muted`, `--radius-lg`, `--size-96`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-lg`, `--text-sm`, `--text-xs`, `--tracking-normal`, `--transition-normal`, `--weight-semi`.
