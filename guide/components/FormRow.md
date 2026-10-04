# FormRow

One option of a long form: its name and help on the left, its control in the middle, a changed mark and a reset at the end.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { FormRow } from '@drizztdourden08/tessera';
```

The source is `src/composites/FormRow/FormRow.tsx`. Its gallery page is Composites · Forms/FormRow (`#/story/composites-formrow--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? One option in a long form, with a reset.

FormRow lays out the name, the control, the changed mark and the reset of an option the same way in every app.

## Use it when

- A form lists many options built from a schema, such as the options of a game preset, each with a default to go back to.
- The user needs to see at a glance which options differ from their default.

## Use something else when

- The row is an app setting with a live hint, compact or read only. Use `SettingsRow` instead.
- A short form needs a label, a hint and an error around each input. Use `Field` instead.

## Rules

- Set changed when the value differs from its default, and pass onReset to put the default back.
- Write problem as what blocks the save and what to do, such as Not saved: fix the JSON first.
- Tag rare options with advanced, and hide them behind Show advanced in FormGroupTabs.

## Accessibility

- The control gets the id, label and notes of the row, as inside a Field, so it is named by the option.
- A problem is an alert and marks the control invalid; Reset is named Reset and the option.

## Example

```tsx
import { FormRow, NamedRange } from '@drizztdourden08/tessera';

const BALANCING = [{ label: 'Disabled', value: 0 }, { label: 'Normal', value: 50 }, { label: 'Extreme', value: 99 }];

const BalancingRow = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
  <FormRow label="Progression Balancing" description="Moves progression earlier." changed={value !== 50} onReset={() => onChange(50)}>
    <NamedRange value={value} onChange={onChange} names={BALANCING} min={0} max={99} />
  </FormRow>
);
```

## Props

- `label`: `string`.
- `description` (optional): `ReactNode`.
- `changed` (optional): `boolean`. Default `false`.
- `advanced` (optional): `boolean`. Default `false`.
- `problem` (optional): `ReactNode`.
- `onReset` (optional): `() => void`.
- `id` (optional): `string`.
- `children`: `ReactNode`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-hairline`, `--size-32`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--weight-semi`.
