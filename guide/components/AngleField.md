# AngleField

An angle in degrees, set by dragging a dial or typing a number, that snaps to 15, 22.5 or 45 degrees and wraps at a full turn.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { AngleField } from '@drizztdourden08/tessera';
```

The source is `src/composites/AngleField/AngleField.tsx`. Its gallery page is Composites · Inputs/AngleField (`#/story/composites-anglefield--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? Free text or a number. What shape is it? A number stepped up or down.

AngleField is the angle you point with a dial and also type, snapped to round steps.

## Use it when

- An editor rotates a sprite, a selection or a brush, and the user wants to point the angle and also type it.
- The angle should land on round steps, such as 15 degrees for a rotation or 45 for a direction.

## Use something else when

- The value is any other number, such as a size or an offset. Use [NumberField](NumberField.md) instead.
- The user picks one of nine places on a box. Use [AnchorPicker](AnchorPicker.md) instead.

## Rules

- Pass value in degrees and onChange; the app keeps the value. The value stays from 0 up to but not including 360, so 370 becomes 10 and a step below 0 becomes 345 or 359.
- 0 points to the right and the angle grows clockwise on screen.
- Snap is the degrees to round to, usually 15, 22.5 or 45. The dial rounds to it, and the wheel and the arrow keys step by it. Leave it out for whole degrees.
- Shift while dragging the dial drops the snap, and Shift with the wheel or the arrow keys steps one degree.
- Dial false leaves the dial out and keeps the number with its wheel and keys.
- Label, size, disabled and mixed work as on NumberField. mixed shows Mixed and hides the needle; the next angle clears it in the app.

## Accessibility

- The number field is the control readers use; it is named by label or aria-label and shows the degree sign.
- The dial is for pointers only and is hidden from readers; the arrow keys and the wheel do the same job.

## Example

```tsx
import { useState } from 'react';
import { AngleField } from '@drizztdourden08/tessera';

const Rotation = () => {
  const [angle, setAngle] = useState(45);
  return <AngleField label="Rotation" snap={15} value={angle} onChange={setAngle} />;
};
```

## Props

- `value`: `number`.
- `onChange`: `(value: number) => void`.
- `snap` (optional): `number`.
- `dial` (optional): `boolean`. Default `true`.
- `label` (optional): `string`.
- `size` (optional): `ControlSize`, one of `'sm'`, `'md'`.
- `mixed` (optional): `boolean`. Default `false`.

It also takes the 4 attributes it inherits through `Pick<NumberFieldProps, 'label' | 'size' | 'disabled' | 'mixed' | 'id' | 'aria-label' | 'className'>`, `Omit<NumberInputProps, 'value' | 'onChange' | 'onStep' | 'buttons' | 'sizeToContent' | 'start' | 'end'>`, `Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'>`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border-strong`, `--c-inset`, `--c-primary`, `--size-32`, `--size-4`, `--space-sm`.
