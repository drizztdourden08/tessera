# NamedRange

A number from a range whose common values have names: the names as joined buttons, then Custom for any other number.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { NamedRange } from '@drizztdourden08/tessera';
```

The source is `src/primitives/NamedRange/NamedRange.tsx`. Its gallery page is Primitives · Inputs/NamedRange (`#/story/primitives-namedrange--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? A number with named steps.

NamedRange puts the named values first and a number second, the same way in every app.

## Use it when

- An option is a number, but most people pick one of a few named values, such as progression balancing.
- The named values matter more than the exact number, and a custom number is still allowed.

## Use something else when

- The number has no named values. Use `Slider` instead.
- Only the named values are allowed. Use `SegmentedControl` instead.

## Rules

- Keep names to three or four, in the order of their values, and write each name as a word, such as Normal.
- Set min and max to the full range; Custom holds its number between them.
- Leave showValues on unless the numbers mean nothing to the user.

## Accessibility

- The control is a group named by its Field or FormRow label, or by aria-label.
- The names are the buttons of a SegmentedControl, and the custom number a NumberStepper named Custom value.

## Example

```tsx
import { NamedRange } from '@drizztdourden08/tessera';

const BALANCING = [{ label: 'Disabled', value: 0 }, { label: 'Normal', value: 50 }, { label: 'Extreme', value: 99 }];

const Balancing = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
  <NamedRange value={value} onChange={onChange} names={BALANCING} min={0} max={99} aria-label="Progression balancing" />
);
```

## Props

- `value`: `number`.
- `onChange`: `(value: number) => void`.
- `names`: `readonly NamedStep[]`.
- `min`: `number`.
- `max`: `number`.
- `step` (optional): `number`.
- `showValues` (optional): `boolean`.
- `customLabel` (optional): `string`.
- `disabled` (optional): `boolean`.
- `size` (optional): `ControlSize`, one of `'sm'`, `'md'`.
- `aria-label` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--space-sm`, `--space-xs`.
