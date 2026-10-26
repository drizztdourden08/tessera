/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The frame around a work area that holds toolbars on its four edges, up to two lanes on each, with the work area in the centre.',
  useWhen: [
    'An editor has several toolbars that sit along the edges of the work area, such as tools on the left and options on top.',
    'The toolbars are described by data, and each one has a side it belongs to by default.',
    'The work area is a WidgetManager or a DockLayout that should take the room the toolbars leave.',
  ],
  avoidWhen: [
    { case: 'One row or column of tools needs no edge frame around the work area.', use: 'Toolbar' },
    { case: 'The panels around the work area are widgets that tile, float and tab.', use: 'DockLayout' },
    { case: 'A single toolbar sits on the top edge of one frame.', use: 'ToolFrame' },
  ],
  rules: [
    'layout says which toolbar sits on which side. The dock draws it and never stores it; the app keeps it and saves it.',
    'Top and bottom lanes span the full width. Left and right lanes sit between them, so the corners belong to top and bottom.',
    'A side holds at most MAX_LANES lanes, which is two. MAX_PER_SIDE is a deprecated alias of it. The first lane of a side is the outer lane, the one next to the window edge.',
    'layout.sides[side] is a list of lanes, and a lane is a list of places { id, start, size }. start and size are fractions of the lane, from 0 to 1, so a lane can hold several toolbars with gaps between them. layout.corners says which side claims each corner. Read the ids of a side with toolbarIdsOf(layout, side), never by indexing sides.',
    'migrateToolbarLayout(saved, definitions) reads a saved layout of any version, upgrades a v1 layout to v2 and cleans a v2 one. Pass every saved layout through it.',
    'definitions names each toolbar. A toolbar in the layout without a definition is not drawn, and a hidden toolbar is not drawn.',
    'renderToolbar draws one toolbar and gets its orientation, its side, menuSide, the handle and labels. Pass the orientation, menuSide, the handle and labels to Toolbar.',
    'layout.labels is optional and maps a toolbar id to true or false. Missing means the default of the app, and the slot then has no labels. setToolbarLabels(layout, id, on) sets it and returns the same layout when nothing changes. The layout version stays 2, and migrateToolbarLayout keeps valid entries and drops the rest.',
    'moveToolbarToSide(layout, id, side) moves a shown toolbar to a side, placed as showToolbar places it: its last spot on that side if free, else a new lane, else the largest gap. With no room, or when the toolbar is already on that side, it returns the same layout. last is kept as it was.',
    'The orientation comes from the side: horizontal on top and bottom, vertical on left and right. It is never stored.',
    'The handle is the set of props for the grip of a Toolbar. It carries the toolbar id as data-drag-toolbar and a name such as Move Drawing tools.',
    'Dragging the grip moves the toolbar. A preview shows the lane it will take, with the thickness of that side, so the switch between horizontal and vertical shows before the drop.',
    'The drop lands where the pointer is along the lane, snapped to the lane ends and to the ends of its neighbours within 8 px. The bar keeps its last size, shrunk to the room left and never below MIN_BAR_PX, and the neighbours shift along as they do for an end handle. A drop with no room is refused, and so is a third lane. The centre is never a target.',
    'Drop on the basket at the bottom of the frame to hide the toolbar. Escape, or a drop anywhere else, puts it back.',
    'The keyboard does the same without a pointer. Enter or Space on the grip picks the toolbar up and opens the move guide, which lists the keys.',
    'While picked up, an arrow key goes to that side, to a new outer lane first. The same arrow again steps to a new inner lane, then to each lane already there. PageUp and PageDown step through the slots of the lane: its start, between its bars, its end. Home and End go to the first and last slot.',
    'Delete sends the picked toolbar to the basket. Enter drops it and Escape puts it back. The preview shows the target as it does for a pointer drag.',
    'Each toolbar has a thin handle at both ends, shown on hover or focus. Dragging one moves that end along the lane. A neighbour in the way is pushed along with its size kept, and the chain stops at the lane ends. A bar never gets shorter than MIN_BAR_PX.',
    'The end handles are separators. Arrow keys move the end by 8 px, Shift by 64 px, Home and End go to the ends of its range. The result is announced, with the toolbars it pushed.',
    'Dragging the first start handle of a lane below 0, or the last end handle past the lane end, takes the corner: each lane of the other side whose half thickness is passed gives it up, and the bars of the yielding lanes keep their pixel position and are pushed along. If they cannot fit, the take stops. Dragging back gives the corner back. At the lane end, one more outward arrow takes the next corner lane and an inward arrow gives it back. The pure op is takeToolbarCorner(origin, metrics, grip, px), and metrics needs laneThickness.',
    'The pure ops are resizeToolbarEnd(origin, metrics, id, end, px), always computed from the layout at the start of the gesture, and toolbarEndRange(layout, metrics, id, end) for the value, min and max of a handle in pixels along the lane.',
    'onLayoutChange gets the new layout when a drag or a keyboard move ends. It is not called when the toolbar is dropped where it already was. The dock never changes the layout by itself, so keep it in state.',
    'useToolbarLayout({ value, onChange, definitions }) wraps the pure ops for a controlled layout. It gives move, show, hide, toggle, isShown, canShow and reset, and calls onChange once per edit, never when the edit changes nothing.',
    'toolbarMenuGroups(definitions, layout, toggle, menu) gives DropdownMenu groups for a Toolbars menu: a check item per toolbar, checked when shown and disabled when its side has no free lane, plus a Reset toolbars item when menu.onReset is set. menu is the toolbars group of useTesseraStrings with onReset added.',
    'children fills the centre cell and takes the room the lanes leave. Give the dock a height, as the centre has none of its own.',
  ],
  a11y: [
    'Each toolbar keeps its own role toolbar, orientation and name from the Toolbar you render.',
    'The grip is a button named Move followed by the label of the toolbar from definitions.',
    'Focus returns to the grip when a drag or a keyboard move ends or is cancelled.',
    'Every keyboard step is announced in a polite live region, for example Drawing tools: left, outer lane. The slot, a spot with no room and the drop are announced too.',
  ],
  tree: {
    path: ['layout', 'toolbars the user docks on the edges of a work area'],
    rule: 'ToolbarDock is the frame that holds the toolbars on the edges of a work area, up to two lanes on each side.',
  },
  example: `import { Toolbar, ToolbarDock } from '@drizztdourden08/tessera';
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
    renderToolbar={(id, { orientation, menuSide, handle, labels }) => (
      <Toolbar label={id} items={itemsOf(id)} orientation={orientation} menuSide={menuSide} labels={labels} handle handleProps={handle} />
    )}
  >
    {children}
  </ToolbarDock>
);
`,
  propsHash: 'f8c1dd7cc368a659',
} satisfies ComponentUsage;

export { usage };
