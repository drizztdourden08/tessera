# KeyValueEditor

A map of names to values, row by row: a name, a value control and Remove, then an add row, with a check for names listed twice.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { KeyValueEditor } from '@drizztdourden08/tessera';
```

The source is `src/composites/KeyValueEditor/KeyValueEditor.tsx`. Its gallery page is Composites · Inputs/KeyValueEditor (`#/story/composites-keyvalueeditor--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? Pairs of a name and a value.

KeyValueEditor edits a map row by row and holds it back while it has a duplicate, the same way in every app.

## Use it when

- An option is a map, such as item counts for a start inventory, and a raw JSON box would let one typo break it.
- The names come from a list of valid items, or are typed freely, and each has a number, a word or a choice.

## Use something else when

- The value nests deeper than one name and one value. Use `CodeBlock` instead.
- The value is a set of names with nothing attached. Use `Combobox` instead.

## Rules

- Pass keys whenever the valid names are known, so the add row searches them and a wrong name is caught.
- Pick valueKind for the values: count for small whole numbers, number, text or select with options.
- Store the value from onChange; it waits while a name is empty, listed twice or not in keys.

## Accessibility

- The editor is a group named by its Field or FormRow label, or by aria-label, and its rows are a list.
- Each value control is named Value of and the name, and each Remove button Remove and the name.
- A problem is an alert under the rows, and the rows it is about are marked invalid.

## Example

```tsx
import { KeyValueEditor } from '@drizztdourden08/tessera';
import type { KeyValueEntry } from '@drizztdourden08/tessera';

const StartInventory = ({ items, value, onChange }: {
  items: string[];
  value: Record<string, number>;
  onChange: (value: Record<string, KeyValueEntry>) => void;
}) => (
  <KeyValueEditor value={value} onChange={onChange} keys={items} min={0} max={99} aria-label="Start inventory" />
);
```

## Props

- `value`: `KeyValueRecord`.
- `onChange`: `(value: Record<string, KeyValueEntry>) => void`.
- `keys` (optional): `readonly string[]`.
- `valueKind` (optional): `KeyValueKind`, one of `'count'`, `'number'`, `'text'`, `'select'`. Default `'count'`.
- `options` (optional): `readonly string[]`.
- `min` (optional): `number`.
- `max` (optional): `number`.
- `newValue` (optional): `KeyValueEntry`.
- `keyLabel` (optional): `string`.
- `addPlaceholder` (optional): `string`.
- `empty` (optional): `ReactNode`.
- `disabled` (optional): `boolean`.
- `aria-label` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--space-xs`.
