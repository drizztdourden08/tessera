# SegmentedControl

A row of joined buttons that picks one value out of a few, with a highlight that slides to the active one.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { SegmentedControl } from '@drizztdourden08/tessera';
```

The source is `src/primitives/SegmentedControl/SegmentedControl.tsx`. Its gallery page is Primitives · Inputs/SegmentedControl (`#/story/primitives-segmentedcontrol--overview`).

## Where the questions lead here

What are you placing? Actions. One action, or several related buttons? Several related buttons. How do the buttons relate? Only one can be on.

SegmentedControl is the joined row that picks one of a few values.

## Use it when

- A short setting has a few choices that all fit on one line, such as a scale or an alignment.
- The choices are modes of one view, and the user switches between them often.

## Use something else when

- The choices are many or have long labels. Use [Select](Select.md) instead.
- Each choice needs a sentence of help. Use `RadioGroup` instead.
- Several choices can be on at once. Use `ToggleGroup` instead.

## Rules

- Give each option a value and either a label or an icon.
- An icon option takes a hint, and its label reads from it; the icon is a name from the set or any node, such as a pixel icon or a Glyph.
- A node passed as icon is drawn as given, so size and colour it yourself; a name is sized by the control.
- Pass onDeselect to let a second press on the active option clear the value.
- SelectedTone neutral draws the chosen option on a grey fill; accent, the default, keeps the primary highlight.
- An option takes a tooltip with an optional description and shortcut, placed by tooltipPlacement; its name is the label or hint.
- A disabled option takes a string that says why.

## Accessibility

- The track is a radio group named by label, with a radio per option and one Tab stop on the chosen one.
- The arrow keys, Home and End move and choose; an icon option is named by its title or hint.

## Example

```tsx
import { useState } from 'react';
import { SegmentedControl } from '@drizztdourden08/tessera';

const ScalePicker = () => {
  const [scale, setScale] = useState('2x');
  return (
    <SegmentedControl
      label="Window scale"
      value={scale}
      onChange={setScale}
      options={[
        { value: '1x', label: '1x' },
        { value: '2x', label: '2x' },
        { value: 'fit', label: 'Fit window' },
      ]}
    />
  );
};
```

## Props

- `value`: `T`.
- `options`: `SegmentOption<T>[]`.
- `onChange`: `(value: T) => void`.
- `onDeselect` (optional): `() => void`.
- `onHint` (optional): `HintReport`.
- `tooltipPlacement` (optional): `TooltipPlacement`, one of `'top'`, `'bottom'`, `'right'`, `'left'`. Default `'top'`.
- `label` (optional): `string`.
- `description` (optional): `string`.
- `size` (optional): `ControlSize`, one of `'sm'`, `'md'`.
- `selectedTone` (optional): `SelectedTone`, one of `'accent'`, `'neutral'`. Default `'accent'`.
- `disabled` (optional): `boolean`. Default `false`.
- `className` (optional): `string`.
- `aria-label` (optional): `string`.
- `aria-labelledby` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-focus`, `--c-primary`, `--c-primary-bright`, `--c-primary-soft`, `--c-surface`, `--c-text`, `--c-text-dim`, `--control-h-md`, `--control-h-sm`, `--control-pad-md`, `--control-pad-sm`, `--density-gap`, `--opacity-disabled`, `--radius-md`, `--radius-sm`, `--size-24`, `--space-2xs`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xs`, `--text-base`, `--text-sm`, `--text-xs`, `--transition-fast`, `--transition-normal`, `--weight-medium`, `--z-base`.
