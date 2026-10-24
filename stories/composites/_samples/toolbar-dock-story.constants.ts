/* @layer stories @kind data */
import type { DockToolbarSpec } from './toolbar-dock-story.type';

const DOCK_TOOLBARS: readonly DockToolbarSpec[] = [
  {
    id: 'shapes',
    label: 'Shapes',
    side: 'top',
    tools: [
      { id: 'line', label: 'Line', icon: 'pixel-shape-line' },
      { id: 'rect', label: 'Rectangle', icon: 'pixel-shape-rect' },
      { id: 'ellipse', label: 'Ellipse', icon: 'pixel-shape-ellipse' },
      { id: 'curve', label: 'Curve', icon: 'pixel-shape-curve' },
    ],
  },
  {
    id: 'select',
    label: 'Selection',
    side: 'top',
    tools: [
      { id: 'select-rect', label: 'Rectangle select', icon: 'pixel-select-rect' },
      { id: 'select-lasso', label: 'Lasso', icon: 'pixel-select-lasso' },
      { id: 'select-wand', label: 'Magic wand', icon: 'pixel-select-wand' },
    ],
  },
  {
    id: 'tools',
    label: 'Drawing tools',
    side: 'left',
    tools: [
      { id: 'pencil', label: 'Pencil', icon: 'pixel-pencil' },
      { id: 'eraser', label: 'Eraser', icon: 'pixel-eraser' },
      { id: 'fill', label: 'Fill', icon: 'pixel-fill-bucket' },
      { id: 'picker', label: 'Picker', icon: 'pixel-eyedropper' },
      { id: 'hand', label: 'Pan', icon: 'pixel-hand' },
    ],
  },
  {
    id: 'view',
    label: 'View',
    side: 'bottom',
    tools: [
      { id: 'zoom-in', label: 'Zoom in', icon: 'pixel-zoom-in' },
      { id: 'zoom-out', label: 'Zoom out', icon: 'pixel-zoom-out' },
      { id: 'zoom', label: 'Zoom', icon: 'pixel-zoom' },
    ],
  },
];

const TOOLBAR_DOCK_CODE = `import { DropdownMenu, Toolbar, ToolbarDock, createToolbarLayout, toolbarMenuGroups, useToolbarLayout } from '@drizztdourden08/tessera';

const definitions = [
  { id: 'tools', label: 'Drawing tools', defaultSide: 'left' },
  { id: 'shapes', label: 'Shapes', defaultSide: 'top' },
];
const [value, setValue] = useState(() => createToolbarLayout(definitions));
const { layout, toggle, reset } = useToolbarLayout({ value, onChange: setValue, definitions });

<ToolbarDock
  layout={layout}
  onLayoutChange={setValue}
  definitions={definitions}
  renderToolbar={(id, { orientation, handle }) => (
    <Toolbar label={labelOf(id)} items={itemsOf(id)} orientation={orientation} handle handleProps={handle} />
  )}
>
  <WidgetManager />
</ToolbarDock>

<DropdownMenu
  trigger={{ label: 'Toolbars', icon: 'layout-grid' }}
  groups={toolbarMenuGroups(definitions, layout, toggle, { ...toolbars, onReset: reset })}
  closeOnSelect={false}
/>`;

export { DOCK_TOOLBARS, TOOLBAR_DOCK_CODE };
