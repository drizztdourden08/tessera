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
- Write details as short facts, such as World 1.2.0 and For AP 0.6.7; they join with dots and stop at three lines. Pass nodes too, such as a Tooltip around a status.
- Give the main action kind primary; one other shows and the rest fold under More, danger ones asking first unless confirm is false.
- Pass onOpen or href when the card opens a page of its own, and selected for the item open beside the list.
- With href, pass navigate to route a plain click inside the app, as Link and SiteHeader take it.
- Set mediaHeight auto when the media is a picture taller than the 96 px band, such as a 16 by 9 cover.
- Set density compact for a long catalogue with no pictures: one row of about 56 px with the media as a 32 px tile, the title, one line and up to three icon actions.
- Compact shows tags on a line of their own under the details, cut with a +N tag when they do not fit; give that row about 76 px.
- In compact the details stay on one line and cut with an ellipsis, a Tooltip inside them still opens.
- Set nameSuffix on each action of a row, such as the item name, so every Remove button has its own name.
- Set confirm false on a danger action when the app asks with its own dialog; the card then does not ask first.
- Set mediaSize sm to swap the 96 px band for a 32 px tile beside the title; compact does this itself.
- In a VirtualList row, give the list a rowHeight of about 56 px (76 px with tags); the compact card fills the row width and sets no height of its own.

## Accessibility

- The title is a heading, level 3 by default, so a screen reader can jump from card to card.
- With onOpen or href the title is the one button or link of the card; a click anywhere on the card goes through it, and the focus ring circles the card.
- Compact actions are icon buttons whose label is their accessible name and their tooltip; give each action an icon.
- The selected card marks its title with aria-current; the media is hidden from screen readers unless mediaLabel names it.
- An action with nameSuffix reads as its label and the suffix, such as Remove Hollow Knight, in the button and its tooltip.

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
- `details` (optional): `ReactNode | readonly ReactNode[]`.
- `media` (optional): `ReactNode`.
- `mediaLabel` (optional): `string`.
- `mediaTone` (optional): `ItemCardMediaTone`, one of `'neutral'`, `'primary'`, `'info'`, `'tertiary'`, `'success'`, `'warning'`, `'danger'`.
- `mediaHeight` (optional): `ItemCardMediaHeight`, one of `'band'`, `'auto'`.
- `mediaSize` (optional): `ItemCardMediaSize`, one of `'band'`, `'sm'`.
- `density` (optional): `ItemCardDensity`, one of `'normal'`, `'compact'`.
- `layout` (optional): `ItemCardLayout`, one of `'top'`, `'left'`. Default `'top'`.
- `href` (optional): `string`.
- `navigate` (optional): `(href: string) => void`.
- `actions` (optional): `readonly ActionItem[]`.
- `selected` (optional): `boolean`.
- `onOpen` (optional): `() => void`.
- `level` (optional): `HeadingLevel`, one of `1`, `2`, `3`, `4`, `5`, `6`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border-strong`, `--c-danger-dim`, `--c-focus`, `--c-hover`, `--c-info-dim`, `--c-primary`, `--c-primary-bright`, `--c-primary-dim`, `--c-success-dim`, `--c-sunken`, `--c-tertiary-dim`, `--c-text`, `--c-text-dim`, `--c-warning-dim`, `--font-sans`, `--radius-sm`, `--size-32`, `--size-96`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-base`, `--text-lg`, `--text-xs`, `--tracking-normal`, `--weight-semi`.
