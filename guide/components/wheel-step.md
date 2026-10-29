# wheel-step

Turn the mouse wheel over an element into steps up and down, with a fine step while Shift is held, the way the volume button and the number field do.

A hook module: functions for a screen that owns its own markup, not a component.

Import from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { useWheelStep, wheelStepOf } from '@drizztdourden08/tessera';
```

The source is `src/composites/wheel-step/index.ts`.

## Use it when

- A control has a value that should change by one step for each notch of the wheel.
- A popup that belongs to the control, such as a volume panel, should answer the wheel as well.

## Use something else when

- A box scrolls and the wheel should move its content. Use [ScrollArea](ScrollArea.md) instead.
- The control is a number you type or drag. Use [NumberField](NumberField.md) instead.

## Rules

- Pass refs, the elements to listen on, active and onStep; the app keeps the value and decides what a step means.
- OnStep receives { direction, fine }. direction is 1 for a wheel turned up and -1 for one turned down; fine is true while Shift is down.
- The hook stops the page from scrolling for every wheel turn it handles, so turn it on only while the control should own the wheel, such as while it has focus.
- Browsers send Shift with the wheel as a sideways turn; the hook reads that too.
- Pass watch to listen again when an element in refs appears or goes, such as a panel that opens.
- WheelStepOf is the same math for one wheel event, without the listener.

## Accessibility

- The wheel is for pointers only; give the control keys for the same step, such as Up and Down.
- Do not keep the wheel active on a control that has no focus, since it takes the wheel from the page.

## Example

```tsx
import { useRef, useState } from 'react';
import { Box, useWheelStep } from '@drizztdourden08/tessera';

const Stepper = () => {
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(10);
  useWheelStep({ refs: [ref], active: true, onStep: (step) => setValue((current) => current + step.direction * (step.fine ? 0.1 : 1)) });
  return <Box ref={ref} tabIndex={0}>{value}</Box>;
};
```

## What it exports

- `useWheelStep`, a hook: `(options: WheelStepOptions) => void`.
- `wheelStepOf`, a function: `(event: WheelDelta) => WheelStep | undefined`.

## Types

```ts
interface WheelDelta {
  deltaX: number;
  deltaY: number;
  shiftKey: boolean;
}

interface WheelStep {
  direction: 1 | -1;
  fine: boolean;
}

interface WheelStepOptions {
  refs: readonly RefObject<HTMLElement | null>[];
  active: boolean;
  onStep: (step: WheelStep) => void;
  watch?: unknown;
}
```
