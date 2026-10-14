# MediaViewer

Opens a picture or a video large over the page in a dialog, with zoom by steps, a Fit and actual size switch, dragging to look around, and arrows through a set.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { MediaViewer } from '@drizztdourden08/tessera';
```

The source is `src/composites/MediaViewer/MediaViewer.tsx`. Its gallery page is Composites · Dialogs/MediaViewer (`#/story/composites-mediaviewer--overview`).

## Where the questions lead here

What are you placing? Something over the page. What sits over the page? A picture or a video opened large, with zoom.

MediaViewer opens a picture or a video large in a dialog, with zoom, dragging and arrows through a set.

## Use it when

- A small picture of a file, a store item or a save opens large when the user presses it or an Expand button.
- A sprite or a sprite sheet is looked at closely, pixel by pixel.

## Use something else when

- The picture stays in the page. Use `Image` instead.
- The video stays in the page, with theatre mode and full screen. Use [Video](Video.md) instead.
- Slides turn in the page itself. Use [Carousel](Carousel.md) instead.

## Rules

- Pass items as id, kind image or video, src and name; the name is the title of the dialog.
- Pass index and onIndexChange, or defaultIndex, to open on the item the user pressed.
- Draw the small picture with Expand as a recipe: an Image in a Pressable and a Button that set open.
- Pass startAt in seconds when a small video preview was playing, so the large one starts where it stopped.
- Leave pixelated on auto: pictures of 256 pixels or less on their longest side stay sharp; pass true or false to force it.

## Accessibility

- It is a DialogShell named by the item name: Escape and the close button close it, and focus goes back to what opened it.
- The zoom buttons, the minus and plus keys, and 0 for Fit work from anywhere in the dialog; the Left and Right keys move through a set.
- The place in a set, such as 2 of 6, is a polite live region.

## Example

```tsx
import { useState } from 'react';
import { MediaViewer } from '@drizztdourden08/tessera';
import type { MediaViewerItem } from '@drizztdourden08/tessera';

const Screenshots = ({ shots }: { shots: readonly MediaViewerItem[] }) => {
  const [opened, setOpened] = useState<number | null>(null);
  return (
    <>
      {shots.map((shot, i) => <button key={shot.id} type="button" onClick={() => setOpened(i)}>{shot.name}</button>)}
      <MediaViewer open={opened !== null} items={shots} index={opened ?? 0} onIndexChange={setOpened} onClose={() => setOpened(null)} />
    </>
  );
};
```

## Props

- `open`: `boolean`.
- `items`: `readonly MediaViewerItem[]`.
- `index` (optional): `number`.
- `defaultIndex` (optional): `number`. Default `0`.
- `onIndexChange` (optional): `(index: number) => void`.
- `startAt` (optional): `number`. Default `0`.
- `pixelated` (optional): `MediaViewerPixels`, one of `'auto'`, `false`, `true`. Default `'auto'`.
- `onClose`: `() => void`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-sunken`, `--radius-md`, `--size-64`, `--space-2xl`, `--space-md`, `--space-sm`.
