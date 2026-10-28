# NumberField

A number field you can drag by its label, step with the wheel and the arrow keys, step finely with Shift, walk along a ladder of fixed stops and fill from a menu of quick values.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { NumberField } from '@drizztdourden08/tessera';
```

The source is `src/composites/NumberField/NumberField.tsx`. Its gallery page is Composites · Inputs/NumberField (`#/story/composites-numberfield--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? Free text or a number. What shape is it? A number stepped up or down.

NumberField is the number you drag, turn the wheel on, walk along a ladder or fill from quick values.

## Use it when

- An editor sets a size, an opacity, an offset or a zoom, and the user tries values quickly by dragging or turning the wheel.
- The value has fixed stops people expect, such as zoom steps from 25 to 12800 percent.
- A tool option sits in a Toolbar and the number must stay compact, with a unit beside it.

## Use something else when

- A plain number is typed once in a form, with stepper buttons. Use `NumberInput` instead.
- The number is a position on a track, such as a volume. Use `Slider` instead.
- The number is an angle that needs a dial. Use [AngleField](AngleField.md) instead.

## Rules

- Pass value and onChange; the app keeps the value. min, max and step work as on NumberInput, and step defaults to 1.
- Label draws text before the field. Drag it sideways to scrub: one step for every six pixels. scrub false keeps the label and turns the drag off.
- The wheel steps the value while the field has focus, and Up and Down do the same; wheel false turns the wheel off. Shift makes every step fine.
- FineStep is the step while Shift is down. It defaults to a tenth of step.
- Ladder is a list of stops. A step, a wheel turn or a scrub step moves to the next stop above or below the value, whatever it is now. Shift leaves the ladder for the fine step.
- Presets add a menu of quick values beside the field, as numbers or as { value, label }. Picking one sets the value.
- Suffix draws a unit after the number, such as % or px.
- Mixed shows the word Mixed instead of a number, for values that differ across a selection. Any new value, typed, stepped or picked, calls onChange, and the app clears mixed.
- A ZoomField is this part with ladder [25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800], suffix % and a few presets; it is a recipe, not a part.
- A value typed outside min and max is clamped as you type, and the field shows the clamped value when it loses focus.

## Accessibility

- The number input keeps its own role and takes its name from label, or from aria-label when there is no label.
- The label is hidden from readers, since the input already has the name; scrubbing is for pointers, and the arrow keys do the same for the keyboard.
- Up and Down step the value; Shift with them steps finely. Escape in a Toolbar moves focus back to the item before.
- The presets button is named Quick values and opens a menu with one radio item for each preset.

## Example

```tsx
import { useState } from 'react';
import { NumberField } from '@drizztdourden08/tessera';

const ZOOM = [25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800];

const Zoom = () => {
  const [zoom, setZoom] = useState(100);
  return <NumberField aria-label="Zoom" suffix="%" ladder={ZOOM} presets={[100, 400, 1600]} value={zoom} onChange={setZoom} />;
};

const Opacity = () => {
  const [opacity, setOpacity] = useState(80);
  return <NumberField label="Opacity" suffix="%" min={0} max={100} step={5} value={opacity} onChange={setOpacity} />;
};
```

## Props

- `value`: `number`.
- `onChange`: `(value: number) => void`.
- `min` (optional): `number`.
- `max` (optional): `number`.
- `step` (optional): `number`. Default `1`.
- `label` (optional): `string`.
- `fineStep` (optional): `number`.
- `ladder` (optional): `readonly number[]`.
- `presets` (optional): `readonly NumberPresetInput[]`.
- `suffix` (optional): `string`.
- `scrub` (optional): `boolean`. Default `true`.
- `wheel` (optional): `boolean`. Default `true`.
- `size` (optional): `ControlSize`, one of `'sm'`, `'md'`.
- `mixed` (optional): `boolean`.
- `invalid` (optional): `boolean`.

It also takes the 301 attributes it inherits through `Omit<NumberInputProps, 'value' | 'onChange' | 'onStep' | 'buttons' | 'sizeToContent' | 'start' | 'end'>`, `Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'>`.

## Tokens

It draws on `--c-text`, `--c-text-muted`, `--control-h-md`, `--control-h-sm`, `--control-pad-md`, `--control-pad-sm`, `--space-sm`, `--space-xs`, `--text-base`, `--text-sm`, `--text-xs`.
