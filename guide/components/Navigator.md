# Navigator

A small map of a large surface, such as a canvas or a long timeline, with a frame that marks the visible part and that the user drags to move the view.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { Navigator } from '@drizztdourden08/tessera';
```

The source is `src/composites/Navigator/Navigator.tsx`. Its gallery page is Composites · Navigation/Navigator (`#/story/composites-navigator--overview`).

## Where the questions lead here

What are you placing? Navigation. Where does the user go? Around a large surface, from a small map of it.

Navigator draws any large surface as a small map with a frame the user drags, the same way in every editor.

## Use it when

- The user pans a surface much larger than the screen, such as a pixel canvas, a node graph or a tilemap, and needs to see where the view sits.
- The user should jump to a far corner of a zoomed surface in one press.

## Use something else when

- One value moves along one line. Use `Slider` instead.
- The page scrolls and the user needs to know where they are in it. Use [SectionTimeline](SectionTimeline.md) instead.
- The user drags a box to select items on a surface. Use [MarqueeBox](MarqueeBox.md) instead.

## Rules

- Surface is the size of the whole surface and viewport is the visible rectangle, in the same units. The app owns viewport.
- OnViewportChange gets the new rectangle while the user drags, so the surface follows the frame at once.
- Press anywhere on the map to centre the frame there; the drag then goes on from that point.
- Pass the thumbnail as children, such as an Image or a canvas. It fills the map and takes no pointer events.
- Step is the distance of one arrow key press in surface units; the default is a twentieth of the larger side. Shift multiplies it by five.
- Pass step as { x, y } to give each axis its own distance, such as a tenth of the view width on x and a tenth of the view height on y; a single number still moves both axes.
- BigStep is the distance of one Shift plus arrow key press in surface units, a number or { x, y }; the default is step times five on each axis.
- Set unclamped to let the frame be dragged and moved past the edge of the surface, so that a quarter of it always stays over the surface.
- Pass overlays, a list of { id, rect, kind, label, interactive }, to mark parts of the surface on the map: rect is in surface units, kind is selection, view or region, and each mark is clipped to the surface and drawn at least one pixel wide.
- Overlays are hidden from screen readers; give label as the hover title of an interactive mark, and describe the marks in the describe line.
- Pass onOverlayPress(id) to make marks with interactive set press targets; a press on one does not move the frame.
- Pass onWheelZoom(direction, at, deltaY) to zoom from the wheel over the map; direction is 1 to zoom in and -1 to zoom out, at is the point under the pointer in surface units, deltaY is the size of the wheel turn so a trackpad can zoom smoothly, and the page does not scroll.
- Pass onKey(event) to handle a key first, such as Plus and Minus for zoom; return true when you handled it and the frame arrows leave it alone.
- Pass empty, a node, to draw it in place of the map while the surface has no size.
- Pass caption, a node, to draw a line of muted text under the map.
- Pass describe, a short text, to add a line that a screen reader reads with the frame; it is hidden from sight.
- The width of the map comes from a class or its parent; its height follows the shape of the surface.

## Accessibility

- The frame is a slider with one Tab stop, named Map or by label.
- The describe text is linked to the frame as its description.
- In forced colours the marks draw with Highlight and CanvasText.
- Arrow keys move the frame, Shift makes the step larger, and Page Up and Page Down move it by its own height.
- The value text says how far across and down the frame sits, such as Showing 20% to 60% across and 0% to 50% down.

## Example

```tsx
import { Image, Navigator } from '@drizztdourden08/tessera';
import type { NavigatorViewport } from '@drizztdourden08/tessera';

interface CanvasMapProps {
  preview: string;
  view: NavigatorViewport;
  setView: (view: NavigatorViewport) => void;
}

const CanvasMap = ({ preview, view, setView }: CanvasMapProps) => (
  <Navigator surface={{ width: 512, height: 512 }} viewport={view} onViewportChange={setView}>
    <Image src={preview} alt="" fit="fill" pixelated />
  </Navigator>
);
```

## Props

- `surface`: `NavigatorSurface`.
- `viewport`: `NavigatorViewport`.
- `onViewportChange`: `(viewport: NavigatorViewport) => void`.
- `children` (optional): `ReactNode`.
- `label` (optional): `string`.
- `step` (optional): `NavigatorStep`.
- `bigStep` (optional): `NavigatorStep`.
- `unclamped` (optional): `boolean`.
- `overlays` (optional): `readonly NavigatorOverlay[]`.
- `onOverlayPress` (optional): `(id: string) => void`.
- `onWheelZoom` (optional): `(direction: 1 | -1, at: NavigatorWheelPoint, deltaY: number) => void`.
- `onKey` (optional): `(event: KeyboardEvent<HTMLElement>) => boolean`.
- `empty` (optional): `ReactNode`.
- `caption` (optional): `ReactNode`.
- `describe` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-focus`, `--c-hover`, `--c-info`, `--c-primary`, `--c-primary-soft`, `--c-sunken`, `--radius-sm`, `--size-1`, `--size-160`, `--space-xs`.
