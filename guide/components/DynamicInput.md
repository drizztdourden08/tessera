# DynamicInput

One field built from a pattern of typed slots, muted text and icons, such as a time, a price with its currency or a lobby code.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { DynamicInput } from '@drizztdourden08/tessera';
```

The source is `src/composites/DynamicInput/DynamicInput.tsx`. Its gallery page is Composites · Inputs/DynamicInput (`#/story/composites-dynamicinput--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? Free text or a number. What shape is it? Text that follows a pattern.

DynamicInput reads a pattern of slots, so a time, an address or a lobby code is one field with its own characters and checks.

## Use it when

- Several small values read as one, such as a time, a date, a size, a server address or a phone number with its country.
- A text value follows a fixed shape, such as a host name or a lobby code with its own characters.
- The field has to check itself, by slot or as a whole, and show its own error.

## Use something else when

- One plain line of text or a single number is asked. Use `TextInput` instead.
- A number is typed on its own, with a stepper or a unit. Use `NumberInput` instead.

## Rules

- Write the shape in the pattern, such as {hh:hour 12h}:{mm:minute}, and keep the value as one object keyed by slot name.
- Put it in a Field for the label, hint and size.
- A text slot takes digits, letters or alnum in the pattern. For any other set, pass slots with chars, a string or a Set of the allowed characters.
- Pass aliases, from typed to stored, to read a typed character as another, such as I and L as 1. A slot entry wins over the pattern one.
- Do not map an alias to a character that is itself an alias, because the text is cleaned again on every key.
- Chars and aliases follow the case of the slot, so write them in either case.
- Pass validate on a slot or on the pattern, from the value to a message or nothing. A message turns the field invalid and shows under it.
- An empty slot reaches validate as null. Return nothing for it unless the slot is required.
- The invalid prop wins over validate, and a Field with an error shows its own message.

## Accessibility

- The field is a group named by the Field label, and each slot is named by its quoted label.
- An invalid field sets aria-invalid on its slots and describes them by the message, which is announced as an alert.
- Tab and Shift+Tab move between slots, and a choice slot opens with the arrow keys.

## Example

```tsx
import { useState } from 'react';
import { DynamicInput, Field } from '@drizztdourden08/tessera';
import type { PatternValue } from '@drizztdourden08/tessera';

const SLOTS = {
  code: { chars: 'ABCDEFGHJKLMNOPQRSTVWXYZ0123456789', aliases: { I: '1', L: '1', O: '0' } },
};

const LobbyCode = () => {
  const [value, setValue] = useState<PatternValue>({ code: null });
  return (
    <Field label="Lobby code">
      <DynamicInput pattern="{code:text len6 upper}" value={value} onChange={setValue} slots={SLOTS} />
    </Field>
  );
};
```

## Props

- `pattern`: `string`.
- `value`: `PatternValue`.
- `onChange`: `(next: PatternValue) => void`.
- `disabled` (optional): `boolean`.
- `invalid` (optional): `boolean`.
- `size` (optional): `ControlSize`, one of `'sm'`, `'md'`.
- `id` (optional): `string`.
- `className` (optional): `string`. Default `''`.
- `aria-label` (optional): `string`.
- `aria-labelledby` (optional): `string`.
- `aria-describedby` (optional): `string`.
- `slots` (optional): `PatternSlotConfigs`.
- `lists` (optional): `PatternLists`.
- `actions` (optional): `PatternActions`.
- `icons` (optional): `PatternIcons`.
- `counter` (optional): `string`.
- `aliases` (optional): `PatternAliases`.
- `validate` (optional): `(value: PatternValue) => PatternRuleMessage`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-danger`, `--c-danger-soft`, `--c-focus`, `--c-hover`, `--c-primary`, `--c-primary-soft`, `--c-selected`, `--c-surface`, `--c-text`, `--c-text-dim`, `--c-text-muted`, `--control-h-md`, `--control-h-sm`, `--control-pad-md`, `--control-pad-sm`, `--leading-normal`, `--listbox-attach`, `--listbox-columns`, `--listbox-space`, `--opacity-disabled`, `--radius-md`, `--radius-sm`, `--shadow-2`, `--shadow-dropdown`, `--size-1`, `--size-14`, `--size-16`, `--size-192`, `--size-2`, `--size-288`, `--size-48`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-base`, `--text-sm`, `--text-xs`, `--tracking-wide`, `--transition-fast`, `--transition-normal`, `--weight-medium`, `--weight-normal`, `--weight-semi`, `--z-popover`, `--z-sticky`.

## Also exported from this folder

`escapePatternText`, `parsePattern`.
