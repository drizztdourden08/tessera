# Inline

A row of children side by side with even space between them, such as an icon and its label, a set of tags or a title with its actions.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { Inline } from '@drizztdourden08/tessera';
```

The source is `src/primitives/Inline/Inline.tsx`. Its gallery page is Primitives · Layout/Inline (`#/story/primitives-inline--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? Items in a row or a column.

Inline lays its children side by side in a row, with a token gap and the items centred across it.

## Use it when

- A few items sit on one line, such as an icon beside its text or a name beside its status.
- A title and its actions share a line, with the actions pushed to the far end.

## Use something else when

- The items run down a column. Use `Stack` instead.
- The direction changes at run time, or the row needs a setting Inline does not default. Use `Flex` instead.
- The items line up in equal columns across several rows. Use [Grid](Grid.md) instead.

## Rules

- Leave gap at its default of sm for an icon beside its text; pick a larger space token for separate items.
- Align defaults to center, so an icon lines up with its text; set baseline for words of different sizes.
- Set justify to between to push the last item to the far end, and wrap to let a long row flow onto new lines.
- It is a Flex fixed to the row direction and takes every other Flex prop, such as as and className.

## Accessibility

- It adds no role; set as to ul or nav when the row is a list or a set of links, so screen readers hear the structure.
- The visual order is the reading order, so put the items in the order a keyboard user tabs through them.

## Example

```tsx
import { Icon, Inline, Status, Text } from '@drizztdourden08/tessera';

const SessionRow = () => (
  <Inline>
    <Icon name="gamepad-2" />
    <Text>Session 4</Text>
    <Status tone="success" dot>Connected</Status>
  </Inline>
);
```

## Props

- `align` (optional): `FlexAlign`, one of `'start'`, `'center'`, `'end'`, `'stretch'`, `'baseline'`. Default `'center'`.
- `justify` (optional): `FlexJustify`, one of `'start'`, `'center'`, `'end'`, `'between'`, `'around'`.
- `gap` (optional): `SpaceToken`, one of `'2xs'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`. Default `'sm'`.
- `wrap` (optional): `boolean`.
- `inline` (optional): `boolean`.
- `as` (optional): `ElementType`.
- `children` (optional): `ReactNode`.

It also takes the 277 attributes it inherits through `HTMLAttributes<HTMLElement>`.
