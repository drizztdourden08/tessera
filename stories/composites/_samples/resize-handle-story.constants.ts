/* @layer stories @kind data */
const RAILS = {
  outline: { initial: 224, min: 160, max: 360 },
  inspector: { initial: 256, min: 192, max: 400 },
  console: { initial: 96, min: 64, max: 192 },
} as const;

const RESIZE_TEXT = {
  outline: 'outline',
  canvas: 'canvas',
  inspector: 'inspector',
  editor: 'editor',
  console: 'console',
  outlineTitle: 'Outline',
  inspectorTitle: 'Inspector',
  consoleTitle: 'Console',
  canvasLine: 'The HUD canvas. Drag either line, or focus it and use the arrow keys, Home, End and Enter.',
  editorLine: 'The script editor. The console under it keeps its height in pixels.',
} as const;

const RESIZE_CODE = `import { ResizeHandle, usePaneSize } from '@drizztdourden08/tessera';

const outline = usePaneSize({ initial: 224, min: 160, max: 360, storageKey: 'hud.outline' });
const inspector = usePaneSize({ initial: 256, min: 192, max: 400, storageKey: 'hud.inspector' });

<aside id="outline" className="hud-outline">{outlineTree}</aside>
<ResizeHandle label="Resize outline" controls="outline" {...outline.handle} />
<main className="hud-canvas">{canvas}</main>
<ResizeHandle label="Resize inspector" controls="inspector" edge="end" {...inspector.handle} />
<aside id="inspector" className="hud-inspector">{inspectorForm}</aside>`;

export { RAILS, RESIZE_CODE, RESIZE_TEXT };
