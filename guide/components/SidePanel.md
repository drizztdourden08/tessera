# SidePanel

The one side panel of Tessera: a sunken panel beside the main view, with a heading, that the user drags wider or narrower and that folds to a rail.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { SidePanel } from '@drizztdourden08/tessera';
```

The source is `src/composites/SidePanel/SidePanel.tsx`. Its gallery page is Composites · Layout/SidePanel (`#/story/composites-sidepanel--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? A side panel with a heading that folds to a rail.

SidePanel is the one side panel of a work screen: the sunken surface, the heading, the edge with its line and fold button, the rail and the drag to resize or fold.

## Use it when

- A screen has an outline, a layer list or an inspector beside its main view.
- The user needs the room of the panel now and then, so it folds to a rail with its actions, its title and its icons.
- A page has pickers on its sides, such as a list of profiles on the left and device cards to drag on the right.

## Use something else when

- A list, an editor and an inspector make one studio screen. Use [StudioLayout](StudioLayout.md) instead.
- A list sits beside the detail of the picked item. Use [ListDetailLayout](ListDetailLayout.md) instead.
- The left side is the navigation of the app. Use `SideNavLayout` instead.

## Rules

- Use it for every panel that folds or resizes beside a main view, other than the navigation of the app; draw no panel of your own.
- Put it in a flex row beside the main view, with no bar or frame around it; it keeps its own width, and the main view takes the rest.
- Pass side="end" for a panel on the right; its line, its fold button and its rail mirror to its left.
- Every panel resizes: there is no switch to turn it off. To hold a width, pass the same number to minWidth and maxWidth; the line still folds the panel.
- Dragging the line about 32 px narrower than minWidth folds the panel to its rail, and dragging the line of a rail outward opens it; the arrow keys at the end of the range do the same.
- Pass actions for buttons in the heading, such as Add or Rescan; the folded rail shows them at its top, level with the fold button.
- Pass rail for the icons of the items, such as one IconButton for each profile; the folded rail shows them under the title.
- A glow around a rail icon, such as a drop-shadow on a ready device, spreads past the rail; only a rail too long to fit scrolls and clips it.
- Put lists, cards, inputs and drag sources in it as they are: the body scrolls, and the content stays mounted while folded.
- Pass width, minWidth and maxWidth in pixels; when width is outside the default 224 to 448 range the range grows to take it, so a width of 192 stays 192.
- Pass storageKey to keep the width, and the fold under storageKey:collapsed.
- Pass collapsed with onCollapsedChange when the app holds the fold; collapsible={false} drops the fold button.

## Accessibility

- It is an aside named by its title, with the title as a heading, h2 unless level says otherwise.
- The fold button says Hide or Show and the title and reports aria-expanded; focus moves to it when the panel folds, by the button, Enter, an arrow key or a drag, and stays on it when the panel opens.
- While folded the heading and the body are hidden from screen readers and the keyboard; the actions and the rail take their place, and the sideways title is hidden from screen readers.
- The line is a separator: the arrow keys resize it, an arrow key at the end of the range folds or opens the panel, and Enter folds or opens it.
- While the panel is folded the separator reads a value of zero.

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
- `rail` (optional): `ReactNode`.
- `collapsible` (optional): `boolean`.
- `collapsed` (optional): `boolean`.
- `defaultCollapsed` (optional): `boolean`.
- `onCollapsedChange` (optional): `(collapsed: boolean) => void`.
- `width` (optional): `number`.
- `minWidth` (optional): `number`.
- `maxWidth` (optional): `number`.
- `storageKey` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--radius-lg`, `--side-panel-width`, `--space-2xs`, `--space-md`, `--space-sm`.
