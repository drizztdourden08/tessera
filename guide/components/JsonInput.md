# JsonInput

JSON typed over the code highlighting of CodeBlock, checked as the user types, with the problem, its line and its column, and Format.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { JsonInput } from '@drizztdourden08/tessera';
```

The source is `src/primitives/JsonInput/JsonInput.tsx`. Its gallery page is Primitives · Inputs/JsonInput (`#/story/primitives-jsoninput--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? Free text or a number. What shape is it? Structured data, as JSON.

JsonInput checks JSON as it is typed and only hands on a value that parses, the same way in every app.

## Use it when

- An option or a record field holds free JSON, such as plando texts, and no form fits its shape.
- A tool screen lets a developer edit a raw value and must never save text that does not parse.

## Use something else when

- The value is a map of names to numbers or words. Use [KeyValueEditor](KeyValueEditor.md) instead.
- The value is plain text over several lines. Use `Textarea` instead.
- The JSON is only shown, never edited. Use `CodeBlock` instead.

## Rules

- Store the value from onChange; it only comes while the text parses, so a typo never reaches the saved value.
- Pass onProblem when a form must hold its Save, and say so in the row, such as Not saved: fix the JSON first.
- Set shape to object or array when the option needs one, so a valid value of the wrong kind is turned away too.
- Pass defaultText only to bring back a draft that did not parse; otherwise the text is the formatted value.

## Accessibility

- The text is a real textarea that takes the label, hint and error of its Field or FormRow.
- The status line under it, valid or the problem with its line and column, describes the textarea.
- A problem marks the textarea invalid; Format is a button with its name, after the textarea.

## Example

```tsx
import { JsonInput } from '@drizztdourden08/tessera';
import { useState } from 'react';

const PlandoTexts = ({ value, save }: { value: Record<string, string>; save: (value: unknown) => void }) => {
  const [blocked, setBlocked] = useState(false);
  return (
    <>
      <JsonInput value={value} onChange={save} onProblem={(problem) => setBlocked(problem !== null)} shape="object" aria-label="Plando texts" />
      {blocked && <p>Not saved: fix the JSON first.</p>}
    </>
  );
};
```

## Props

- `value`: `unknown`.
- `onChange`: `(value: unknown) => void`.
- `onProblem` (optional): `(problem: JsonProblem | null) => void`.
- `shape` (optional): `JsonShape`, one of `'object'`, `'array'`, `'any'`.
- `defaultText` (optional): `string`.
- `indent` (optional): `number`. Default `INDENT`.
- `readOnly` (optional): `boolean`.
- `disabled` (optional): `boolean`.
- `invalid` (optional): `boolean`.
- `id` (optional): `string`.
- `aria-label` (optional): `string`.
- `aria-describedby` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-danger`, `--c-danger-soft`, `--c-primary`, `--c-primary-soft`, `--c-sunken`, `--c-text`, `--font-mono`, `--leading-normal`, `--radius-md`, `--space-2xs`, `--space-md`, `--space-sm`, `--text-sm`, `--transition-normal`.
