# Card

One raised surface that groups related content, with an optional header, and that can act as one target when pressed.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { Card } from '@drizztdourden08/tessera';
```

The source is `src/primitives/Card/Card.tsx`. Its gallery page is Primitives · Layout/Card (`#/story/primitives-card--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? One raised item.

Card is the raised surface that groups related content and can open a detail view when pressed.

## Use it when

- Related content sits together on a raised surface, with or without a title and actions.
- The whole card opens a detail view when pressed, while buttons and menus inside it keep their own jobs.

## Use something else when

- The whole surface is one button with no inner controls. Use `Pressable` instead.
- A plain block with no raised look. Use [Box](Box.md) instead.

## Rules

- Give the card a title for a header, or a header node for a custom one; without either it is a bare surface.
- OnActivate makes the surface focusable and fires on a click and on Enter or Space when the card itself has focus. The look is interactive unless a variant is given.
- OnActivate never fires from an inner button, link, field, menu or editable text, nor from a menu drawn in a portal.
- Pass surface glass for the translucent acrylic look: a blurred fill, a bright top edge and a soft shadow. It needs something behind it to show; variant stays separate and still sets the tone.
- Glass falls back to an opaque fill where blur is not supported or the user asks for reduced transparency, so text keeps its contrast.
- The card gets no button role, since it may hold buttons. Pass aria-label to name it.

## Accessibility

- With onActivate the card is a Tab stop; Enter and Space activate it only while the card itself has focus.
- Every action reachable by pressing the card is also reachable by a real button or link inside it.

## Example

```tsx
import { Button, Card } from '@drizztdourden08/tessera';

const openDetail = () => undefined;
const archive = () => undefined;

const Task = () => (
  <Card title="Fix the login form" aria-label="Task: Fix the login form" onActivate={openDetail}>
    <Button onClick={archive}>Archive</Button>
  </Card>
);

const Floating = () => (
  <Card title="Now playing" surface="glass">
    Over a picture or a map, the card blurs what is behind it.
  </Card>
);
```

## Props

- `header` (optional): `ReactNode`.
- `variant` (optional): `CardVariant`, one of `'default'`, `'interactive'`, `'danger'`.
- `surface` (optional): `Surface`, one of `'solid'`, `'glass'`.
- `edgeTone` (optional): `CardTone`, one of `'neutral'`, `'primary'`, `'info'`, `'success'`, `'warning'`, `'danger'`.
- `edge` (optional): `CardEdge`, one of `'left'`, `'border'`.
- `fill` (optional): `boolean`.
- `flush` (optional): `boolean`.
- `container` (optional): `boolean`.
- `onActivate` (optional): `() => void`.
- `children`: `ReactNode`.
- `title` (optional): `ReactNode`.
- `subtitle` (optional): `ReactNode`.
- `actions` (optional): `ReactNode`.
- `count` (optional): `number`.
- `hideZero` (optional): `boolean`.
- `tone` (optional): `CardTone`, one of `'neutral'`, `'primary'`, `'info'`, `'success'`, `'warning'`, `'danger'`.
- `level` (optional): `HeadingLevel`, one of `1`, `2`, `3`, `4`, `5`, `6`.

It also takes the 276 attributes it inherits through `Omit<HTMLAttributes<HTMLDivElement>, 'title'>`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-danger`, `--c-danger-bright`, `--c-danger-dim`, `--c-focus`, `--c-glass-border`, `--c-glass-edge`, `--c-glass-fill`, `--c-glass-solid`, `--c-info`, `--c-info-bright`, `--c-primary`, `--c-primary-bright`, `--c-success`, `--c-success-bright`, `--c-surface`, `--c-warning`, `--c-warning-bright`, `--glass-blur`, `--glass-saturate`, `--radius-lg`, `--shadow-glass`, `--size-4`, `--size-40`, `--space-md`, `--space-sm`, `--space-xs`, `--transition-normal`.
