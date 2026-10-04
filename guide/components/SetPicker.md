# SetPicker

Several choices from a long list: the chosen ones as removable tags, a search, and a checklist that scrolls.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { SetPicker } from '@drizztdourden08/tessera';
```

The source is `src/primitives/SetPicker/SetPicker.tsx`. Its gallery page is Primitives · Inputs/SetPicker (`#/story/primitives-setpicker--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? Several choices from a long list.

SetPicker shows what is chosen on top and searches the rest, the same way in every app.

## Use it when

- An option is a set picked from dozens or hundreds of names, such as the items to hint at the start.
- The user should see every choice made so far while looking for the next one.

## Use something else when

- The choices are few and fit in view. Use `ToggleGroup` instead.
- The choices are tags from a small grouped list. Use `TagPicker` instead.
- Several choices are picked by typing, in a dropdown. Use `Combobox` instead.

## Rules

- Pass every valid choice in options; value keeps their order, whatever order they were checked in.
- Keep each choice to a short name, since it shows as a tag and a checkbox label.

## Accessibility

- The picker is a group named by its Field or FormRow label, or by aria-label.
- Each choice is a Checkbox, so Space checks it, and each tag has a Remove button with the name.
- The search box is named after the number of choices it searches.

## Example

```tsx
import { SetPicker } from '@drizztdourden08/tessera';

const StartHints = ({ items, value, onChange }: { items: string[]; value: string[]; onChange: (value: string[]) => void }) => (
  <SetPicker options={items} value={value} onChange={onChange} aria-label="Start hints" />
);
```

## Props

- `options`: `readonly string[]`.
- `value`: `readonly string[]`.
- `onChange`: `(value: string[]) => void`.
- `placeholder` (optional): `string`.
- `disabled` (optional): `boolean`.
- `aria-label` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--size-192`, `--space-2xs`, `--space-xs`.
