# RampStrip

A row of colour swatches that shows one ramp, from dark to light or step to step, with a caption on each step and one picked.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { RampStrip } from '@drizztdourden08/tessera';
```

The source is `src/composites/RampStrip/RampStrip.tsx`. Its gallery page is Composites · Inputs/RampStrip (`#/story/composites-rampstrip--overview`).

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
- To pick several steps, pass selected, a set of indexes, and onSelectionChange; a click picks one, Shift extends the range from the picked step, and Ctrl or Command adds or removes one. value still names the main step and onChange still runs on a plain click.
- With selected the strip is a group of toggle buttons and not a radio group, and an arrow key moves to one step and selects only it.
- A step takes marks, small corner indicators such as a dot or a letter, either a list or an object keyed top-start, top-end, bottom-start or bottom-end; they take their colour from the swatch.
- Pass onSwatchDragStart(index, event) to make every step draggable; set the payload on event.dataTransfer there.
- Pass swatchMenu(index) to give each step a context menu of menu items, opened by a right click, a long press or the menu key; return an empty list for a step with none.
- Pass onStepClick(index, event) and onStepDoubleClick(index, event) to react to a click or a double click on a step; onStepClick runs after the pick.
- Pass onStepContextMenu(index, event) to hear a right click or the menu key on a step, with or without swatchMenu; with both, it runs first and the menu opens unless the handler calls event.preventDefault().
- Pass stepData(index) to put data attributes on a step; write each key with its data- prefix, such as data-slot.
- Pass selectionKeys false to keep the arrow, Home and End keys from picking: they only move focus between the open steps, and Enter or Space press the focused step and run onStepClick. Tab still enters on the picked step.
- Pass wrap to let the steps flow onto more lines when the row is full.
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
- `selected` (optional): `ReadonlySet<number>`.
- `onSelectionChange` (optional): `(selected: ReadonlySet<number>) => void`.
- `onSwatchDragStart` (optional): `(index: number, event: DragEvent<HTMLElement>) => void`.
- `swatchMenu` (optional): `(index: number) => readonly MenuNode[]`.
- `onStepClick` (optional): `(index: number, event: MouseEvent<HTMLElement>) => void`.
- `onStepDoubleClick` (optional): `(index: number, event: MouseEvent<HTMLElement>) => void`.
- `onStepContextMenu` (optional): `(index: number, event: RampContextEvent) => void`.
- `stepData` (optional): `(index: number) => DataAttributes`.
- `selectionKeys` (optional): `boolean`.
- `wrap` (optional): `boolean`.
- `size` (optional): `RampSize`, one of `'sm'`, `'md'`, `'preview'`.
- `numbered` (optional): `boolean`.
- `className` (optional): `string`.

## Tokens

It draws on `--size-80`, `--space-2xs`, `--space-xs`.
