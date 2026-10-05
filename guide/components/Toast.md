# Toast

A short message in a corner of the window that leaves on its own, raised with toast() from any part of the app and drawn by the one ToastStack.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { Toast } from '@drizztdourden08/tessera';
```

The source is `src/composites/Toast/Toast.tsx`. Its gallery page is Composites · Feedback/Toast (`#/story/composites-toast--overview`).

## Where the questions lead here

What are you placing? Feedback. What are you telling the user? A short message that passes.

Toast keeps one queue per app: every part raises through toast(), the stack caps how many show and the same message shows once with a count.

## Use it when

- Something finished or failed out of view, such as a save written or a sync lost, and the user should hear of it once.
- A failure can be tried again from the message itself, with an action such as Retry.

## Use something else when

- The note must stay on the page until the user acts. Use `Callout` instead.
- The user must answer before the app goes on. Use `Dialog` instead.

## Rules

- Mount one ToastStack at the root of the app and raise every toast with toast(); never draw a stack of your own.
- Keep the message to one short sentence that says what happened, such as Save state written to slot 3.
- Raise the same message again, not a new one: it joins the toast on screen and shows a count.
- Pass an id when the text changes but it is the same event, such as a sync count, so it still joins one toast.
- Set duration to 0 only when the toast carries an action the user must see.

## Accessibility

- The stack is a polite status region, so a screen reader reads each toast once.
- A danger toast is an alert and is read at once.
- A toast waits while the pointer or focus is on it, and gives focus back when it leaves.

## Example

```tsx
import { Button, ToastStack, toast } from '@drizztdourden08/tessera';

const AppRoot = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <ToastStack position="bottom-right" max={3} />
  </>
);

const SaveButton = ({ save }: { save: () => Promise<void> }) => (
  <Button
    onClick={() => save().then(
      () => toast({ variant: 'success', message: 'Save state written to slot 3.' }),
      () => toast({ variant: 'danger', message: 'The save could not be written.', duration: 0, action: { label: 'Retry', onSelect: () => void save() } }),
    )}
  >
    Save
  </Button>
);
```

## Props

- `item`: `ToastItem`.
- `onDismiss`: `(id: string) => void`.

## Tokens

It draws on `--border-width-thin`, `--c-danger`, `--c-danger-dim`, `--c-info`, `--c-secondary`, `--c-secondary-bright`, `--c-secondary-dim`, `--c-surface`, `--c-warning`, `--c-warning-dim`, `--font-mono`, `--font-sans`, `--leading-tight`, `--radius-md`, `--radius-pill`, `--shadow-dropdown`, `--size-384`, `--size-8`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xs`, `--text-base`, `--text-sm`, `--text-xs`, `--z-toast`.

## Also exported from this folder

`ToastStack`, `toast`.
