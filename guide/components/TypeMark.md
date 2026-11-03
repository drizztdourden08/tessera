# TypeMark

A small tinted tile that holds an icon in a colour, to mark the type of an item, such as a bug or a story.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { TypeMark } from '@drizztdourden08/tessera';
```

The source is `src/primitives/TypeMark/TypeMark.tsx`. Its gallery page is Primitives · Display/TypeMark (`#/story/primitives-typemark--overview`).

## Where the questions lead here

What are you placing? A status, a count or a label. What does it show? A value that sorts an item into a group.

TypeMark answers what kind of thing an item is with a small icon tile.

## Use it when

- An item card, a pane title, a tree row or a legend row shows what type the item is.
- Each type keeps one icon and one colour on every screen.

## Use something else when

- The mark stands for a person. Use [Avatar](Avatar.md) instead.
- The value is a word the user can read and filter on. Use `Tag` instead.

## Rules

- Pass icon with a Tessera icon name and label with the type name; the label is the tooltip and the text a screen reader reads.
- Set color to one of the category colours; the tile takes a tint of it and the icon takes the full colour.
- Set size xs for 16 px in a dense row and sm for 20 px beside a title.
- Set variant outline for the bare icon in the category colour, with no tile, border or padding; its box is the icon size.

## Accessibility

- It is an image with the label as its name, and the label shows in a tooltip on hover and focus.
- Colour carries no meaning the label does not give.

## Example

```tsx
import { TypeMark } from '@drizztdourden08/tessera';

const BugMarks = () => (
  <>
    <TypeMark icon="bug" label="Bug" color="rose" />
    <TypeMark icon="bug" label="Bug" color="rose" variant="outline" />
  </>
);
```

## Props

- `icon`: `IconName`.
- `label`: `string`.
- `color` (optional): `TagCategoryColor`, one of `'rose'`, `'orange'`, `'amber'`, `'lime'`, `'green'`, `'teal'`, `'cyan'`, `'blue'`, `'violet'`, `'pink'`.
- `size` (optional): `TypeMarkSize`, one of `'xs'`, `'sm'`. Default `'xs'`.
- `variant` (optional): `TypeMarkVariant`, one of `'tile'`, `'outline'`. Default `'tile'`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-tag-amber`, `--c-tag-amber-soft`, `--c-tag-blue`, `--c-tag-blue-soft`, `--c-tag-cyan`, `--c-tag-cyan-soft`, `--c-tag-green`, `--c-tag-green-soft`, `--c-tag-lime`, `--c-tag-lime-soft`, `--c-tag-orange`, `--c-tag-orange-soft`, `--c-tag-pink`, `--c-tag-pink-soft`, `--c-tag-rose`, `--c-tag-rose-soft`, `--c-tag-teal`, `--c-tag-teal-soft`, `--c-tag-violet`, `--c-tag-violet-soft`, `--c-text-dim`, `--c-text-dim-soft`, `--radius-sm`, `--size-16`, `--size-20`.
