# ToolbarDock

The frame around a work area that holds toolbars on its four edges, up to two lanes on each, with the work area in the centre.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ToolbarDock } from '@drizztdourden08/tessera';
```

The source is `src/composites/ToolbarDock/ToolbarDock.tsx`. Its gallery page is Composites · Widgets/ToolbarDock (`#/story/composites-toolbardock--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? Toolbars the user docks on the edges of a work area.

ToolbarDock is the frame that holds the toolbars on the edges of a work area, up to two lanes on each side.

## Use it when

- An editor has several toolbars that sit along the edges of the work area, such as tools on the left and options on top.
- The toolbars are described by data, and each one has a side it belongs to by default.
- The work area is a WidgetManager or a DockLayout that should take the room the toolbars leave.

## Use something else when

- One row or column of tools needs no edge frame around the work area. Use [Toolbar](Toolbar.md) instead.
- The panels around the work area are widgets that tile, float and tab. Use `DockLayout` instead.
- A single toolbar sits on the top edge of one frame. Use [ToolFrame](ToolFrame.md) instead.

## Rules

- Layout says which toolbar sits on which side. The dock draws it and never stores it; the app keeps it and saves it.
- Top and bottom lanes span the full width. Left and right lanes sit between them, so the corners belong to top and bottom.
- A side holds at most two lanes. The first id of a side is the outer lane, the one next to the window edge.
- Definitions names each toolbar. A toolbar in the layout without a definition is not drawn, and a hidden toolbar is not drawn.
- RenderToolbar draws one toolbar and gets its orientation, its side and the handle. Pass the orientation and the handle to Toolbar.
- The orientation comes from the side: horizontal on top and bottom, vertical on left and right. It is never stored.
- The handle is the set of props for the grip of a Toolbar. It carries the toolbar id as data-drag-toolbar and a name such as Move Drawing tools.
- Dragging the grip moves the toolbar. A preview shows the lane it will take, with the thickness of that side, so the switch between horizontal and vertical shows before the drop.
- A side that already holds two other toolbars refuses the drop. The centre is never a target.
- Drop on the basket at the bottom of the frame to hide the toolbar. Escape, or a drop anywhere else, puts it back.
- The keyboard does the same without a pointer. Enter or Space on the grip picks the toolbar up and opens the move guide, which lists the keys.
- While picked up, an arrow key goes to that side, outer lane first. The same arrow again switches between the outer and the inner lane. A full side is skipped and announced.
- Delete sends the picked toolbar to the basket. Enter drops it and Escape puts it back. The preview shows the target as it does for a pointer drag.
- OnLayoutChange gets the new layout when a drag or a keyboard move ends. It is not called when the toolbar is dropped where it already was. The dock never changes the layout by itself, so keep it in state.
- Children fills the centre cell and takes the room the lanes leave. Give the dock a height, as the centre has none of its own.

## Accessibility

- Each toolbar keeps its own role toolbar, orientation and name from the Toolbar you render.
- The grip is a button named Move followed by the label of the toolbar from definitions.
- Focus returns to the grip when a drag or a keyboard move ends or is cancelled.
- Every keyboard step is announced in a polite live region, for example Drawing tools: left, outer lane. A full side and the drop are announced too.

## Example

```tsx
import { Toolbar, ToolbarDock } from '@drizztdourden08/tessera';
import type { ToolbarDefinition, ToolbarItem, ToolbarLayout } from '@drizztdourden08/tessera';

interface EditorProps {
  layout: ToolbarLayout;
  setLayout: (layout: ToolbarLayout) => void;
  itemsOf: (id: string) => ToolbarItem[];
  definitions: ToolbarDefinition[];
  children: React.ReactNode;
}

const Editor = ({ layout, setLayout, itemsOf, definitions, children }: EditorProps) => (
  <ToolbarDock
    layout={layout}
    onLayoutChange={setLayout}
    definitions={definitions}
    renderToolbar={(id, { orientation, handle }) => (
      <Toolbar label={id} items={itemsOf(id)} orientation={orientation} handle handleProps={handle} />
    )}
  >
    {children}
  </ToolbarDock>
);
```

## Props

- `layout`: `ToolbarLayout`.
- `onLayoutChange`: `(layout: ToolbarLayout) => void`.
- `definitions`: `readonly ToolbarDefinition[]`.
- `renderToolbar`: `(id: string, slot: ToolbarSlot) => ReactNode`.
- `children` (optional): `ReactNode`.
- `className` (optional): `string`.

## Tokens

It draws on `--opacity-faint`, `--space-2xs`, `--z-modal`.

## Also exported from this folder

`MAX_PER_SIDE`, `TOOLBAR_LAYOUT_V`, `canShowToolbar`, `createToolbarLayout`, `hideToolbar`, `isToolbarShown`, `migrateToolbarLayout`, `moveToolbar`, `showToolbar`, `toggleToolbar`, `toolbarOrientation`.
