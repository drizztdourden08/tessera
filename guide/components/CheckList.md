# CheckList

The results of a list of checks, such as a connection test or a diagnostics report, each with its state, what was found and an optional fix.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { CheckList } from '@drizztdourden08/tessera';
```

The source is `src/composites/CheckList/CheckList.tsx`. Its gallery page is Composites · Content/CheckList (`#/story/composites-checklist--overview`).

## Where the questions lead here

What are you placing? Feedback. What are you telling the user? The results of a list of checks.

CheckList gives pass, advice and failure their own icon and colour, so a test result reads the same in every app.

## Use it when

- A test runs several checks and the user needs to see which passed, which only advise and which failed.
- The checks run one after another, so some are still checking or wait on another.

## Use something else when

- One long job with steps that run in order, with a bar and a log. Use [TaskProgress](TaskProgress.md) instead.
- One state shown alone, such as the state of a server. Use [Status](Status.md) instead.
- Labels and values read from a record, with no state. Use `FactsPanel` instead.

## Rules

- Name each check after what it tests, such as Game port, and write in detail what was found, such as port 38281 is in use.
- Keep warn for advice that does not stop the user, and fail for what must be fixed first.
- Give a failed check an action when the app can help fix it, such as Pick another port.
- Pass summary to say what the result means, such as Home NAS is not ready.

## Accessibility

- The list is a section named by label, Checks by default, and each check a list item.
- Each icon is named by its state word, and a check in progress is a Spinner named checking.
- The counts are a status region, so a screen reader hears them change as checks finish.

## Example

```tsx
import { CheckList } from '@drizztdourden08/tessera';
import type { Check } from '@drizztdourden08/tessera';

interface ServerTestProps {
  server: string;
  checks: Check[];
}

const ServerTest = ({ server, checks }: ServerTestProps) => {
  const ready = checks.every((check) => check.state === 'pass' || check.state === 'warn');
  return <CheckList summary={ready ? `${server} is ready` : `${server} is not ready`} checks={checks} />;
};
```

## Props

- `checks`: `readonly Check[]`.
- `summary` (optional): `ReactNode`.
- `compact` (optional): `boolean`. Default `false`.
- `label` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-danger`, `--c-danger-dim`, `--c-hairline`, `--c-inset`, `--c-success`, `--c-text`, `--c-text-dim`, `--c-text-muted`, `--c-warning`, `--radius-md`, `--size-20`, `--size-32`, `--size-48`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-base`, `--text-lg`, `--text-sm`, `--text-xs`, `--weight-semi`.
