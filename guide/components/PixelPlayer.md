# PixelPlayer

Plays a pixel animation inline, with a whole-number zoom, a control bar, frame ranges and keys; one frame shows as a still.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { PixelPlayer } from '@drizztdourden08/tessera';
```

The source is `src/composites/PixelPlayer/PixelPlayer.tsx`. Its gallery page is Composites · Content/PixelPlayer (`#/story/composites-pixelplayer--overview`).

## A building block

No question in [decide.md](../decide.md) leads here. Other components are built on it.

## Use it when

- A preview pane shows the picked sprite or animation and the reader needs to play, pause and step through it.
- A sheet preview needs outlines on hover over named cells, with the cell reported to the host.

## Use something else when

- A small fixed square in a row or tile, with no controls. Use [PixelThumbnail](PixelThumbnail.md) instead.
- The source is a video file, not frames in memory. Use [Video](Video.md) instead.

## Rules

- Pass `frames` with a duration for each; one frame is a still with no bar and no counter.
- `zoom="fit"` picks the largest whole number that fits the stage, never below 1; the stage height follows the `--pixel-player-stage` property.
- Give `tags` to limit play to one named range; pass `tagId` and `onTagChange` to control which one.
- `loop.direction` is `forward`, `reverse`, `pingpong` or `pingpongReverse`; the last starts on the final frame going backward, then bounces.
- `loop.repeat` of 0 runs forever; with a count, Play becomes Replay when the loop ends.
- `mode="compact"` hides the bar and the counter; keep `frames` stable between renders so playback does not restart.

## Accessibility

- The stage is one tab stop: Space plays and pauses, Left and Right step, Home and End jump.
- The picture is an image with the `label`; the controls are a named group of labelled buttons.
- The counter is a status that is read when a step changes it, not on every tick of playback.
- Reduced motion never starts playback by itself; Play still works. A hidden page stops playback.

## Example

```tsx
import { PixelPlayer } from '@drizztdourden08/tessera';
import type { PixelThumbnailFrame } from '@drizztdourden08/tessera';

const SpritePreview = ({ frames }: { frames: readonly PixelThumbnailFrame[] }) => (
  <PixelPlayer label="Walk cycle" frames={frames} loop={{ direction: 'pingpong', repeat: 0 }} />
);
```

## Props

- `frames`: `readonly PixelThumbnailFrame[]`.
- `label`: `string`.
- `mode` (optional): `PixelPlayerMode`, one of `'compact'`, `'large'`. Default `'large'`.
- `zoom` (optional): `PixelPlayerZoom`. Default `'fit'`.
- `backdrop` (optional): `PixelPlayerBackdrop`, one of `'checker'`, `'none'`. Default `'checker'`.
- `loop` (optional): `PixelPlayerLoop`.
- `speeds` (optional): `readonly number[]`.
- `tags` (optional): `readonly PixelPlayerTag[]`.
- `tagId` (optional): `string | null`.
- `onTagChange` (optional): `(id: string | null) => void`.
- `cells` (optional): `readonly PixelPlayerCell[]`. Default `NO_CELLS`.
- `onCellHover` (optional): `(id: string | null) => void`.
- `controls` (optional): `boolean`. Default `true`.
- `autoPlay` (optional): `boolean`.
- `placeholder` (optional): `ReactNode`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--c-checker-a`, `--c-checker-b`, `--c-focus`, `--c-primary`, `--c-sunken`, `--c-surface`, `--c-text-dim`, `--checker-size`, `--radius-sm`, `--size-128`, `--size-256`, `--space-sm`, `--space-xs`.
