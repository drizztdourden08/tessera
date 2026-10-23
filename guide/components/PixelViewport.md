# PixelViewport

Shows a pixel image on a canvas that the user zooms and pans, with crisp pixels at any zoom and screen density, a checkerboard behind transparent pixels and a pixel grid when zoomed in.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { PixelViewport } from '@drizztdourden08/tessera';
```

The source is `src/composites/PixelViewport/PixelViewport.tsx`. Its gallery page is Composites · Content/PixelViewport (`#/story/composites-pixelviewport--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A drawing. How is it drawn? Pixel art the user zooms and pans.

PixelViewport shows a pixel image the user zooms and pans; the app paints the pixels and the viewport owns the view.

## Use it when

- A pixel art editor shows the sprite being drawn, and the app paints pixels while the viewport owns the zoom and the pan.
- A sprite, a tile set or a texture is inspected pixel by pixel, inside the page, not in a dialog.

## Use something else when

- A picture opens large over the page, with zoom and arrows through a set. Use [MediaViewer](MediaViewer.md) instead.
- The picture stays in the page at a fixed size. Use `Image` instead.
- A plain drawing surface with no zoom or pan, such as a chart. Use `Canvas` instead.

## Rules

- Pass width and height in image pixels, and either draw or source. The viewport owns the view only; the app owns the pixels.
- Draw(ctx, view) is called on each frame that needs paint, with the transform set, so one unit is one image pixel. Keep draw stable with useCallback, or call redraw on the ref when the pixels change.
- Source takes an ImageData, an ImageBitmap, an image or a canvas and is painted at the origin; a new source repaints on its own, and redraw repaints after the same ImageData changed in place.
- The wheel zooms around the pointer by default; wheel="pan" makes it scroll instead, with Ctrl or a pinch to zoom. Shift turns a scroll sideways.
- Zoom steps are whole factors from 1 to 64 by default, set by zoomSteps; below 1 it halves down to the fit, and the fit is a whole factor when the image fits once or more.
- Leave zoom and pan out to fit the image on mount, or pass them with onZoomChange and onPanChange to drive them. pan is the image point at the centre of the view.
- OnPointerPixel reports the image pixel under the pointer, or null outside the image, for a StatusBar readout.
- The ref gives screenToPixel and pixelToScreen in client coordinates, fit, setZoom with an optional anchor, zoomIn, zoomOut, redraw and view.
- Pointer handlers passed in get every press the viewport does not take for a pan, so the app paints with the main button.

## Accessibility

- The viewport is one Tab stop, an application region named by label.
- The plus and minus keys zoom around the centre, 0 fits, 1 shows 100%, the arrow keys pan by a step and Shift with an arrow pans four steps.
- Hold Space and drag with the main button, or drag with the middle button, to pan.
- The zoom level is announced in a polite live region once the zoom settles, only while focus is inside.
- Zoom changes at once, with no animation, so reduced motion needs nothing more.

## Example

```tsx
import { useCallback, useRef, useState } from 'react';
import { Button, PixelViewport, Text } from '@drizztdourden08/tessera';
import type { PixelPoint, PixelViewportHandle } from '@drizztdourden08/tessera';

const SpriteCanvas = ({ layers }: { layers: readonly ImageBitmap[] }) => {
  const viewport = useRef<PixelViewportHandle>(null);
  const [at, setAt] = useState<PixelPoint | null>(null);
  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    layers.forEach((layer) => ctx.drawImage(layer, 0, 0));
  }, [layers]);
  return (
    <>
      <PixelViewport ref={viewport} label="Sprite" width={32} height={32} draw={draw} onPointerPixel={setAt} />
      <Text>{at ? at.x + ', ' + at.y : 'Outside the sprite'}</Text>
      <Button onClick={() => viewport.current?.fit()}>Fit</Button>
    </>
  );
};
```

## Props

- `width`: `number`.
- `height`: `number`.
- `label`: `string`.
- `draw` (optional): `PixelDraw`.
- `source` (optional): `PixelSource`.
- `zoom` (optional): `number`.
- `onZoomChange` (optional): `(zoom: number) => void`.
- `pan` (optional): `PixelPoint`.
- `onPanChange` (optional): `(pan: PixelPoint) => void`.
- `zoomSteps` (optional): `readonly number[]`.
- `grid` (optional): `boolean`.
- `gridFrom` (optional): `number`.
- `wheel` (optional): `PixelWheel`, one of `'zoom'`, `'pan'`.
- `onPointerPixel` (optional): `(pixel: PixelPoint | null) => void`.
- `onPointerDown` (optional): `PointerEventHandler<HTMLElement>`.
- `onPointerMove` (optional): `PointerEventHandler<HTMLElement>`.
- `onPointerUp` (optional): `PointerEventHandler<HTMLElement>`.
- `onPointerLeave` (optional): `PointerEventHandler<HTMLElement>`.
- `onKeyDown` (optional): `KeyboardEventHandler<HTMLElement>`.
- `className` (optional): `string`.
- `ref` (optional): `Ref<PixelViewportHandle>`.

## Tokens

It draws on `--border-width-thick`, `--c-primary`, `--c-sunken`, `--radius-md`, `--size-1`, `--size-128`.
