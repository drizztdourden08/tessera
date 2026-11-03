# PixelThumbnail

A small square that draws a pixel picture crisp, from RGBA bytes or palette pixels, with a checker behind clear pixels.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { PixelThumbnail } from '@drizztdourden08/tessera';
```

The source is `src/primitives/PixelThumbnail/PixelThumbnail.tsx`. Its gallery page is Primitives · Display/PixelThumbnail (`#/story/primitives-pixelthumbnail--overview`).

## A building block

No question in [decide.md](../decide.md) leads here. Other components are built on it.

## Use it when

- A row, tile or drag ghost needs a preview of a sprite, a layer or a frame, drawn from data in memory.
- A live picture changes often and the preview must redraw at a calm pace, or only when it scrolls into view.

## Use something else when

- The picture is a file or a URL, not pixels in memory. Use `Image` instead.
- The caller draws into the canvas itself and needs no box, fit or checker. Use `Canvas` instead.

## Rules

- Pass `image` or `indexed`, not both; `null` clears the box and keeps the checker.
- Pick `box` from the size tokens, 16 to 256 px; `step` scales up in whole numbers, `contain` takes any scale.
- Pass `box="fluid"` to fill the width of the container as a square, so a diff view grows with its panel and stays crisp.
- Palette colours in `indexed` are `#rgb` or `#rrggbb`; the `transparent` index draws clear.
- Keep `frames` stable between renders, or the loop restarts; `playing` loops them and reduced motion shows frame 0.
- Use `lazy` for long lists and `throttleMs` for a live source; dim a hidden layer with a class from the caller.

## Accessibility

- It is hidden from screen readers and not focusable, since the row or tile that holds it carries the name.
- With a `label` it becomes an image with that name.
- High contrast draws a border in the system text colour, so the box stays visible.

## Example

```tsx
import { PixelThumbnail } from '@drizztdourden08/tessera';
import type { RgbaImage } from '@drizztdourden08/tessera';

const LayerThumb = ({ picture }: { picture: RgbaImage | null }) => (
  <PixelThumbnail image={picture} box={24} throttleMs={80} lazy />
);
```

## Props

- `image` (optional): `RgbaImage | null`. Default `null`.
- `indexed` (optional): `IndexedImage`.
- `box` (optional): `PixelThumbnailBox`, one of `16`, `24`, `32`, `40`, `48`, `64`, `96`, `128`, `192`, `256`, `'fluid'`. Default `DEFAULT_BOX`.
- `fit` (optional): `PixelThumbnailFit`, one of `'step'`, `'contain'`. Default `'step'`.
- `backdrop` (optional): `PixelThumbnailBackdrop`, one of `'checker'`, `'none'`. Default `'checker'`.
- `lazy` (optional): `boolean`. Default `false`.
- `throttleMs` (optional): `number`. Default `0`.
- `frames` (optional): `readonly PixelThumbnailFrame[]`.
- `playing` (optional): `boolean`. Default `false`.
- `label` (optional): `string`.
- `ref` (optional): `Ref<HTMLCanvasElement>`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-checker-a`, `--c-checker-b`, `--checker-size`, `--size-1`, `--size-128`, `--size-16`, `--size-192`, `--size-24`, `--size-256`, `--size-32`, `--size-40`, `--size-48`, `--size-64`, `--size-96`.
