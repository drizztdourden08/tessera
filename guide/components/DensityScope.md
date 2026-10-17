# DensityScope

Sets how dense the form parts inside it are, once for a whole panel, such as an inspector beside a canvas.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { DensityScope } from '@drizztdourden08/tessera';
```

The source is `src/primitives/DensityScope/DensityScope.tsx`. Its gallery page is Primitives · Inputs/DensityScope (`#/story/primitives-densityscope--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? Smaller form parts for a whole panel.

DensityScope makes the form parts of one panel compact at once, with the same small size in every app.

## Use it when

- A panel holds many small controls in little room, such as the inspector of a layout editor or a tool window.
- Every input, Field and Button of the panel should be the small size without passing size to each one.

## Use something else when

- One control should be small in an otherwise usual form. Use `Field` instead.
- A row grid of inputs should be tighter. Use [RowGrid](RowGrid.md) instead.

## Rules

- Wrap the panel once with density="compact"; every part inside without its own size draws at sm.
- A size on a part or on a Field still wins, so a part can stay md inside a compact panel.
- Compact also tightens the gaps inside Slider, Checkbox, SegmentedControl, ToggleGroup and DisabledOverlay.
- Put a comfortable scope inside a compact one for a section that needs the usual size again.
- It draws no box of its own, so put it around the panel without changing the layout.

## Accessibility

- It changes sizes and gaps only: names, roles and keys of the parts stay the same.
- A compact control is 28 px tall; keep compact for pointer tools, not for touch screens.

## Example

```tsx
import { Card, DensityScope, Field, Select, Slider } from '@drizztdourden08/tessera';
import { useState } from 'react';

const ANCHORS = [{ value: 'top-left', label: 'Top left' }, { value: 'top-right', label: 'Top right' }];

const Inspector = () => {
  const [anchor, setAnchor] = useState('top-left');
  const [width, setWidth] = useState(160);
  return (
    <DensityScope density="compact">
      <Card title="Health bar">
        <Field label="Anchor">
          <Select options={ANCHORS} value={anchor} onChange={setAnchor} />
        </Field>
        <Field label="Width">
          <Slider value={width} max={400} onChange={setWidth} />
        </Field>
      </Card>
    </DensityScope>
  );
};
```

## Props

- `density`: `Density`, one of `'comfortable'`, `'compact'`.
- `children`: `ReactNode`.

## Tokens

It draws on `--control-pad-md`, `--control-pad-sm`, `--density-unset`, `--space-xs`, `--weight-normal`.
