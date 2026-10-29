# FloatingPrompt

A bar at the foot of a region that asks a question with actions such as Apply and Cancel, and blocks the region until the user answers.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { FloatingPrompt } from '@drizztdourden08/tessera';
```

The source is `src/composites/FloatingPrompt/FloatingPrompt.tsx`. Its gallery page is Composites · Feedback/FloatingPrompt (`#/story/composites-floatingprompt--overview`).

## Where the questions lead here

What are you placing? Feedback. What are you telling the user? A question that blocks one region until it is answered.

FloatingPrompt asks the user to answer before going on in one region, with actions from data and the look of a Toast.

## Use it when

- The user must answer before going on in one area, such as applying or dropping a change to a canvas, while the rest of the app stays usable.
- A question needs actions that stay on screen until chosen, in the look of a Toast.

## Use something else when

- The whole app must wait for the answer. Use [Dialog](Dialog.md) instead.
- A short message passes by itself and needs no answer. Use [Toast](Toast.md) instead.
- A note stays on the page and blocks nothing. Use [Callout](Callout.md) instead.

## Rules

- Put it in a positioned parent, beside the region it blocks: it covers that parent and its siblings go inert.
- Set scope to window only when the whole page must wait; it then covers the window and everything outside the bar goes inert.
- Pass actions as data, each with an id, a label and onSelect; the app owns open and closes it from onSelect.
- Mark one action cancel for the way out: Escape runs it, and it draws as a ghost button.
- Keep the message to one short sentence that says what will happen, such as Apply the 3 pending edits to the canvas.
- Use variant for the tone, the same names as Toast; info is the default.

## Accessibility

- The bar is an alert dialog that is not modal to the app: a screen reader reads its message at once, and only the region it covers is out of reach.
- On open focus moves to the first action, Tab stays in the bar, and on close focus returns to where it was.
- The siblings of the bar in its parent are inert while it is open, so the region gets no pointer or keyboard input.
- Escape runs the action marked cancel; with none, Escape does nothing.
- Pass label when the message is not enough to name the bar; otherwise the message names it.
- Under reduced motion the bar and its layer appear with no animation.

## Example

```tsx
import { FloatingPrompt } from '@drizztdourden08/tessera';
import type { ReactNode } from 'react';

interface CanvasAreaProps {
  canvas: ReactNode;
  pending: number;
  apply: () => void;
  cancel: () => void;
}

const CanvasArea = ({ canvas, pending, apply, cancel }: CanvasAreaProps) => (
  <div style={{ position: 'relative' }}>
    {canvas}
    <FloatingPrompt
      open={pending > 0}
      message={`Apply the ${pending} pending edits to the canvas.`}
      actions={[
        { id: 'apply', label: 'Apply', onSelect: apply },
        { id: 'cancel', label: 'Cancel', onSelect: cancel, cancel: true },
      ]}
    />
  </div>
);
```

## Props

- `open`: `boolean`.
- `message`: `string`.
- `actions`: `readonly FloatingPromptAction[]`.
- `variant` (optional): `ToastVariant`, one of `'danger'`, `'warning'`, `'info'`, `'success'`. Default `'info'`.
- `scope` (optional): `FloatingPromptScope`, one of `'container'`, `'window'`. Default `'container'`.
- `label` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--space-sm`, `--space-xs`.
