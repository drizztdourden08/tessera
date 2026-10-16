# BackdropLayer

A layer that fills its positioned parent with an image, a colour or a scene of your own, from one backdrop value.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { BackdropLayer } from '@drizztdourden08/tessera';
```

The source is `src/primitives/BackdropLayer/BackdropLayer.tsx`. It has no gallery page yet.

## Where the questions lead here

What are you placing? Layout. What are you arranging? A picture, a colour or a scene behind a block.

BackdropLayer draws an image, a colour or a scene behind a block from one backdrop value.

## Use it when

- A page header shows an image or a colour behind its title: pass the layer as the backdrop of ScreenPage, SettingsPage or ContentHeader.
- An app stores a backdrop as data, such as a hub that can show an image, a colour or nothing, and draws it in more than one place.
- A block of your own needs a covering, contained or tiled image behind its content.

## Use something else when

- The top of a home screen with art, actions and facts over a backdrop. Use `Hero` instead.
- A picture that is content, with its own size, alt text and placeholders. Use `Image` instead.

## Rules

- Backdrop is one of { kind: "image", src }, { kind: "color", color } or { kind: "node", node }.
- An image covers by default; fit contain shows it whole, and fit tile repeats it from the top left at tileSize. position moves it and color fills behind it.
- A color or an image color that starts with -- reads as a token, so "--c-tag-violet-dim" paints var(--c-tag-violet-dim).
- The layer sits at inset 0 of the nearest positioned parent and takes no pointer events. Set its stacking order with className, as Hero does.
- A node fills the layer, and the layer is a size container, so the scene can size itself with container queries.
- BackdropStyle(backdrop) returns the same background style for an element you draw yourself; a node returns an empty style.

## Accessibility

- The layer is hidden from screen readers. A backdrop is decoration; put any picture that carries meaning in an Image with alt text.
- Keep the text over a busy image readable with a shade or a scrim, as Hero and ContentHeader do.

## Example

```tsx
import { BackdropLayer, Icon, ScreenPage, Text } from '@drizztdourden08/tessera';
import type { Backdrop } from '@drizztdourden08/tessera';

const night: Backdrop = { kind: 'image', src: '/art/night.png', position: 'center bottom', pixelated: true };

const SavesPage = () => (
  <ScreenPage icon={<Icon name="save" />} title="Saves" backdrop={<BackdropLayer backdrop={night} />}>
    <Text>Three saves</Text>
  </ScreenPage>
);
```

## Props

- `backdrop`: `Backdrop`.
- `className` (optional): `string`.

## Also exported from this folder

`backdropStyle`.
