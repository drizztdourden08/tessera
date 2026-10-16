# StudioLayout

The frame of a studio screen: a list on the left, an editor in the centre and an inspector on the right, under an optional bar of actions.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { StudioLayout } from '@drizztdourden08/tessera';
```

The source is `src/composites/StudioLayout/StudioLayout.tsx`. Its gallery page is Composites · Layout/StudioLayout (`#/story/composites-studiolayout--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? A list, an editor and an inspector side by side.

StudioLayout draws every studio screen the same way: a raised bar, two SidePanels and a ToolFrame for the editor.

## Use it when

- A screen edits one thing picked from a list, with its properties beside it, such as a sprite, a language or a song studio.
- The editor needs tools on its top edge and the screen needs Save and Export actions above it.
- The user folds the side panels away now and then to give the editor the room.

## Use something else when

- A list sits beside the detail of the picked item, with no inspector. Use [ListDetailLayout](ListDetailLayout.md) instead.
- The user moves panels around and docks them. Use `DockLayout` instead.
- Only one side panel sits beside the main view. Use [SidePanel](SidePanel.md) instead.

## Rules

- Pass the editor as children and name it with editorLabel; it sits in a ToolFrame that scrolls.
- Pass toolbar as ToolGroups groups, { id, label, content }, for the tools on the top edge of the editor.
- Pass compactToolbar to keep that toolbar to one row of small controls with the group names hidden, when every row of height counts.
- Pass start and end as { title, content } with any SidePanel prop, such as storageKey, width, rail or defaultCollapsed.
- Pass bar as { title, caption, status, groups, idleHint } for the raised top bar; its HintLine shows the hint of the control under the pointer.
- Put status and error lines in bar.notices, under the hint line, and a full width line, such as where an installed item came from, in banner.
- Give the buttons in the bar and the toolbar a hint, { label, description }: the layout is one HintScope.
- Give the layout a height, such as the window or a flex parent; the panels and the editor scroll inside it.
- The columns stack, list, editor, then inspector, only when the open panels, the folded rails and the editor do not fit side by side; the body then scrolls.
- Pass editorMinWidth for the narrowest editor the screen can work with, 192 px when left out; fold a panel to keep the columns on a narrow window.

## Accessibility

- The bar is a header with the title as a heading, h1 unless bar.level says otherwise.
- Each side panel is an aside named by its title, with a heading; the editor is a section named by editorLabel.
- The fold buttons are CollapseToggles: they say Hide or Show and the title, report aria-expanded and keep focus when the panel folds.
- Each group in the bar and the toolbar is a group named by its label, shown above it unless compactToolbar hides it.

## Example

```tsx
import { Button, StudioLayout } from '@drizztdourden08/tessera';
import type { ReactNode } from 'react';

const SpriteStudio = ({ name, list, sheet, facts }: { name: string; list: ReactNode; sheet: ReactNode; facts: ReactNode }) => (
  <StudioLayout
    bar={{
      caption: 'Character Studio',
      title: name,
      idleHint: 'Save keeps the sprite in this app.',
      groups: [{ id: 'save', label: 'Save to this app', content: <Button size="sm" hint={{ label: 'Save', description: 'Keeps your changes.' }}>Save</Button> }],
    }}
    start={{ title: 'Sprites', content: list, storageKey: 'studio.sprites' }}
    end={{ title: 'Properties', content: facts, storageKey: 'studio.properties' }}
    editorLabel="Sprite sheet"
  >
    {sheet}
  </StudioLayout>
);
```

## Props

- `editorLabel`: `string`.
- `children`: `ReactNode`.
- `bar` (optional): `StudioLayoutBar`.
- `banner` (optional): `ReactNode`.
- `start` (optional): `StudioLayoutPanel`.
- `end` (optional): `StudioLayoutPanel`.
- `toolbar` (optional): `readonly ToolGroup[]`.
- `compactToolbar` (optional): `boolean`.
- `editorMinWidth` (optional): `number`.
- `className` (optional): `string`.

## Tokens

It draws on `--collapse-toggle-d`, `--size-384`, `--size-40`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`.
