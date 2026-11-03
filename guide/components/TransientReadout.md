# TransientReadout

A value in the corner of a surface that shows when it changes and fades after a second, such as the zoom of a canvas.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { TransientReadout } from '@drizztdourden08/tessera';
```

The source is `src/composites/TransientReadout/TransientReadout.tsx`. Its gallery page is Composites · Feedback/TransientReadout (`#/story/composites-transientreadout--overview`).

## Where the questions lead here

What are you placing? Feedback. What are you telling the user? A value that shows when it changes and fades.

TransientReadout is tied to one value and one surface, where Toast is a message raised from anywhere in the app.

## Use it when

- A control changes a value the user wants to see for a moment, such as a zoom of 200%.
- Double click on the value should reset it.

## Use something else when

- The user must be told that something finished or failed. Use [Toast](Toast.md) instead.
- The value must stay on screen. Use [Text](Text.md) instead.

## Rules

- Put it inside a positioned parent, which is the surface the corners belong to.
- Pass the live value as text; it stays hidden on first render and shows on each change.
- Leave showMs at one second unless the value is long to read.
- Pass onActivate for a reset on double click, and a title that says so.
- Make the control that changes the value carry its own accessible value, because the readout is hidden from screen readers.

## Accessibility

- The readout is hidden from screen readers; it repeats what the control already exposes.
- Reduced motion drops the fade.
- Forced colours draw it with system colours.

## Example

```tsx
import { TransientReadout } from '@drizztdourden08/tessera';

const ZoomReadout = ({ zoom, reset }: { zoom: number; reset: () => void }) => (
  <TransientReadout value={`${zoom}%`} corner="bottom-end" onActivate={reset} title="Double click to reset" />
);
```

## Props

- `value` (optional): `ReactNode`.
- `corner` (optional): `ReadoutCorner`, one of `'bottom-end'`, `'bottom-start'`, `'top-end'`, `'top-start'`. Default `'bottom-end'`.
- `showMs` (optional): `number`. Default `READOUT_SHOW_MS`.
- `onActivate` (optional): `() => void`.
- `title` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-surface`, `--c-text`, `--duration-normal`, `--radius-sm`, `--space-2xs`, `--space-sm`, `--z-floating`.
