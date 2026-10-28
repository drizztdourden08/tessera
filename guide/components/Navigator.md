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
- The width of the map comes from a class or its parent; its height follows the shape of the surface.

## Accessibility

- The frame is a slider with one Tab stop, named Map or by label.
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
- `step` (optional): `number`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-focus`, `--c-primary`, `--c-primary-soft`, `--c-sunken`, `--radius-sm`, `--size-160`.
