# OptionRow

One option of a randomizer or game preset: its name, tag and description on the left, its control in the middle, and an optional cell at the end.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { OptionRow } from '@drizztdourden08/tessera';
```

The source is `src/composites/OptionRow/OptionRow.tsx`. It has no gallery page yet.

## A building block

No question in [decide.md](../decide.md) leads here. Other components are built on it.

## Use it when

- A list of game options needs rows that show locked, forced and changed options the same way in every app.
- The row has an extra cell at the end, such as the effect of the option on the item pool.

## Use something else when

- The option comes from a schema and its control is laid out by the form. Use [FormRow](FormRow.md) instead.
- The row is an app setting with a live hint. Use `SettingsRow` instead.

## Rules

- Pass the control you want as control: a Toggle, a Select, a Slider or a ValueTag. The row does not pick it for you.
- Set locked for an option the user cannot change; the row dims.
- Set forced with note when another option overrides this one; the row stays at full strength and the note shows in the danger tone.
- Set changed when the value differs from its default, and pass onReset to show the reset button in its own cell after the control. The extra column exists only on a changed row with onReset.
- A long description folds to two lines; set descriptionLines and descriptionOverflow to change that, as on FormRow.
- Pass tag for a short word after the name and aside for the cell at the end of the row.

## Accessibility

- The reset button is named Reset and the option, and the changed mark is written as text.
- Give the control an accessible name from the same label.

## Example

```tsx
import { OptionRow, Toggle } from '@drizztdourden08/tessera';

const ShuffleRow = ({ on, setOn }: { on: boolean; setOn: (on: boolean) => void }) => (
  <OptionRow
    label="Shuffle items"
    description="Mix the items between the chests. A long description folds to two lines and the rest shows as a hint, the same way a FormRow description does."
    changed={on}
    onReset={() => setOn(false)}
    control={<Toggle checked={on} onChange={setOn} aria-label="Shuffle items" />}
  />
);
```

## Props

- `label`: `string`.
- `description` (optional): `ReactNode`.
- `descriptionLines` (optional): `number`.
- `descriptionOverflow` (optional): `FoldOverflow`, one of `'more'`, `'hint'`, `'clip'`.
- `tag` (optional): `string`.
- `note` (optional): `ReactNode`.
- `locked` (optional): `boolean`.
- `forced` (optional): `boolean`.
- `changed` (optional): `boolean`.
- `onReset` (optional): `() => void`.
- `control`: `ReactNode`.
- `aside` (optional): `ReactNode`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-text`, `--c-text-muted`, `--leading-normal`, `--leading-tight`, `--opacity-muted`, `--option-aside-w`, `--option-control-w`, `--space-md`, `--space-sm`, `--space-xs`, `--text-sm`, `--text-xs`.
