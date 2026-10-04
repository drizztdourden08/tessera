# StatusOf

Draws one state from a table of states declared once with defineStatuses, so a state reads the same on every screen.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { StatusOf } from '@drizztdourden08/tessera';
```

The source is `src/primitives/StatusOf/StatusOf.tsx`. Its gallery page is Primitives · Display/StatusOf (`#/story/primitives-statusof--overview`).

## Where the questions lead here

What are you placing? A status, a count or a label. What does it show? One of a set of states, declared once.

StatusOf reads the label, the tone, the pulse and the icon from one typed table, so a state cannot drift between screens.

## Use it when

- A kind of state, such as a session, a player or an engine, shows on more than one screen.
- An app keeps a table that maps each state to a label and a tone, and draws a Status from it by hand.

## Use something else when

- One state shows in one place and has no table behind it. Use `Status` instead.
- The state is a step in a task the user walks through. Use `Stepper` instead.

## Rules

- Declare each table once with defineStatuses, in a constants file beside the model it describes, and import it where the state shows.
- Give every key a label in sentence case; the pill variant sets it in capitals itself.
- Set pulse only on states that are still moving, such as starting or generating.
- Pass fallback for a value that can be missing, such as a state not fetched yet.

## Accessibility

- The label is the text a screen reader reads; the tone, the dot and the icon add nothing it needs.
- An icon is hidden from screen readers and takes the place of the dot.

## Example

```tsx
import { defineStatuses, StatusOf } from '@drizztdourden08/tessera';

const ENGINE_STATES = defineStatuses({
  ready: { label: 'Ready', tone: 'success' },
  building: { label: 'Setting up', tone: 'warning', pulse: true },
  failed: { label: 'Broken', tone: 'danger' },
  unknown: { label: 'Checking', tone: 'neutral' },
});

const EngineState = ({ state }: { state?: 'ready' | 'building' | 'failed' }) => (
  <StatusOf map={ENGINE_STATES} value={state} fallback="unknown" dot />
);
```

## Props

- `map`: `Map`.
- `value`: `StatusKey<Map> | null | undefined`.
- `fallback` (optional): `StatusKey<Map>`.
- `variant` (optional): `StatusVariant`, one of `'text'`, `'pill'`.
- `dot` (optional): `boolean`.

It also takes the 277 attributes it inherits through `Omit<StatusProps, 'tone' | 'pulse' | 'children'>`, `HTMLAttributes<HTMLSpanElement>`.

## Also exported from this folder

`defineStatuses`.
