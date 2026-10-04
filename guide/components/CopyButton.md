# CopyButton

A button that copies a text to the clipboard and confirms it with a check and the word Copied.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { CopyButton } from '@drizztdourden08/tessera';
```

The source is `src/primitives/CopyButton/CopyButton.tsx`. Its gallery page is Primitives · Actions/CopyButton (`#/story/primitives-copybutton--overview`).

## Where the questions lead here

What are you placing? Actions. One action, or several related buttons? One action. What does the action look like? Copies a text.

CopyButton writes to the clipboard through the one copy path every Tessera part uses, with the same check and announcement.

## Use it when

- One action copies something the user does not see in full, such as debug info or a whole log.
- A panel needs a copy action beside its other buttons, with or without its word.

## Use something else when

- The value itself is on screen and the copy belongs at its end. Use [CopyValue](CopyValue.md) instead.
- A label and its value sit on one row, as a readout. Use `StatRow` instead.

## Rules

- Name the button after what it copies, such as Copy address or Copy debug info.
- Pass a function as text when the text is costly to build or changes often, so it is built at the click.
- Keep it icon only in tight rows and toolbars; show the word where the button stands alone.

## Accessibility

- An icon only button is named by its label and shows the same name as a tooltip.
- After a copy, a polite status region says Copied once, and the name reads Copied for two seconds.

## Example

```tsx
import { CopyButton } from '@drizztdourden08/tessera';

const AboutActions = ({ debugInfo }: { debugInfo: () => string }) => (
  <CopyButton text={debugInfo} label="Copy debug info" showLabel variant="secondary" />
);
```

## Props

- `text`: `CopyText`.
- `label` (optional): `string`.
- `copiedLabel` (optional): `string`.
- `showLabel` (optional): `boolean`.
- `variant` (optional): `ButtonVariant`, one of `'primary'`, `'secondary'`, `'tertiary'`, `'danger'`, `'warning'`, `'info'`, `'success'`, `'ghost'`.
- `size` (optional): `CopyButtonSize`, one of `'xs'`, `'sm'`, `'md'`.
- `disabled` (optional): `boolean`.
- `loading` (optional): `boolean`.
- `onCopied` (optional): `() => void`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-success`, `--size-1`.
