# List

A bulleted or numbered list of short items, with a nested list drawn one step in.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { List } from '@drizztdourden08/tessera';
```

The source is `src/primitives/List/List.tsx`. Its gallery page is Primitives · Display/List (`#/story/primitives-list--overview`).

## Where the questions lead here

What are you placing? Text. What kind of text? A bulleted or numbered list of short items.

List is the bulleted or numbered list; ListItem is one item, and a nested List inside it is drawn one step in.

## Use it when

- A short run of points, such as the changes in a release or the steps to install.
- Text from Markdown is drawn with Tessera parts: Markdown draws every list with List and ListItem.

## Use something else when

- A list the user adds to, renames and deletes from. Use [ItemList](ItemList.md) instead.
- A list of choices to tick. Use [CheckList](CheckList.md) instead.

## Rules

- Put a ListItem inside each List; a nested List goes inside the ListItem it belongs to.
- Pass ordered for numbers and start for the first number; without ordered the list has bullets.
- Pass bare on a ListItem that holds its own control, such as a Checkbox: it takes the marker off and pulls the control back to the left edge.
- Keep each item short; a long item wraps under its marker.

## Accessibility

- It is a real list, so a screen reader reads its length and the position of each item.
- A nested List is read as a list inside its item.

## Example

```tsx
import { List, ListItem } from '@drizztdourden08/tessera';

const Steps = () => (
  <List ordered start={1}>
    <ListItem>Download the zip.</ListItem>
    <ListItem>
      Unpack it anywhere.
      <List>
        <ListItem>Keep the folder name short.</ListItem>
      </List>
    </ListItem>
  </List>
);
```

## Props

- `ordered` (optional): `boolean`. Default `false`.
- `start` (optional): `number`.
- `children` (optional): `ReactNode`.

It also takes the 277 attributes it inherits through `Omit<HTMLAttributes<HTMLElement>, 'children'>`.

## Tokens

It draws on `--c-text-dim`, `--space-2xs`, `--space-lg`.

## Also exported from this folder

`ListItem`.
