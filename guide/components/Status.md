# Status

A read-only word for the state something is in, given as a word and a tone, or as a key of a table of states declared once.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { Status } from '@drizztdourden08/tessera';
```

The source is `src/primitives/Status/Status.tsx`. Its gallery page is Primitives · Display/Status (`#/story/primitives-status--overview`).

## Where the questions lead here

What are you placing? A status, a count or a label. What does it show? The state something is in.

Status draws one word in the tone of its state; with a table from defineStatuses, a state reads the same on every screen.

## Use it when

- A connection, a sync, a session or a draft shows its state beside its name.
- A kind of state, such as a session or an engine, shows on more than one screen, so its words and tones live in one table.

## Use something else when

- The value is a count, or a dot for news. Use `Badge` instead.
- The value sorts an item into a group the user can filter on. Use `Tag` instead.
- The state is a step in a task the user walks through. Use `Stepper` instead.

## Rules

- Pass a word and a tone for a state that shows in one place; pass map and value for a kind of state that shows on several screens.
- Declare each table once with defineStatuses, in a constants file beside the model it describes, and import it where the state shows.
- Give every word in sentence case; the pill variant sets it in capitals itself.
- Set pulse only on states that are still moving, such as starting or syncing.
- Pass fallback for a value that can be missing, such as a state not fetched yet.

## Accessibility

- The word is the text a screen reader reads; the tone, the dot and the icon add nothing it needs.
- Add role status when the state changes while the user watches, so the new word is announced.
- An icon from a table is hidden from screen readers and takes the place of the dot.

## Example

```tsx
import { defineStatuses, Status } from '@drizztdourden08/tessera';

const ENGINE_STATES = defineStatuses({
  ready: { label: 'Ready', tone: 'success' },
  building: { label: 'Setting up', tone: 'warning', pulse: true },
  failed: { label: 'Broken', tone: 'danger' },
  unknown: { label: 'Checking', tone: 'neutral' },
});

const Sync = () => <Status tone="warning" dot pulse>Syncing</Status>;

const EngineState = ({ state }: { state?: 'ready' | 'building' | 'failed' }) => (
  <Status map={ENGINE_STATES} value={state} fallback="unknown" dot />
);
```

## Props

- `tone` (optional): `StatusTone`, one of `'danger'`, `'info'`, `'neutral'`, `'primary'`, `'secondary'`, `'success'`, `'tertiary'`, `'warning'`.
- `pulse` (optional): `boolean`.
- `children` (optional): `ReactNode`.
- `map` (optional): `Map`.
- `value` (optional): `StatusKey<Map> | null | undefined`.
- `fallback` (optional): `StatusKey<Map>`.
- `variant` (optional): `StatusVariant`, one of `'text'`, `'pill'`. Default `'text'`.
- `dot` (optional): `boolean`. Default `false`.

It also takes the 277 attributes it inherits through `HTMLAttributes<HTMLSpanElement>`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-danger`, `--c-danger-bright`, `--c-danger-dim`, `--c-danger-soft`, `--c-info`, `--c-info-bright`, `--c-info-dim`, `--c-info-soft`, `--c-primary`, `--c-primary-bright`, `--c-primary-dim`, `--c-primary-soft`, `--c-secondary`, `--c-secondary-bright`, `--c-secondary-dim`, `--c-secondary-soft`, `--c-success`, `--c-success-bright`, `--c-success-dim`, `--c-success-soft`, `--c-sunken`, `--c-tertiary`, `--c-tertiary-bright`, `--c-tertiary-dim`, `--c-tertiary-soft`, `--c-text-dim`, `--c-text-muted`, `--c-warning`, `--c-warning-bright`, `--c-warning-dim`, `--c-warning-soft`, `--radius-pill`, `--radius-round`, `--size-6`, `--space-sm`, `--space-xs`, `--text-sm`, `--text-xs`, `--tracking-wide`, `--weight-semi`.

## Also exported from this folder

`defineStatuses`.
