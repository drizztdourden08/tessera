# Disclosure

A line, such as Details or Show log, that shows or hides the content under it when clicked.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { Disclosure } from '@drizztdourden08/tessera';
```

The source is `src/primitives/Disclosure/Disclosure.tsx`. Its gallery page is Primitives · Display/Disclosure (`#/story/primitives-disclosure--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? More content behind a line that shows or hides it.

Disclosure shows or hides what is under one line with the browser details element, with one look for every app.

## Use it when

- Some content helps only a few readers, such as the raw text of an error, a log or long release notes.
- A list of groups where each one opens on its own, such as the records that point at the one being edited.

## Use something else when

- The views are peers and only one shows at a time. Use `Tabs` instead.
- The content needs the whole screen or an answer. Use `Dialog` instead.
- A failed load with its raw error. Use [LoadError](LoadError.md) instead.

## Rules

- Write summary as what opens, such as Details, What is new or Show log (24).
- Pass defaultOpen to start it open, and onOpenChange to hear each toggle, such as to load a log only once it opens.
- A later change to defaultOpen opens or closes it, so a part can open it when a job fails.
- Pass open with onOpenChange when the app holds the state, such as Open all over a list of groups; a click then only asks.
- Use size sm for a line in small text, such as inside a settings row.
- Pass bodyClassName to lay out the body, such as a column of rows with a gap, in place of a selector on its class.

## Accessibility

- It is the browser details element: Enter and Space toggle the line, and screen readers say whether it is open.
- Closed content stays in the page, so find in page still reaches it.

## Example

```tsx
import { Disclosure, Paragraph } from '@drizztdourden08/tessera';

const ReleaseNotes = ({ notes }: { notes: string }) => (
  <Disclosure summary="What is new">
    <Paragraph tone="dim">{notes}</Paragraph>
  </Disclosure>
);
```

## Props

- `summary`: `ReactNode`.
- `children`: `ReactNode`.
- `open` (optional): `boolean`.
- `defaultOpen` (optional): `boolean`. Default `false`.
- `onOpenChange` (optional): `(open: boolean) => void`.
- `size` (optional): `DisclosureSize`, one of `'sm'`, `'md'`. Default `'md'`.
- `className` (optional): `string`.
- `bodyClassName` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-hover`, `--c-primary`, `--c-text`, `--c-text-dim`, `--duration-fast`, `--ease-standard`, `--radius-sm`, `--space-2xs`, `--space-xs`, `--text-sm`, `--text-xs`.
