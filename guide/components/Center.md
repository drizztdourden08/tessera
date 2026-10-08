# Center

Puts its children in the middle on both axes, such as initials in an avatar, an icon in a tile or a message in an empty pane.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { Center } from '@drizztdourden08/tessera';
```

The source is `src/primitives/Center/Center.tsx`. Its gallery page is Primitives · Layout/Center (`#/story/primitives-center--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? Items in a row or a column.

Center puts its children in the middle of its box on both axes, with the gap and direction of a Flex.

## Use it when

- One item or a short group sits in the middle of a box, such as a waiting message in an empty area.
- Initials or an icon sit in the middle of a round or square badge.

## Use something else when

- The items line up along a column from the top. Use `Stack` instead.
- The items sit side by side from the start of a row. Use [Inline](Inline.md) instead.
- Only one axis is centred, or the alignment changes at run time. Use `Flex` instead.

## Rules

- Give it a size, through a class or its parent, so there is room to centre in; it fits its content otherwise.
- Direction defaults to row; set column to stack a title over its message in the middle.
- Set inline to sit it in a line of text, sized to its content, such as initials in an avatar.
- It is a Flex with align and justify fixed to center and takes every other Flex prop, such as gap, as and className.

## Accessibility

- It adds no role; set as to the element the content needs, such as section for an empty pane with a heading.
- Centring changes only the look, so the reading order stays the order of the children.

## Example

```tsx
import { Center, Text } from '@drizztdourden08/tessera';

const LobbyWaiting = () => (
  <Center direction="column" gap="sm" className="lobby-empty">
    <Text variant="title">Lobby</Text>
    <Text variant="subtitle">Waiting for the host to start the session</Text>
  </Center>
);
```

## Props

- `direction` (optional): `'row' | 'column'`.
- `gap` (optional): `SpaceToken`, one of `'2xs'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`.
- `wrap` (optional): `boolean`.
- `inline` (optional): `boolean`.
- `as` (optional): `ElementType`.
- `children` (optional): `ReactNode`.

It also takes the 277 attributes it inherits through `HTMLAttributes<HTMLElement>`.
