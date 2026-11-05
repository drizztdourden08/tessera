# RecordCard

The one card every item of a list uses: a single line when folded, its title and body when open.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { RecordCard } from '@drizztdourden08/tessera';
```

The source is `src/composites/RecordCard/RecordCard.tsx`. Its gallery page is Composites · Data views/RecordCard (`#/story/composites-recordcard--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A card for each item of a list, folded to one line.

RecordCard is the shared card of every list item: header slots in a fixed order, a body that folds away.

## Use it when

- A list shows records, such as tasks or runs, that each have a title, a short code, badges and an actions menu.
- Each record has details that stay hidden until the user opens it.

## Use something else when

- The content is a plain surface with no fold and no header slots. Use [Card](Card.md) instead.
- The item is a catalogue tile with a picture or media. Use [ItemCard](ItemCard.md) instead.
- Only the title line is needed, in a Kanban group bar or a Tree row, with no frame and no body. Use [RecordHeader](RecordHeader.md) instead.
- A plain line shows or hides some text and nothing else. Use [Disclosure](Disclosure.md) instead.

## Rules

- Pass icon, code, content and menu to fill the header slots; they sit in that order after the chevron, and content sits at the end, next to the menu.
- The chevron shows only when there are children, and a click on the header row toggles the card, but never a click in the menu or a control.
- Folded, the title sits in the header and the body is not rendered; open, the title moves above the children, so it shows once.
- Give open and onOpenChange to control it, or defaultOpen to start open and let the card keep its own state.
- Use density row for a compact list and card for roomy items.
- Pass edge, edgeTone and variant as on Card for a coloured edge; never wrap a RecordCard in another Card.
- Pass fill when cards sit in a grid, so every card of a row takes the full cell height.

## Accessibility

- The chevron is a button with aria-expanded, and aria-controls pointing at the body while it is open.
- Pass name, or aria-label, so the chevron reads Expand ARG-12, not a bare Expand.
- Pass aria-label to name the card as a group.

## Example

```tsx
import { Badge, Icon, IconButton, RecordCard, Text } from '@drizztdourden08/tessera';

const TaskCard = () => (
  <RecordCard
    title="Fix the login redirect"
    code="ARG-12"
    content={<Badge variant="inline" value="Open" color="info" />}
    menu={<IconButton variant="ghost" size="sm" label="Actions"><Icon name="ellipsis" /></IconButton>}
  >
    <Text>The redirect drops the return path after sign in.</Text>
  </RecordCard>
);
```

## Props

- `title`: `ReactNode`.
- `icon` (optional): `ReactNode`.
- `code` (optional): `ReactNode`.
- `content` (optional): `ReactNode`.
- `menu` (optional): `ReactNode`.
- `children` (optional): `ReactNode`.
- `open` (optional): `boolean`.
- `defaultOpen` (optional): `boolean`. Default `false`.
- `onOpenChange` (optional): `(open: boolean) => void`.
- `density` (optional): `RecordCardDensity`, one of `'card'`, `'row'`. Default `'card'`.
- `className` (optional): `string`.
- `name` (optional): `string`.
- `edge` (optional): `CardEdge`, one of `'left'`, `'border'`.
- `edgeTone` (optional): `CardTone`, one of `'neutral'`, `'primary'`, `'info'`, `'success'`, `'warning'`, `'danger'`.
- `variant` (optional): `CardVariant`, one of `'default'`, `'interactive'`, `'danger'`.
- `fill` (optional): `boolean`.
- `aria-label` (optional): `string`.

## Tokens

It draws on `--record-card-gap-card`, `--record-card-gap-row`, `--record-card-pad-card`, `--record-card-pad-row`.
