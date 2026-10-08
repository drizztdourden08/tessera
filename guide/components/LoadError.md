# LoadError

What to show when something fails to load: one plain sentence, a Retry button and the raw error behind Details.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { LoadError } from '@drizztdourden08/tessera';
```

The source is `src/composites/LoadError/LoadError.tsx`. Its gallery page is Composites · Feedback/LoadError (`#/story/composites-loaderror--overview`).

## Where the questions lead here

What are you placing? Feedback. What are you telling the user? Something failed to load, with Retry.

LoadError draws every failed load the same way: a sentence, Retry and the raw error behind Details.

## Use it when

- A list, a screen or a section could not load its data, such as the server list or the sessions page.
- A choice could not load its options, such as the sound devices in a settings row.

## Use something else when

- The load worked and there is nothing to show. Use `EmptyState` instead.
- A long job with steps and a log failed. Use [TaskProgress](TaskProgress.md) instead.
- A part threw while it rendered. Use `ErrorBoundary` instead.

## Rules

- Write message as one plain sentence that says what failed, such as Could not load your servers; never the raw error.
- Pass the raw failure as error, an Error, a string or an object: it waits behind Details, closed, so the user can copy it into a report.
- Pass onRetry when the load can run again, and set retrying while it runs so the button spins and takes no second click.
- Use variant center to fill a list pane or a screen, box inside a section, and inline in a row.
- ItemList, ErrorBoundary and SettingsRow draw it from their own props; reach for it directly in other places.

## Accessibility

- The sentence is an alert, so a screen reader reads it once when the load fails.
- Details is the browser details element, and the raw text scrolls by keyboard once it takes focus.

## Example

```tsx
import { LoadError } from '@drizztdourden08/tessera';

interface SessionsFailedProps {
  error: unknown;
  reloading: boolean;
  reload: () => void;
}

const SessionsFailed = ({ error, reloading, reload }: SessionsFailedProps) => (
  <LoadError message="Could not load your sessions." error={error} onRetry={reload} retrying={reloading} />
);
```

## Props

- `message`: `ReactNode`.
- `error` (optional): `unknown`.
- `onRetry` (optional): `() => void`.
- `retrying` (optional): `boolean`. Default `false`.
- `retryAt` (optional): `number | null`.
- `variant` (optional): `LoadErrorVariant`, one of `'center'`, `'box'`, `'inline'`. Default `'center'`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-danger`, `--c-danger-bright`, `--c-primary`, `--c-sunken`, `--c-text`, `--c-text-dim`, `--font-mono`, `--leading-normal`, `--radius-sm`, `--size-192`, `--size-28`, `--size-512`, `--space-2xs`, `--space-lg`, `--space-sm`, `--space-xs`, `--text-sm`, `--text-xs`.
