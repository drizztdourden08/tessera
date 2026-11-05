# RecordHeader

The one title line every item uses: a chevron, an icon, a code, a title, badges and a menu, centred in a single row.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { RecordHeader } from '@drizztdourden08/tessera';
```

The source is `src/composites/RecordHeader/RecordHeader.tsx`. Its gallery page is Composites · Data views/RecordHeader (`#/story/composites-recordheader--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? The title line of an item, with icon, code, badges and actions.

RecordHeader is the shared title line of every item: slots in a fixed order, centred, with no frame of its own.

## Use it when

- An item shows its identity in one line, such as a task with a code, a title, a status badge and an actions menu.
- A Kanban group bar or a Tree row needs the same line as a RecordCard, with no frame around it.

## Use something else when

- The item needs a frame, a fold and a body under its title line. Use [RecordCard](RecordCard.md) instead.
- The line is plain text with no slots. Use [Text](Text.md) instead.
- The item is a catalogue tile with a picture or media. Use [ItemCard](ItemCard.md) instead.

## Rules

- Pass icon, code, title, content and menu to fill the slots; they sit in that order after the chevron, and content sits at the end, next to the menu.
- Pass chevron with expanded and onToggle to show the fold button; leave it out and no button shows. A click anywhere on the row also toggles, except a click on a button, link or field inside it. That row counts as a control, so its click never opens a Kanban card or a clickable Card around it. controls names the folded element and label replaces the default name.
- The header has no padding and no surface, so the parent gives them: a card, a Kanban group bar or a tree row.
- Use density row for a compact line and card for a roomy one; it only changes the gap between the slots.
- In a Kanban group bar, pass the fold of renderGroupHeader to chevron: { expanded: fold.open, onToggle: fold.toggle, controls: fold.controls }.
- In a Tree, draw it from renderLabel with density row and no chevron, since the tree has its own twisty.

## Accessibility

- The chevron is a bare button with aria-expanded and, when controls is set, aria-controls; Enter and Space on it toggle. The row has no role of its own.
- A long title is cut with an ellipsis and the slots never wrap.

## Example

```tsx
import { useState } from 'react';
import { Badge, RecordHeader, TypeMark } from '@drizztdourden08/tessera';

const TaskLine = () => {
  const [open, setOpen] = useState(true);
  return (
    <RecordHeader
      icon={<TypeMark icon="bug" label="Bug" color="violet" variant="outline" />}
      code="ARG-12"
      title="Fix the login redirect"
      content={<Badge variant="inline" value="Open" color="info" />}
      chevron={{ expanded: open, onToggle: () => setOpen(!open), controls: 'task-body' }}
    />
  );
};
```

## Props

- `title` (optional): `ReactNode`.
- `icon` (optional): `ReactNode`.
- `code` (optional): `ReactNode`.
- `content` (optional): `ReactNode`.
- `menu` (optional): `ReactNode`.
- `chevron` (optional): `RecordHeaderChevron`.
- `density` (optional): `RecordHeaderDensity`, one of `'row'`, `'card'`. Default `'card'`.
- `className` (optional): `string`.

## Tokens

It draws on `--duration-fast`, `--ease-standard`, `--record-header-gap-card`, `--record-header-gap-row`.
