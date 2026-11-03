# SignalStrip

One row of small toned chips, each an icon with a count, that never wraps: what does not fit folds into a +N chip whose tooltip lists the hidden ones.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { SignalStrip } from '@drizztdourden08/tessera';
```

The source is `src/composites/SignalStrip/SignalStrip.tsx`. Its gallery page is Composites · Feedback/SignalStrip (`#/story/composites-signalstrip--overview`).

## Where the questions lead here

What are you placing? A status, a count or a label. What does it show? A row of attention chips that folds what does not fit.

SignalStrip is the one-line row of attention chips that folds the overflow into a +N chip with a tooltip.

## Use it when

- A card or a header carries a few attention signals, such as open questions, failing tests or blockers, and must keep to one line.
- Some signals open a place when pressed and others only inform.

## Use something else when

- A single label or state is shown, with no row of signals. Use `Tag` instead.
- The user picks one of several chips. Use `TagPicker` instead.

## Rules

- Pass items. An item has an id, an icon, a label, a tone and optionally a count and an onClick. The strip keeps no state.
- Tone is danger, warning, info, success or neutral and sets the colour of the chip.
- A chip shows its icon and its count. An item without a count shows its label as text. The label is also the title of the chip.
- An item with onClick is a button chip. An item without it is a static chip.
- The row never wraps. It measures the chips and the room, and what does not fit folds into a +N chip. The tooltip of +N lists the hidden labels.
- Max keeps at most that many chips before the +N chip, even when there is room for more.
- An empty items list renders nothing.

## Accessibility

- Pass aria-label to name the row as a group.
- A button chip is a Tab stop and is named by its label. The +N chip is a Tab stop and its tooltip opens on focus.
- Tone is never the only cue: each chip has an icon and a label.

## Example

```tsx
import { SignalStrip } from '@drizztdourden08/tessera';

const openQuestions = () => undefined;
const openTests = () => undefined;

const items = [
  { id: 'questions', icon: 'circle-help', count: 2, label: 'Open questions', tone: 'warning', onClick: openQuestions },
  { id: 'tests', icon: 'flask', count: 1, label: 'Failing tests', tone: 'danger', onClick: openTests },
  { id: 'quiet', icon: 'moon', label: 'Quiet', tone: 'neutral' },
] as const;

const Signals = () => <SignalStrip aria-label="Attention" items={items} />;
```

## Props

- `items`: `readonly SignalItem[]`.
- `max` (optional): `number`.
- `aria-label` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--size-4`, `--space-xs`.
