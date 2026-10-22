# ControllerLayout

A plain outline of a controller with every button, trigger and stick in its place, lit while it is held, to test a gamepad or show what it sends.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ControllerLayout } from '@drizztdourden08/tessera';
```

The source is `src/composites/ControllerLayout/ControllerLayout.tsx`. Its gallery page is Composites · Input devices/ControllerLayout (`#/story/composites-controllerlayout--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? Controller or keyboard input. What about the input? Every input on a controller.

ControllerLayout draws every input of a pad in its place, so a test screen reads the same in every app.

## Use it when

- A controller test screen shows the whole pad at once, the way a console test screen does.
- A settings card shows which buttons the player is holding and where the sticks point.

## Use something else when

- A flat set of buttons with no place on a pad, such as a keyboard or a list of switches. Use `PressedGrid` instead.
- One stick alone, with dead zones, a measured range and its numbers. Use `StickPlot` instead.
- A keyboard with keys marked or held. Use `KeyboardLayout` instead.

## Rules

- Pick the variant from the pad family: offset for Xbox shapes, symmetric for PlayStation shapes, nintendo for Switch shapes and pad for a pad with no sticks.
- Pass only the slots the device has. A slot not given is drawn idle with no label.
- Give the face buttons a label or a glyph from the pad family, such as A, B, X and Y, so the player sees the names printed on the device.
- Send triggers and shoulders as value from 0 to 1, and sticks as x and y from -1 to 1 with y up.
- Put buttons the outline has no place for, such as paddles, in extras. They show in a list under the outline, one row each.

## Accessibility

- The figure is named by label, Controller by default.
- The drawing is hidden from screen readers. A hidden list names what is held now, so moving a stick does not announce anything.
- The list under the outline is a named list, one item per input it holds.

## Example

```tsx
import { ControllerLayout } from '@drizztdourden08/tessera';
import type { ControllerSlots } from '@drizztdourden08/tessera';

interface PadTestProps {
  slots: ControllerSlots;
}

const PadTest = ({ slots }: PadTestProps) => (
  <ControllerLayout
    variant="offset"
    slots={{
      ...slots,
      'face.south': { ...slots['face.south'], label: 'A' },
      'face.east': { ...slots['face.east'], label: 'B' },
    }}
    extras={[{ id: 'paddle1', label: 'Upper right paddle' }]}
  />
);
```

## Props

- `variant`: `ControllerLayoutVariant`, one of `'nintendo'`, `'offset'`, `'pad'`, `'symmetric'`.
- `slots`: `ControllerSlots`.
- `extras` (optional): `readonly ControllerExtra[]`. Default `NO_EXTRAS`.
- `label` (optional): `string`.
- `className` (optional): `string`. Default `''`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-hairline`, `--c-layer`, `--c-on-primary`, `--c-primary`, `--c-primary-bright`, `--c-primary-soft`, `--c-sunken`, `--c-text`, `--c-text-muted`, `--control-h-sm`, `--controller-layout-max-w`, `--controller-tag-x`, `--controller-tag-y`, `--font-mono`, `--leading-tight`, `--radius-sm`, `--size-1`, `--size-16`, `--size-20`, `--space-2xs`, `--space-sm`, `--space-xs`, `--text-base`, `--text-sm`, `--text-xs`, `--transition-fast`, `--weight-semi`.

## Also exported from this folder

`CONTROLLER_LAYOUT_VARIANTS`, `CONTROLLER_SLOT_IDS`.
