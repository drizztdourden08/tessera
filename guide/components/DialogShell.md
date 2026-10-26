# DialogShell

The frame of a modal: a backdrop, a panel with a header and a close button, a scrolling body and a row of actions.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { DialogShell } from '@drizztdourden08/tessera';
```

The source is `src/composites/DialogShell/DialogShell.tsx`. Its gallery page is Composites · Dialogs/DialogShell (`#/story/composites-dialogshell--overview`).

## Where the questions lead here

What are you placing? Something over the page. What sits over the page? A dialog with its own layout.

DialogShell gives the frame, the focus and the scrolling body, and leaves the content and the buttons to you.

## Use it when

- The dialog has its own body and its own buttons, such as a details view, a form or a README.
- A composite needs a modal frame with focus, Escape and the backdrop handled for it.

## Use something else when

- The dialog asks one question with confirm and cancel. Use [Dialog](Dialog.md) instead.
- A long job runs and the user may hide it or cancel it. Use [JobDialog](JobDialog.md) instead.

## Rules

- Pass size sm, md or lg; each has a min and a max width from tokens, and the default is sm.
- The width follows the content between the min and the max, and never passes the window minus a margin.
- The height grows with the content up to the window minus a margin; the header and the actions stay and only the body scrolls.
- Set steady to pin the width to the max of the size, for a body whose content changes, such as a wizard step or an error line.
- Set dismissable to false while a save runs, so only your own actions close it.

## Accessibility

- The panel has role dialog and aria-modal, and the title names it.
- Tab and Shift+Tab stay inside; Escape and the close button close it unless it is not dismissable.
- Focus moves in on open and returns to the opener on close.

## Example

```tsx
import { Button, DialogShell } from '@drizztdourden08/tessera';

const DetailsDialog = ({ open, close }: { open: boolean; close: () => void }) => (
  <DialogShell open={open} onClose={close} title="Friday async" size="md" actions={<Button onClick={close}>Close</Button>}>
    Eight players are connected.
  </DialogShell>
);
```

## Props

- `open`: `boolean`.
- `onClose`: `() => void`.
- `dismissable` (optional): `boolean`. Default `true`.
- `title` (optional): `ReactNode`.
- `titleWrap` (optional): `boolean`.
- `headerExtra` (optional): `ReactNode`.
- `actions` (optional): `ReactNode`.
- `size` (optional): `DialogSize`, one of `'sm'`, `'md'`, `'lg'`.
- `steady` (optional): `boolean`.
- `className` (optional): `string`.
- `initialFocusRef` (optional): `RefObject<HTMLElement | null>`.
- `initialFocus` (optional): `DialogInitialFocus`, one of `'first'`, `'dialog'`. Default `'first'`.
- `id` (optional): `string`.
- `data` (optional): `DataAttributes`.
- `children` (optional): `ReactNode`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-scrim`, `--c-surface`, `--dialog-fit`, `--dialog-margin`, `--dialog-min-lg`, `--dialog-min-md`, `--dialog-min-sm`, `--dialog-w-lg`, `--dialog-w-md`, `--dialog-w-sm`, `--radius-lg`, `--shadow-lg`, `--space-lg`, `--space-md`, `--space-sm`.
