# CopyValue

A value the user often copies, such as an address, a seed or a key, shown with a copy button at its end.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { CopyValue } from '@drizztdourden08/tessera';
```

The source is `src/primitives/CopyValue/CopyValue.tsx`. Its gallery page is Primitives · Display/CopyValue (`#/story/primitives-copyvalue--overview`).

## Where the questions lead here

What are you placing? A status, a count or a label. What does it show? A value to copy, such as an address or a key.

CopyValue keeps the value selectable and puts the copy button at its end, with the same check and announcement as every copy.

## Use it when

- A room address, a seed, a fingerprint or an ID sits in a status bar, a card or a dialog.
- A long value has to fit one line and still be copied whole.

## Use something else when

- The value has a label beside it, as one row of a readout. Use `StatRow` instead.
- The text to copy is not on screen, such as debug info. Use [CopyButton](CopyButton.md) instead.

## Rules

- Pass label as a short lower case name, such as room address, so the button reads Copy room address.
- Set mono for codes, keys, addresses and numbers the user may read back character by character.
- Use truncate middle for keys and fingerprints, where the last characters tell two values apart.

## Accessibility

- The value and its button form a group named by label.
- A cut value is read whole by a screen reader and shown whole on hover.
- The button says Copied through a polite status region after a copy.

## Example

```tsx
import { CopyValue } from '@drizztdourden08/tessera';

const RoomAddress = ({ address }: { address: string }) => (
  <CopyValue value={address} label="room address" mono truncate="middle" />
);
```

## Props

- `value`: `string`.
- `label` (optional): `string`.
- `mono` (optional): `boolean`. Default `false`.
- `truncate` (optional): `CopyValueTruncate`, one of `'end'`, `'middle'`.
- `copyLabel` (optional): `string`.
- `copiedLabel` (optional): `string`.
- `size` (optional): `CopyValueSize`, one of `'sm'`, `'md'`. Default `'sm'`.
- `onCopied` (optional): `() => void`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-text`, `--font-mono`, `--leading-tight`, `--size-1`, `--space-2xs`, `--space-xs`, `--text-base`, `--text-sm`.
