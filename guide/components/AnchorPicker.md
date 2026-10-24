# AnchorPicker

A three by three grid that picks where something is anchored: a corner, an edge or the centre.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { AnchorPicker } from '@drizztdourden08/tessera';
```

The source is `src/composites/AnchorPicker/AnchorPicker.tsx`. Its gallery page is Composites · Inputs/AnchorPicker (`#/story/composites-anchorpicker--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? One of nine anchor points.

AnchorPicker picks one of nine anchor points, as an image editor does for canvas resize.

## Use it when

- A canvas or image is resized and the user says which edge or corner stays put.
- A tool aligns or places something against one of nine points, such as a watermark or a label.

## Use something else when

- The user picks one of a few named options in a row. Use [SegmentedControl](SegmentedControl.md) instead.
- The user picks one of a short list as radio buttons. Use `RadioGroup` instead.
- The user picks a position by dragging. Use `Slider` instead.

## Rules

- The app owns value; the picker calls onChange with one of top-left, top, top-right, left, center, right, bottom-left, bottom or bottom-right.
- The default variant dots shows the chosen cell as a filled dot.
- The variant arrows shows an arrow in every other cell, pointing away from the chosen one: the look of a canvas resize dialog.
- Pass label when the default Anchor does not say what is anchored, such as Keep this edge.
- Size sm fits a dense panel; md is the default.

## Accessibility

- The grid is a radio group with a radio per cell, named Top left to Bottom right, and one Tab stop on the chosen cell.
- The arrow keys move in two dimensions and choose; Home and End go to the start and end of the row, and with Control to the first and last cell.

## Example

```tsx
import { useState } from 'react';
import { AnchorPicker } from '@drizztdourden08/tessera';
import type { Anchor } from '@drizztdourden08/tessera';

const CanvasAnchor = () => {
  const [anchor, setAnchor] = useState<Anchor>('center');
  return <AnchorPicker label="Anchor" variant="arrows" value={anchor} onChange={setAnchor} />;
};
```

## Props

- `value`: `Anchor`, one of `'top-left'`, `'top'`, `'top-right'`, `'left'`, `'center'`, `'right'`, `'bottom-left'`, `'bottom'`, `'bottom-right'`.
- `onChange`: `(anchor: Anchor) => void`.
- `variant` (optional): `AnchorPickerVariant`, one of `'dots'`, `'arrows'`. Default `'dots'`.
- `size` (optional): `ControlSize`, one of `'sm'`, `'md'`.
- `label` (optional): `string`.
- `disabled` (optional): `boolean`. Default `false`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-focus`, `--c-hover`, `--c-primary`, `--c-primary-soft`, `--c-sunken`, `--c-text`, `--c-text-muted`, `--opacity-disabled`, `--opacity-muted`, `--radius-round`, `--radius-sm`, `--size-10`, `--size-20`, `--size-28`, `--size-6`, `--size-8`, `--space-2xs`, `--transition-fast`.
