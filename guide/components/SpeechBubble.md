# SpeechBubble

A box that speaks, with an optional tail toward whoever says it or the part it is about, such as a mascot beside the search palette.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { SpeechBubble } from '@drizztdourden08/tessera';
```

The source is `src/primitives/SpeechBubble/SpeechBubble.tsx`. Its gallery page is Primitives · Feedback/SpeechBubble (`#/story/primitives-speechbubble--overview`).

## Where the questions lead here

What are you placing? Feedback. What are you telling the user? A note in a bubble with a tail.

SpeechBubble is the one bubble with a tail: GuidedTour draws its step card on it, and a mascot speaks through it.

## Use it when

- A mascot or a guide explains something in a few lines and the tail shows who says it.
- A note must float over the page, on its own surface, and point at one thing.

## Use something else when

- A note that sits in the flow of the page. Use [Callout](Callout.md) instead.
- A hint for the control under the pointer or focus. Use `Tooltip` instead.
- A walk through the screen, one part at a time. Use [GuidedTour](GuidedTour.md) instead.

## Rules

- Pass pointer for the side the tail sits on, such as pointer="left" for a bubble to the right of its speaker; it defaults to none.
- Move the tail along its edge with pointerOffset, in pixels from the start of that edge; it defaults to the middle.
- The tail hangs outside the box, so leave about ten pixels of room on that side.
- Leave tone off for a neutral border, or pass a Callout tone to tint the fill and colour the border and the tail.
- The fill is opaque, so the bubble reads over any page; pass maxWidth for a narrower bubble than 320 pixels.
- Place it yourself, with absolute position or an Anchored part; it sets no position on the page.
- Extra attributes and the ref go to the box, so a bubble can be a dialog, a popover or a live status.

## Accessibility

- It adds no role. Pass role="status" for a bubble that speaks on its own, or role="dialog" with a label for one that takes focus.
- The tail is decoration and is not announced.

## Example

```tsx
import { SpeechBubble } from '@drizztdourden08/tessera';

const SearchTip = () => (
  <SpeechBubble tone="info" pointer="left" pointerOffset={24} role="status">
    Type to search screens, settings and actions. Press Enter to open the first result.
  </SpeechBubble>
);
```

## Props

- `tone` (optional): `CalloutTone`, one of `'primary'`, `'secondary'`, `'info'`, `'success'`, `'warning'`, `'danger'`.
- `pointer` (optional): `SpeechBubblePointer`, one of `'top'`, `'bottom'`, `'left'`, `'right'`, `'none'`. Default `'none'`.
- `pointerOffset` (optional): `number`.
- `maxWidth` (optional): `number`.
- `className` (optional): `string`.
- `children` (optional): `ReactNode`.

It also takes the 278 attributes it inherits through `Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-danger`, `--c-danger-soft`, `--c-info`, `--c-info-soft`, `--c-primary`, `--c-primary-soft`, `--c-secondary`, `--c-secondary-soft`, `--c-success`, `--c-success-soft`, `--c-surface`, `--c-text`, `--c-warning`, `--c-warning-soft`, `--radius-md`, `--shadow-overlay`, `--size-10`, `--size-320`, `--space-md`, `--space-sm`, `--speech-max`, `--speech-offset`.
