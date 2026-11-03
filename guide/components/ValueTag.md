# ValueTag

A read only value of an option: a tag for text and numbers, a True or False pill for a switch, with an optional label before it.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ValueTag } from '@drizztdourden08/tessera';
```

The source is `src/composites/ValueTag/ValueTag.tsx`. It has no gallery page yet.

## A building block

No question in [decide.md](../decide.md) leads here. Other components are built on it.

## Use it when

- A view shows the options of a game or preset without letting the user change them.
- An OptionRow control column shows the chosen value instead of an input.

## Use something else when

- The tag is a label the user can click or remove. Use `Tag` instead.
- The value is a state with a tone, such as running or failed. Use [Status](Status.md) instead.

## Rules

- Pass a boolean to get the True or False pill, and a string or a number to get a plain tag.
- Pass label for the name of the value, written before the tag.
- Pass compact for the narrow form: the label is smaller and breaks anywhere.

## Accessibility

- The value is written as text, not shown by colour alone.

## Example

```tsx
import { ValueTag } from '@drizztdourden08/tessera';

const Shuffle = () => <ValueTag value label="Shuffle" />;
```

## Props

- `value`: `boolean | string | number`.
- `label` (optional): `ReactNode`.
- `compact` (optional): `boolean`. Default `false`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-text`, `--leading-tight`, `--space-sm`, `--text-sm`, `--text-xs`.
