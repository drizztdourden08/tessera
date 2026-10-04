# ItemCard

One item of a catalogue as a card: media, a small line above the title, a status, the title, tags, details and its actions.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ItemCard } from '@drizztdourden08/tessera';
```

The source is `src/composites/ItemCard/ItemCard.tsx`. Its gallery page is Composites · Content/ItemCard (`#/story/composites-itemcard--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? Items of a catalogue, as cards.

ItemCard gives every catalogue the same card, with its media, facts and actions in fixed places.

## Use it when

- A screen lists things to browse and pick from as a grid of cards, such as games in a store, mods or saves.
- An overview shows a few areas side by side, each with a figure, a short summary and an action, with the media on the left.

## Use something else when

- A box of content under a header row with its own actions. Use `Card` instead.
- Many items read as one line each, in a list. Use `ListItemRow` instead.
- One headline number with its change and a small chart. Use [StatTile](StatTile.md) instead.

## Rules

- Keep the title to the name of the item, and put the source or the kind in eyebrow, such as Official.
- Write details as short facts, such as World 1.2.0 and For AP 0.6.7; they join with dots and stop at three lines.
- Give the main action kind primary; one other shows and the rest fold under More, danger ones asking first.
- Pass onOpen or href when the card opens a page of its own, and selected for the item open beside the list.

## Accessibility

- The title is a heading, level 3 by default, so a screen reader can jump from card to card.
- With onOpen or href the title is the one button or link of the card; a click anywhere on the card goes through it, and the focus ring circles the card.
- The selected card marks its title with aria-current; the media is hidden from screen readers.

## Example

```tsx
import { ItemCard } from '@drizztdourden08/tessera';
import { Icon, Tag } from '@drizztdourden08/tessera';

interface GameCardProps {
  name: string;
  genre: string;
  version: string;
  onInstall: () => void;
  onOpen: () => void;
}

const GameCard = ({ name, genre, version, onInstall, onOpen }: GameCardProps) => (
  <ItemCard
    media={<Icon name="gamepad-2" size={40} />}
    eyebrow="Official"
    title={name}
    status={{ label: 'stable', tone: 'info' }}
    tags={[<Tag key="genre" variant="category" color="violet">{genre}</Tag>]}
    details={[`World ${version}`, 'For AP 0.6.7']}
    actions={[{ id: 'install', label: 'Install', icon: 'download', kind: 'primary', onSelect: onInstall }]}
    onOpen={onOpen}
  />
);
```

## Props

- `title`: `ReactNode`.
- `eyebrow` (optional): `ReactNode`.
- `status` (optional): `ItemCardStatus`.
- `tags` (optional): `readonly ReactNode[]`.
- `details` (optional): `readonly ReactNode[]`.
- `media` (optional): `ReactNode`.
- `mediaTone` (optional): `ItemCardMediaTone`, one of `'neutral'`, `'primary'`, `'info'`, `'success'`, `'warning'`, `'danger'`. Default `'primary'`.
- `layout` (optional): `ItemCardLayout`, one of `'top'`, `'left'`. Default `'top'`.
- `href` (optional): `string`.
- `actions` (optional): `readonly ActionItem[]`.
- `selected` (optional): `boolean`.
- `onOpen` (optional): `() => void`.
- `level` (optional): `HeadingLevel`, one of `1`, `2`, `3`, `4`, `5`, `6`. Default `3`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border-strong`, `--c-danger-dim`, `--c-hover`, `--c-info-dim`, `--c-primary`, `--c-primary-bright`, `--c-primary-dim`, `--c-success-dim`, `--c-sunken`, `--c-text`, `--c-text-dim`, `--c-warning-dim`, `--font-sans`, `--size-96`, `--space-md`, `--space-sm`, `--space-xs`, `--text-lg`, `--text-xs`, `--tracking-normal`, `--weight-semi`.
