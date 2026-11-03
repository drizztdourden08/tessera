# MediaGrid

A grid of picture thumbnails, each with a caption and a small tag for where it came from, that opens a picture when one is clicked.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { MediaGrid } from '@drizztdourden08/tessera';
```

The source is `src/composites/MediaGrid/MediaGrid.tsx`. Its gallery page is Composites · Content/MediaGrid (`#/story/composites-mediagrid--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A picture or a video. Which one? A small framed picture.

MediaGrid shows many pictures as thumbnails that each open large, in the same way in every app.

## Use it when

- The user browses the pictures of a record or of a whole project and opens one large.
- Each picture needs a caption and a source, such as the item it was attached to.

## Use something else when

- One picture opens large from a small preview inside a form or a file pane. Use [MediaViewer](MediaViewer.md) instead.
- One slide at a time is shown, with dots or arrows. Use [Carousel](Carousel.md) instead.
- The pictures are catalogue items with a price, a rating or actions. Use [ItemCard](ItemCard.md) instead.

## Rules

- Pass items as src, caption and source; source is optional and draws as a small tag under the caption.
- OnOpen gets the index of the clicked thumbnail; open MediaViewer at that index with the same pictures to give zoom and arrows.
- Leave columns out to fit as many 160 pixel columns as the width allows; pass columns for a fixed count.
- Pass empty to draw something, such as an EmptyState, when items is empty; without it nothing is drawn.
- A thumbnail shows a placeholder while it loads and a broken picture mark when its src fails, and stays clickable.
- Pass aria-label to name the list for a screen reader.

## Accessibility

- The grid is a list and each thumbnail is a button named Open with its caption.
- The thumbnails are in the tab order and show a focus ring.

## Example

```tsx
import { useState } from 'react';
import { MediaGrid, MediaViewer } from '@drizztdourden08/tessera';

const MediaTab = ({ shots }: { shots: { id: string; url: string; name: string; item: string }[] }) => {
  const [opened, setOpened] = useState<number | null>(null);
  return (
    <>
      <MediaGrid items={shots.map((shot) => ({ src: shot.url, caption: shot.name, source: shot.item }))} onOpen={setOpened} />
      <MediaViewer
        open={opened !== null}
        items={shots.map((shot) => ({ id: shot.id, kind: 'image', src: shot.url, name: shot.name }))}
        index={opened ?? 0}
        onIndexChange={setOpened}
        onClose={() => setOpened(null)}
      />
    </>
  );
};
```

## Props

- `items`: `readonly MediaGridItem[]`.
- `onOpen`: `(index: number) => void`.
- `columns` (optional): `number`.
- `empty` (optional): `ReactNode`.
- `className` (optional): `string`.
- `aria-label` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-primary`, `--c-sunken`, `--radius-md`, `--space-xs`.
