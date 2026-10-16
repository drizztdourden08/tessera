# SidePanel

A raised panel beside the main view, with a heading, that folds to a rail and that the user drags wider.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { SidePanel } from '@drizztdourden08/tessera';
```

The source is `src/composites/SidePanel/SidePanel.tsx`. Its gallery page is Composites · Layout/SidePanel (`#/story/composites-sidepanel--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? A side panel with a heading that folds to a rail.

SidePanel is the one side panel of a work screen: the raised surface, the heading, the fold to a rail and the resize line.

## Use it when

- A screen has an outline, a layer list or an inspector beside its main view.
- The user needs the room of the panel now and then, so it folds to a rail with its title down the side.

## Use something else when

- A list, an editor and an inspector make one studio screen. Use [StudioLayout](StudioLayout.md) instead.
- A list sits beside the detail of the picked item. Use [ListDetailLayout](ListDetailLayout.md) instead.
- The left side is the navigation of the app. Use `SideNavLayout` instead.

## Rules

- Put it in a flex row beside the main view; it keeps its own width, and the main view takes the rest.
- Pass side="end" for a panel on the right; its line then sits on its left.
- Pass actions for buttons in the heading, such as Add; the fold button comes after them.
- Pass width, minWidth and maxWidth in pixels; resizable={false} drops the line.
- Pass storageKey to keep the width, and the fold under storageKey:collapsed.
- Pass collapsed with onCollapsedChange when the app holds the fold; collapsible={false} drops the fold button.

## Accessibility

- It is an aside named by its title, with the title as a heading, h2 unless level says otherwise.
- The fold button says Hide or Show and the title and reports aria-expanded; focus stays on it when the panel folds or opens.
- The line is a separator: the arrow keys resize it, and Enter folds the panel and moves focus to the button that opens it.

## Example

```tsx
import { Box, Flex, SidePanel } from '@drizztdourden08/tessera';
import type { ReactNode } from 'react';

const HudEditor = ({ layers, canvas, inspector }: { layers: ReactNode; canvas: ReactNode; inspector: ReactNode }) => (
  <Flex gap="2xs" align="stretch" className="hud-editor">
    <SidePanel title="Layers" storageKey="hud.layers">{layers}</SidePanel>
    <Box className="hud-editor__canvas">{canvas}</Box>
    <SidePanel side="end" title="Inspector" storageKey="hud.inspector">{inspector}</SidePanel>
  </Flex>
);
```

## Props

- `title`: `string`.
- `children`: `ReactNode`.
- `side` (optional): `SidePanelSide`, one of `'start'`, `'end'`. Default `'start'`.
- `level` (optional): `HeadingLevel`, one of `1`, `2`, `3`, `4`, `5`, `6`. Default `2`.
- `actions` (optional): `ReactNode`.
- `collapsible` (optional): `boolean`.
- `collapsed` (optional): `boolean`.
- `defaultCollapsed` (optional): `boolean`.
- `onCollapsedChange` (optional): `(collapsed: boolean) => void`.
- `resizable` (optional): `boolean`.
- `width` (optional): `number`.
- `minWidth` (optional): `number`.
- `maxWidth` (optional): `number`.
- `storageKey` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--side-panel-width`, `--space-2xs`, `--space-md`.
