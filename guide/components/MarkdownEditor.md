# MarkdownEditor

A multi-line field for writing Markdown, with a toolbar for bold, italic, lists, links and code, and a live preview drawn by Markdown.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { MarkdownEditor } from '@drizztdourden08/tessera';
```

The source is `src/composites/MarkdownEditor/MarkdownEditor.tsx`. Its gallery page is Composites · Inputs/MarkdownEditor (`#/story/composites-markdowneditor--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? Free text or a number. What shape is it? Markdown text, with a live preview.

MarkdownEditor writes Markdown with a toolbar and a live preview, the same way in every app.

## Use it when

- The user writes a note, a description or a release text that is stored as Markdown.
- The user should see how the text will look while they write it.

## Use something else when

- The text is plain, with no formatting. Use `Textarea` instead.
- The app only shows a Markdown text and nobody edits it. Use [Markdown](Markdown.md) instead.
- The text is structured data, such as JSON. Use [DynamicInput](DynamicInput.md) instead.

## Rules

- Own the text in the app and pass it as value, with onChange; the editor keeps no copy of it.
- Leave layout out to get split on a wide container and Write and Preview tabs on a narrow one.
- Set layout to split to keep both panes, which stack under a narrow container, or to tabs to keep the preview behind its tab.
- Pass onLink in a desktop app so a link in the preview opens in the system browser.
- Pass label, hint, error, placeholder and disabled as for any other field; set rows to change the height of the text, 12 by default.
- The toolbar acts on the selection: it wraps it, or puts a prefix on each line it touches, and a second press removes the mark.
- Enter at the end of a list item starts the next one: a bullet, a number that counts up, or an open task; on an empty item it ends the list.
- Tab indents a list line by two spaces and Shift+Tab takes them back; outside a list Tab moves the focus as usual.
- Backspace right after an empty marker removes the marker; typing - [] and a space makes a task item.
- Mod+B is bold, Mod+I is italic and Mod+K is a link, shown in the tooltip of each button.
- Pass onSubmit to send the text on Mod+Enter; it gets the current value.
- Pass onEscape to leave the editor on Escape; it is not called while a menu or popover is open, or when another part has taken the key.
- Pass maxLength to stop the text at that length; a counter shows in the last 10 percent of the limit, such as 95 / 100.
- Edits go through the browser, so Undo and Redo keep working after a toolbar button.

## Accessibility

- The toolbar is a toolbar with a name, and every button is named by a word, never by its icon alone.
- A button with a shortcut says it in its tooltip and in aria-keyshortcuts.
- The tabs are real tabs; the toolbar is off while the preview is shown.
- The preview is a region named Preview, so a screen reader can jump to it.

## Example

```tsx
import { useState } from 'react';
import { MarkdownEditor } from '@drizztdourden08/tessera';

const NoteField = ({ openExternal }: { openExternal: (href: string) => void }) => {
  const [note, setNote] = useState('');
  return <MarkdownEditor label="Note" value={note} onChange={setNote} onLink={openExternal} />;
};
```

## Props

- `value`: `string`.
- `onChange`: `(value: string) => void`.
- `label` (optional): `ReactNode`.
- `hint` (optional): `ReactNode`.
- `error` (optional): `ReactNode`.
- `placeholder` (optional): `string`.
- `disabled` (optional): `boolean`. Default `false`.
- `layout` (optional): `MarkdownEditorLayout`, one of `'split'`, `'tabs'`.
- `rows` (optional): `number`. Default `DEFAULT_ROWS`.
- `onLink` (optional): `MarkdownLinkHandler`.
- `onSubmit` (optional): `(value: string) => void`.
- `onEscape` (optional): `() => void`.
- `maxLength` (optional): `number`.
- `className` (optional): `string`.
- `aria-label` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-surface`, `--radius-md`, `--size-192`, `--size-384`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-xs`.
