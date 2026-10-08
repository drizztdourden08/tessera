/* @layer stories @kind data */
import type { PreviewCardEntry } from '../../_shared/preview-card.type';

const RAILS = {
  outline: { initial: 224, min: 160, max: 360 },
  inspector: { initial: 256, min: 192, max: 400 },
} as const;

const RESIZE_TEXT = {
  outline: 'outline',
  canvas: 'canvas',
  inspector: 'inspector',
  outlineTitle: 'Outline',
  inspectorTitle: 'Inspector',
  canvasLine: 'The HUD canvas. Drag either seam, or focus it and use the arrow keys, Home, End and Enter.',
  widths: 'Outline and inspector width',
} as const;

const RESIZE_CHOICES: readonly PreviewCardEntry[] = [
  {
    name: 'A. One ResizeHandle, shared by every layout',
    badge: 'Recommended',
    tone: 'success',
    text: 'SplitPane\'s divider, which ListDetailLayout already borrows, becomes a public part with a size hook in pixels. SplitPane, ListDetailLayout, DockLayout and the DataTable column seam all draw it, so Tessera keeps one seam instead of four. RotP\'s HUD editor rails use it as they use their own today, and gain the arrow keys.',
  },
  {
    name: 'B. Take RotP\'s ResizeHandle as it is',
    badge: 'Considered',
    text: 'A thin line moved by the pointer only, lifted from the DataTable column seam. It would be a fifth seam next to SplitPane\'s, with no keys and no value for screen readers.',
  },
  {
    name: 'C. No new part: nest SplitPane',
    badge: 'Considered',
    text: 'The HUD editor becomes a SplitPane inside a SplitPane. Nothing new ships, but SplitPane shares the room by ratio, so the rails grow and shrink with the window instead of keeping their width.',
  },
];

const RESIZE_MAPPING: readonly PreviewCardEntry[] = [
  { name: 'SplitPane divider', badge: 'Becomes ResizeHandle', tone: 'success', text: 'Already a separator with the arrow keys, Home, End and a reset; it becomes the public part.' },
  { name: 'ListDetailLayout divider', badge: 'Already shared', tone: 'success', text: 'Draws SplitPane\'s divider today; its width hook becomes the public size hook.' },
  { name: 'DockLayout divider', badge: 'Would join', tone: 'info', text: 'Its own copy, shown only under the pointer and with no keys; it would draw ResizeHandle in the line look.' },
  { name: 'DataTable column seam', badge: 'Would join', tone: 'info', text: 'The line RotP lifted its ResizeHandle from; it would draw ResizeHandle in the line look.' },
  { name: 'RotP ResizeHandle and useResize', badge: 'Replaced', tone: 'warning', text: 'The HUD layout editor\'s outline and inspector rails move to ResizeHandle and the size hook.' },
];

const RESIZE_CODE = `import { ResizeHandle, usePaneSize } from '@drizztdourden08/tessera';

const outline = usePaneSize({ initial: 224, min: 160, max: 360, storageKey: 'hud.outline' });
const inspector = usePaneSize({ initial: 256, min: 192, max: 400, edge: 'end', storageKey: 'hud.inspector' });

<aside style={{ inlineSize: outline.size }}>{outlineTree}</aside>
<ResizeHandle startLabel="outline" endLabel="canvas" {...outline.handle} />
<main>{canvas}</main>
<ResizeHandle startLabel="canvas" endLabel="inspector" {...inspector.handle} />
<aside style={{ inlineSize: inspector.size }}>{inspectorForm}</aside>`;

export { RAILS, RESIZE_CHOICES, RESIZE_CODE, RESIZE_MAPPING, RESIZE_TEXT };
