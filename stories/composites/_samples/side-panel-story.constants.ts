/* @layer stories @kind data */
const SIDE_PANEL_TEXT = {
  outline: 'Layers',
  inspector: 'Inspector',
  add: 'Add a layer',
  layers: ['Health bar', 'Magic meter', 'Rupee count', 'Item box', 'Minimap'],
  canvas: 'The HUD canvas. Fold a panel with the button in its heading, or drag the line beside it.',
  inspectorLine: 'The picked layer: its place, its size and its colours.',
} as const;

const SIDE_PANEL_CODE = `import { SidePanel } from '@drizztdourden08/tessera';

<SidePanel title="Layers" storageKey="hud.layers" actions={<AddLayerButton />}>
  <LayerList />
</SidePanel>
<HudCanvas />
<SidePanel side="end" title="Inspector" storageKey="hud.inspector">
  <LayerForm />
</SidePanel>`;

export { SIDE_PANEL_CODE, SIDE_PANEL_TEXT };
