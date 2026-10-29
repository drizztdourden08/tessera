# ScrollArea

A box that scrolls its content, with a styled scrollbar, such as a changelog, a list of cards or a pane body.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { ScrollArea } from '@drizztdourden08/tessera';
```

The source is `src/primitives/ScrollArea/ScrollArea.tsx`. Its gallery page is Primitives · Layout/ScrollArea (`#/story/primitives-scrollarea--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? Content that scrolls.

ScrollArea scrolls content that can outgrow its box and keeps the slim scrollbar clear of the content.

## Use it when

- Content can grow past a fixed height or width, such as a changelog or a grid of cards.
- Two boxes must scroll together, through scrollTo and onScroll.

## Use something else when

- The content always fits and nothing needs to scroll. Use [Box](Box.md) instead.
- The list is long enough that every row must not be drawn at once. Use [VirtualGrid](VirtualGrid.md) instead.

## Rules

- Axis picks y, x or both; the other direction is clipped. It defaults to y.
- Scrollbar slim draws a thin line along the edge that widens under the pointer; native keeps the browser bar.
- Thumb auto, on a slim area, hides the line at rest and shows it under the pointer, while it scrolls and a moment after, and while focus is inside. It defaults to always.
- A slim area reserves its own gutter on the inline end, so opaque children such as cards never cover the line.
- Set fade to false when the edges of the content must not melt away.
- Gutter stable keeps room for a native scrollbar even when nothing overflows. Set it on a page body whose content reflows with width, such as a Grid with fit or minColWidth or a responsive RowGrid, so the scrollbar cannot come and go and flip the layout. It defaults to auto, which takes no room until the content overflows.
- Give the box a height, through a class or its parent, or it grows with its content and never scrolls.

## Accessibility

- The box is a plain div and keeps the reading order of its children.
- Pass tabIndex 0 and a label when the content has nothing focusable, so a keyboard can scroll it.

## Example

```tsx
import type { ReactNode } from 'react';
import { Grid, ScrollArea } from '@drizztdourden08/tessera';

const Library = ({ cards }: { cards: ReactNode[] }) => (
  <ScrollArea scrollbar="slim" className="library">
    <Grid minColWidth={224} gap="sm">
      {cards}
    </Grid>
  </ScrollArea>
);
```

## Props

- `axis` (optional): `ScrollAxis`, one of `'y'`, `'x'`, `'both'`. Default `'y'`.
- `fade` (optional): `boolean`. Default `true`.
- `scrollbar` (optional): `ScrollAreaScrollbar`, one of `'native'`, `'slim'`. Default `'native'`.
- `thumb` (optional): `ScrollAreaThumb`, one of `'always'`, `'auto'`.
- `gutter` (optional): `ScrollAreaGutter`, one of `'auto'`, `'stable'`. Default `'auto'`.
- `onScroll` (optional): `(position: ScrollPosition) => void`.
- `scrollTo` (optional): `Partial<ScrollPosition>`.

It also takes the 279 attributes it inherits through `Omit<ComponentPropsWithRef<'div'>, 'onScroll'>`.

## Tokens

It draws on `--c-bg`, `--c-border`, `--c-primary`, `--c-text-muted`, `--radius-sm`, `--scroll-thumb-x-fraction`, `--scroll-thumb-x-progress`, `--scroll-thumb-y-fraction`, `--scroll-thumb-y-progress`, `--scrollbar-size`, `--scrollbar-slim`, `--scrollbar-slim-active`, `--scrollbar-slim-gutter`, `--scrollbar-slim-rest`, `--size-16`, `--size-2`, `--size-24`, `--size-4`, `--transition-fast`.

## Also exported from this folder

`createScrollSyncController`.
