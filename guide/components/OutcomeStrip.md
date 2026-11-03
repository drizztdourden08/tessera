# OutcomeStrip

A row of small cells, one per step of a test plan, each toned by its outcome, with the current step outlined and its label on hover.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { OutcomeStrip } from '@drizztdourden08/tessera';
```

The source is `src/composites/OutcomeStrip/OutcomeStrip.tsx`. Its gallery page is Composites · Feedback/OutcomeStrip (`#/story/composites-outcomestrip--overview`).

## Where the questions lead here

What are you placing? A status, a count or a label. What does it show? One cell per step, toned by its outcome.

OutcomeStrip is the row of toned cells that shows how each step of a plan ended.

## Use it when

- A card or a runner shows how far a list of steps has got and how each one ended.
- The user may jump to a step by pressing its cell.

## Use something else when

- The steps are numbered stages of one task with a current position. Use `Stepper` instead.
- The row shows parts of one total as proportions. Use [StackedBar](StackedBar.md) instead.

## Rules

- Pass steps. A step has an id, an outcome and a label. The strip keeps no state.
- Outcome is pass, fail, partial, blocked, skip, pending or current. Pass is green, fail red, partial amber, blocked blue, skip faint and pending an empty cell. Current is an empty cell with an outline.
- Size xs is for a card and sm is for a runner. sm is the default.
- The label of a step shows in a tooltip on hover and focus and is the name of the cell.
- Pass onSelect and every cell becomes a button that calls it with the step id. Without it the cells are static.
- The cells wrap to the next line when there are more than the row can hold.

## Accessibility

- With onSelect the strip is a toolbar with one Tab stop, on the current cell or the last one focused. Left and Right arrows, Home and End move between cells; Enter and Space select.
- Without onSelect the strip is a group of images named by their labels.
- The current cell has aria-current step and an outline, so the outcome is not shown by colour alone.

## Example

```tsx
import { OutcomeStrip } from '@drizztdourden08/tessera';

const opened: string[] = [];
const openStep = (id: string) => opened.push(id);

const steps = [
  { id: 't1', outcome: 'pass', label: 'Sign in' },
  { id: 't2', outcome: 'fail', label: 'Reset password' },
  { id: 't3', outcome: 'current', label: 'Change email' },
  { id: 't4', outcome: 'pending', label: 'Delete account' },
] as const;

const Runner = () => <OutcomeStrip aria-label="Test plan" steps={steps} size="sm" onSelect={openStep} />;
```

## Props

- `steps`: `readonly OutcomeStep[]`.
- `onSelect` (optional): `(id: string) => void`.
- `size` (optional): `OutcomeSize`, one of `'xs'`, `'sm'`. Default `'sm'`.
- `aria-label` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-danger`, `--c-danger-bright`, `--c-focus`, `--c-info`, `--c-info-bright`, `--c-inset`, `--c-primary`, `--c-success`, `--c-success-bright`, `--c-text-dim`, `--c-text-dim-soft`, `--c-warning`, `--c-warning-bright`, `--radius-sm`, `--size-1`, `--size-12`, `--size-16`, `--size-2`, `--size-24`, `--size-8`, `--space-2xs`.
