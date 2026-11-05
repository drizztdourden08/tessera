# ContentSwap

Shows its content and, when the key changes, moves from the old content to the new with a fade, a slide, a scale or a reflow of its items, without the layout jumping.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { ContentSwap } from '@drizztdourden08/tessera';
```

The source is `src/primitives/ContentSwap/ContentSwap.tsx`. Its gallery page is Primitives · Layout/ContentSwap (`#/story/primitives-contentswap--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? Content that changes with a key.

ContentSwap replaces content in place and animates the change when its key changes.

## Use it when

- A panel shows one of several views, and the change should read as a change, such as a wizard step or a detail pane.
- The content is replaced in the same place, and the key says when it is a different thing.

## Use something else when

- A set of slides the user pages through with controls. Use [Carousel](Carousel.md) instead.
- Content that only shows or hides in place. Use [Disclosure](Disclosure.md) instead.

## Rules

- Give swapKey a value that changes only when the content is a different thing, not on every render.
- Pick the effect by meaning: fade for a replacement, slide for steps with a direction, scale for a detail that opens.
- Use reflow around a list: the items inside collapse and fade, then the new items grow in. Items take part when they carry data-swap-item; KanbanBoard cards, ItemList rows, ListItemRow and DataTable rows already do. The frame around the items does not move.
- Set direction to back for a slide that goes to an earlier step.
- Set sequence to out-in for tab panels whose contents should never mix: the old content fades out and is removed, then the new content shows. The default overlap crossfades both at once.
- In out-in a quick second change shows only the newest content; the one that never appeared is skipped.
- The old content stays on screen for the length of the motion, then is dropped; it is a copy, so it does not take input.

## Accessibility

- The leaving content is hidden from assistive tools; only the new content is read.
- Under reduced motion the content swaps at once in both sequences, with no animation.

## Example

```tsx
import { ContentSwap, ItemList, Text } from '@drizztdourden08/tessera';

const StepPanel = ({ step }: { step: number }) => (
  <ContentSwap swapKey={step} effect="slide">
    <Text>Current step</Text>
  </ContentSwap>
);

const TabPanel = ({ tab }: { tab: string }) => (
  <ContentSwap swapKey={tab} sequence="out-in">
    <Text>{tab}</Text>
  </ContentSwap>
);

interface Task {
  id: string;
  name: string;
}

const ReflowList = ({ view, tasks }: { view: string; tasks: Task[] }) => (
  <ContentSwap swapKey={view} effect="reflow">
    <ItemList title="Tasks" items={tasks} getId={(task) => task.id} getName={(task) => task.name} />
  </ContentSwap>
);
```

## Props

- `swapKey`: `string | number`.
- `children` (optional): `ReactNode`.
- `effect` (optional): `ContentSwapEffect`, one of `'fade'`, `'slide'`, `'scale'`, `'reflow'`. Default `'fade'`.
- `direction` (optional): `ContentSwapDirection`, one of `'forward'`, `'back'`. Default `'forward'`.
- `sequence` (optional): `ContentSwapSequence`, one of `'overlap'`, `'out-in'`. Default `'overlap'`.
- `className` (optional): `string`.

## Tokens

It draws on `--duration-reflow`, `--duration-reflow-span`, `--duration-reflow-step`, `--duration-reflow-total`, `--duration-slow`, `--ease-out`, `--scale-swap`, `--space-lg`.
