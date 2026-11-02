# RampStrip

A row of colour swatches that shows one ramp, from dark to light or step to step, with a caption on each step and one picked.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { RampStrip } from '@drizztdourden08/tessera';
```

The source is `src/composites/RampStrip/RampStrip.tsx`. It has no gallery page yet.

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? A colour from a ramp of steps.

RampStrip is the ordered row of shades of one ramp, with a caption on each step.

## Use it when

- A palette editor shows a ramp of shades and the user picks one step to edit or assign.
- A ramp needs a large preview row above or beside the colour it builds, with the step number on every swatch.

## Use something else when

- The user picks one colour from a loose set that is not an ordered ramp. Use [ChoiceGrid](ChoiceGrid.md) instead.
- A single colour is shown or picked, with no row of steps. Use `ColorSwatch` instead.

## Rules

- Pass steps, value and onChange; the app keeps the picked index. value is null when no step is picked.
- Each step has a color, and optionally a caption, a label, unused and disabled. The caption shows on the swatch; label names the step to readers and as its tooltip, and falls back to the colour.
- Numbered true captions every step without its own caption with its place in the ramp, starting at 1.
- Size sm and md keep each swatch at the control height. preview stretches the steps over the full width as tall blocks, for a ramp you want to read at a glance.
- The left and right arrow keys, Home and End move to the next open step and pick it. Tab enters on the picked step.

## Accessibility

- The strip is a radio group named by aria-label; each step is a radio named by its label or colour.
- Selection is shown by an outline, not by colour alone.

## Example

```tsx
import { useState } from 'react';
import { RampStrip } from '@drizztdourden08/tessera';

const steps = [{ color: '#1b2a41' }, { color: '#324a5f' }, { color: '#4f7cac' }, { color: '#9ec1de' }];

const Ramp = () => {
  const [step, setStep] = useState<number | null>(1);
  return <RampStrip aria-label="Blue ramp" steps={steps} value={step} onChange={setStep} numbered size="preview" />;
};
```

## Props

- `steps`: `readonly RampStep[]`.
- `value`: `number | null`.
- `onChange`: `(index: number) => void`.
- `aria-label`: `string`.
- `size` (optional): `RampSize`, one of `'sm'`, `'md'`, `'preview'`. Default `'md'`.
- `numbered` (optional): `boolean`. Default `false`.
- `className` (optional): `string`.

## Tokens

It draws on `--size-80`, `--space-2xs`, `--space-xs`.
