# RetryButton

Tries a failed step again, such as a lost connection or a failed fetch, and counts down to the next automatic try.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { RetryButton } from '@drizztdourden08/tessera';
```

The source is `src/composites/RetryButton/RetryButton.tsx`. Its gallery page is Composites · Actions/RetryButton (`#/story/composites-retrybutton--overview`).

## Where the questions lead here

What are you placing? Actions. One action, or several related buttons? One action. What does the action look like? Tries a failed step again.

RetryButton says how long until the next automatic try and lets the user skip the wait, with one look for every retry.

## Use it when

- A connection closed or failed and the user can start it again.
- The app tries again by itself after a wait and the user should see how long, or skip the wait.

## Use something else when

- The action is not a second try of something that failed. Use `Button` instead.
- The failure belongs to a long job with steps and a log. Use [TaskProgress](TaskProgress.md) instead.

## Rules

- Keep the timer in the app: pass retryAt, the time of the next automatic try, and start that try from the app, never from the button.
- Pass attempt and attempts only when the app stops after a fixed number of tries.
- Set retrying while a try runs, so the button shows a spinner and takes no second click.
- Put it at the end of the row that says what failed, with the reason in the text before it.

## Accessibility

- The button is named Retry, or Retry now while a countdown runs.
- The countdown line describes the button, so it is read on focus and not every second.

## Example

```tsx
import { RetryButton } from '@drizztdourden08/tessera';

const Reconnect = ({ nextTry, onRetry }: { nextTry: number | null; onRetry: () => void }) => (
  <RetryButton onRetry={onRetry} retryAt={nextTry} attempt={2} attempts={5} />
);
```

## Props

- `onRetry`: `() => void`.
- `retryAt` (optional): `number | null`.
- `attempt` (optional): `number`.
- `attempts` (optional): `number`.
- `retrying` (optional): `boolean`. Default `false`.
- `label` (optional): `string`.
- `variant` (optional): `ButtonVariant`, one of `'primary'`, `'secondary'`, `'tertiary'`, `'danger'`, `'warning'`, `'info'`, `'success'`, `'ghost'`. Default `'secondary'`.
- `size` (optional): `ButtonSize`, one of `'sm'`, `'md'`. Default `'sm'`.
- `fullWidth` (optional): `boolean`.
- `active` (optional): `boolean`.

It also takes the 286 attributes it inherits through `Omit<ButtonProps, 'onClick' | 'children' | 'icon' | 'loading'>`, `ButtonHTMLAttributes<HTMLButtonElement>`.

## Tokens

It draws on `--c-text-dim`, `--space-sm`, `--space-xs`, `--text-sm`.
