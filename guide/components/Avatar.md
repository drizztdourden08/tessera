# Avatar

A small round or square mark for a person, drawn as one or two initials, an icon or a picture, or as a dashed circle when nobody is assigned.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { Avatar } from '@drizztdourden08/tessera';
```

The source is `src/primitives/Avatar/Avatar.tsx`. Its gallery page is Primitives · Display/Avatar (`#/story/primitives-avatar--overview`).

## Where the questions lead here

What are you placing? A status, a count or a label. What does it show? A value that sorts an item into a group.

Avatar answers who an item belongs to with a small round mark.

## Use it when

- An item card or a list row shows who owns it, in 16 px beside other text.
- A detail pane names the assignee at 24 px.
- The signed-in person must stand out among the rest, so their items carry a ring.

## Use something else when

- The mark names a kind of thing, not a person. Use [TypeMark](TypeMark.md) instead.
- The value is a word that sorts an item into a group. Use `Tag` instead.

## Rules

- Pass label with the name of the person; it is the tooltip and the text a screen reader reads.
- Pass initials, one or two letters, icon, or src for a picture, never more than one; with none it draws the unassigned circle.
- A picture fills the shape and is cropped to it, named once by label on the avatar, with the picture itself hidden from screen readers; if it fails to load, the initials of the label show instead.
- Set shape square for a rounded square instead of a circle, for a team or a workspace.
- Set color to one of the category colours so a person keeps one colour on every screen.
- Set size xs for 16 px on a card, sm for 24 px in a pane and lg for 48 px on a profile or detail header.
- Set variant owner for the signed-in person; it draws a ring around the circle.

## Accessibility

- It is an image with the label as its name, and the label shows in a tooltip on hover and focus.
- Colour carries no meaning the label does not give.

## Example

```tsx
import { Avatar } from '@drizztdourden08/tessera';

const Assignees = () => (
  <>
    <Avatar label="Wren Archer" initials="WA" color="teal" />
    <Avatar label="You" icon="user" color="violet" variant="owner" size="sm" />
    <Avatar label="Wren Archer" src="/people/wren.png" size="sm" />
    <Avatar label="Platform team" src="/teams/platform.png" shape="square" size="sm" />
    <Avatar label="Wren Archer" src="/people/wren.png" size="lg" />
    <Avatar label="Unassigned" />
  </>
);
```

## Props

- `label`: `string`.
- `color` (optional): `TagCategoryColor`, one of `'rose'`, `'orange'`, `'amber'`, `'lime'`, `'green'`, `'teal'`, `'cyan'`, `'blue'`, `'violet'`, `'pink'`.
- `size` (optional): `AvatarSize`, one of `'xs'`, `'sm'`, `'lg'`.
- `variant` (optional): `AvatarVariant`, one of `'default'`, `'owner'`.
- `shape` (optional): `AvatarShape`, one of `'circle'`, `'square'`.
- `className` (optional): `string`.
- `initials` (optional): `string`.
- `icon` (optional): `IconName`.
- `src` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-primary`, `--c-tag-amber`, `--c-tag-amber-soft`, `--c-tag-blue`, `--c-tag-blue-soft`, `--c-tag-cyan`, `--c-tag-cyan-soft`, `--c-tag-green`, `--c-tag-green-soft`, `--c-tag-lime`, `--c-tag-lime-soft`, `--c-tag-orange`, `--c-tag-orange-soft`, `--c-tag-pink`, `--c-tag-pink-soft`, `--c-tag-rose`, `--c-tag-rose-soft`, `--c-tag-teal`, `--c-tag-teal-soft`, `--c-tag-violet`, `--c-tag-violet-soft`, `--c-text-dim`, `--c-text-dim-soft`, `--c-text-muted`, `--radius-round`, `--radius-sm`, `--size-1`, `--size-10`, `--size-16`, `--size-20`, `--size-24`, `--size-48`, `--size-8`, `--weight-semi`.
