# Composer

A chat composer: one rounded box with a growing text input, a floating send button and an optional bar of tools.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { Composer } from '@drizztdourden08/tessera';
```

The source is `src/composites/Composer/Composer.tsx`. Its gallery page is Composites · Inputs/Composer (`#/story/composites-composer--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? Free text or a number. What shape is it? A chat message, sent with Enter.

Composer writes and sends one chat message in a rounded box.

## Use it when

- A person writes a message to a chat or an agent and sends it with Enter.
- The input should start on one line and grow with the text up to a limit.

## Use something else when

- The text needs a formatting toolbar and a preview. Use [MarkdownEditor](MarkdownEditor.md) instead.
- The field is part of a form with a label and a hint. Use `Textarea` instead.

## Rules

- Pass value and onChange to control the text. onSubmit receives the text when the person sends it.
- Enter sends and Shift+Enter starts a new line. Enter while typing with an input method does not send.
- The input grows from one line to maxRows lines, 8 by default, then scrolls.
- The default send button is disabled while the text is blank or the composer is disabled. Pass sendSlot to put your own.
- Busy shows a spinner on the default send button and stops Enter and the button from sending. The input stays editable.
- The send button floats at the bottom right inside the box, over the end of the input, which keeps room for it. The box starts as one row.
- Bar sits on the left of a foot row under the input: attachments, a model picker, a hint. The row shows, and slides in, only when bar is set.
- Give the composer an aria-label when no visible label names it.

## Accessibility

- Focus inside the box shows the focus ring on the whole box.
- The send button carries a text label from the Tessera strings.

## Example

```tsx
import { useState } from 'react';
import { Composer } from '@drizztdourden08/tessera';

const ChatInput = () => {
  const [text, setText] = useState('');
  return (
    <Composer
      value={text}
      onChange={setText}
      onSubmit={() => setText('')}
      placeholder="Write a message"
      aria-label="Message"
    />
  );
};
```

## Props

- `value`: `string`.
- `onChange`: `(value: string) => void`.
- `onSubmit`: `(value: string) => void`.
- `placeholder` (optional): `string`.
- `maxRows` (optional): `number`. Default `COMPOSER_MAX_ROWS`.
- `disabled` (optional): `boolean`. Default `false`.
- `busy` (optional): `boolean`. Default `false`.
- `sendSlot` (optional): `ReactNode`.
- `bar` (optional): `ReactNode`.
- `className` (optional): `string`.
- `aria-label` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-danger`, `--c-danger-soft`, `--c-primary`, `--c-primary-soft`, `--c-surface`, `--composer-send-room`, `--distance-enter`, `--duration-slow`, `--ease-emphasized`, `--radius-lg`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--transition-normal`.
