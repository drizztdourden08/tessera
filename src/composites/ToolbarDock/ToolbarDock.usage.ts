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
    'A side holds at most two lanes. The first id of a side is the outer lane, the one next to the window edge.',
    'definitions names each toolbar. A toolbar in the layout without a definition is not drawn, and a hidden toolbar is not drawn.',
    'renderToolbar draws one toolbar and gets its orientation, its side and the handle. Pass the orientation and the handle to Toolbar.',
    'The orientation comes from the side: horizontal on top and bottom, vertical on left and right. It is never stored.',
    'The handle is the set of props for the grip of a Toolbar. It carries the toolbar id as data-drag-toolbar and a name such as Move Drawing tools.',
    'Dragging the grip moves the toolbar. A preview shows the lane it will take, with the thickness of that side, so the switch between horizontal and vertical shows before the drop.',
    'A side that already holds two other toolbars refuses the drop. The centre is never a target.',
    'Drop on the basket at the bottom of the frame to hide the toolbar. Escape, or a drop anywhere else, puts it back.',
    'onLayoutChange gets the new layout when a drag ends. The dock never changes the layout by itself, so keep it in state.',
    'children fills the centre cell and takes the room the lanes leave. Give the dock a height, as the centre has none of its own.',
  ],
  a11y: [
    'Each toolbar keeps its own role toolbar, orientation and name from the Toolbar you render.',
    'The grip is a button named Move followed by the label of the toolbar from definitions.',
    'Focus returns to the grip when a drag ends or is cancelled.',
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
    renderToolbar={(id, { orientation, handle }) => (
      <Toolbar label={id} items={itemsOf(id)} orientation={orientation} handle handleProps={handle} />
    )}
  >
    {children}
  </ToolbarDock>
);
`,
  propsHash: 'f8c1dd7cc368a659',
} satisfies ComponentUsage;

export { usage };
