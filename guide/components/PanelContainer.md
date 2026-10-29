# PanelContainer

A plain stacked section with a heading, optional action and a body.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { PanelContainer } from '@drizztdourden08/tessera';
```

The source is `src/composites/PanelContainer/PanelContainer.tsx`. It has no gallery page yet.

## A building block

No question in [decide.md](../decide.md) leads here. Other components are built on it.

## Use it when

- A side pane needs a consistently headed section.
- A list or detail pane needs the shared panel heading and body structure.

## Use something else when

- Content needs a card surface, outline or interactive state. Use `Card` instead.

## Rules

- Pass title for the heading and children for the body.
- The title is always shown above the body without a card surface or border.
- Pass sublabel for a muted label right after the title; it shrinks first, then the title, and a clipped one shows in a Tooltip.
- Pass action for a control in the header.
- Pass fill to take the room left in a flex column; the body then has a definite height, so a DataTable inside scrolls on its own.

## Accessibility

- The title is a heading; the body remains arbitrary content.

## Example

```tsx
import { PanelContainer } from '@drizztdourden08/tessera';

<PanelContainer title="Profiles" action="New">
  Profiles go here.
</PanelContainer>
```

## Props

- `title`: `ReactNode`.
- `sublabel` (optional): `ReactNode`.
- `action` (optional): `ReactNode`.
- `level` (optional): `HeadingLevel`, one of `1`, `2`, `3`, `4`, `5`, `6`. Default `3`.
- `fill` (optional): `boolean`. Default `false`.
- `children`: `ReactNode`.
- `className` (optional): `string`.

## Tokens

It draws on `--space-md`, `--space-sm`.
