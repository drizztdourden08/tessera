# ContentSwap

Shows its content and, when the key changes, moves from the old content to the new with a fade, a slide or a scale, without the layout jumping.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { ContentSwap } from '@drizztdourden08/tessera';
```

The source is `src/primitives/ContentSwap/ContentSwap.tsx`. It has no gallery page yet.

## Where the questions lead here

What are you placing? Layout. What are you arranging? Content that changes with a key.

ContentSwap replaces content in place and animates the change when its key changes.

## Use it when

- A panel shows one of several views, and the change should read as a change, such as a wizard step or a detail pane.
- The content is replaced in the same place, and the key says when it is a different thing.

## Use something else when

- A set of slides the user pages through with controls. Use [Carousel](Carousel.md) instead.
- Content that only shows or hides in place. Use [Disclosure](Disclosure.md) instead.

## Rules

- Give swapKey a value that changes only when the content is a different thing, not on every render.
- Pick the effect by meaning: fade for a replacement, slide for steps with a direction, scale for a detail that opens.
- Set direction to back for a slide that goes to an earlier step.
- The old content stays on screen for the length of the motion, then is dropped; it is a copy, so it does not take input.

## Accessibility

- The leaving content is hidden from assistive tools; only the new content is read.
- Under reduced motion the content swaps at once, with no animation.

## Example

```tsx
import { ContentSwap, Text } from '@drizztdourden08/tessera';

const StepPanel = ({ step }: { step: number }) => (
  <ContentSwap swapKey={step} effect="slide">
    <Text>Current step</Text>
  </ContentSwap>
);
```

## Props

- `swapKey`: `string | number`.
- `children` (optional): `ReactNode`.
- `effect` (optional): `ContentSwapEffect`, one of `'fade'`, `'slide'`, `'scale'`. Default `'fade'`.
- `direction` (optional): `ContentSwapDirection`, one of `'forward'`, `'back'`. Default `'forward'`.
- `className` (optional): `string`.

## Tokens

It draws on `--duration-slow`, `--ease-out`, `--scale-swap`, `--space-lg`.
