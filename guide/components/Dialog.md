# Dialog

A modal that asks one question, with a message, a confirm button and a cancel button, and room for a short body.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { Dialog } from '@drizztdourden08/tessera';
```

The source is `src/composites/Dialog/Dialog.tsx`. Its gallery page is Composites · Dialogs/Dialog (`#/story/composites-dialog--overview`).

## Where the questions lead here

What are you placing? Something over the page. What sits over the page? A question the user must answer.

Dialog holds a message and a confirm and a cancel button, and takes its width from its content within the size.

## Use it when

- The user must confirm an action, acknowledge a notice or answer a short question before going on.
- A short form or a block of text, such as a README or a list of details, sits under the message.

## Use something else when

- The dialog has its own layout, its own buttons or no question to answer. Use [DialogShell](DialogShell.md) instead.
- A long job runs and the user may hide it or cancel it. Use [JobDialog](JobDialog.md) instead.

## Rules

- Pick the size from the content: sm for a question, md for a form, lg for a README or a table; the default is sm.
- The width follows the content between the min and the max of the size, and never passes the window minus a margin.
- The height grows with the content up to the window minus a margin; the header and the buttons stay and only the body scrolls.
- Set steady when the width must not move while the content changes, such as an error that appears under a form.
- Use variant danger for an action that cannot be undone; focus then starts on cancel.

## Accessibility

- The dialog is modal and named by its title; Tab stays inside it and Escape cancels.
- Focus starts on confirm, or on cancel for danger, and returns to the opener on close.
- A body that scrolls keeps the header and the buttons in view.

## Example

```tsx
import { Dialog } from '@drizztdourden08/tessera';

const ReadmeDialog = ({ open, close }: { open: boolean; close: () => void }) => (
  <Dialog open={open} title="README" message="" size="lg" confirmLabel="Close" hideCancel onConfirm={close} onCancel={close}>
    Release notes go here.
  </Dialog>
);
```

## Props

- `open`: `boolean`.
- `title`: `string`.
- `message`: `string`.
- `confirmLabel` (optional): `string`. Default `common.confirm`.
- `cancelLabel` (optional): `string`. Default `common.cancel`.
- `confirmDisabled` (optional): `boolean`. Default `false`.
- `hideCancel` (optional): `boolean`. Default `false`.
- `variant` (optional): `'danger' | 'default'`. Default `'default'`.
- `size` (optional): `DialogSize`, one of `'sm'`, `'md'`, `'lg'`.
- `steady` (optional): `boolean`.
- `onConfirm`: `() => void`.
- `onCancel`: `() => void`.
- `id` (optional): `string`.
- `data` (optional): `DataAttributes`.
- `children` (optional): `React.ReactNode`.

## Tokens

It draws on `--space-lg`, `--text-sm`.
