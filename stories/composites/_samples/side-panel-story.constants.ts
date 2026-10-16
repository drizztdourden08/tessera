/* @layer stories @kind data */
const SIDE_PANEL_TEXT = {
  outline: 'Layers',
  inspector: 'Inspector',
  add: 'Add a layer',
  layers: ['Health bar', 'Magic meter', 'Rupee count', 'Item box', 'Minimap'],
  canvas: 'The HUD canvas. Fold a panel with the round button on its edge, or drag the line beside it.',
  inspectorLine: 'The picked layer: its place, its size and its colours.',
} as const;

const SIDE_PANEL_CODE = `import { Flex, SidePanel } from '@drizztdourden08/tessera';

<Flex gap="2xs" align="stretch" className="controls-page">
  <SidePanel title="Profiles" storageKey="controls.profiles" actions={<NewProfileButton />} rail={<ProfileIcons />}>
    <ProfileList />
  </SidePanel>
  <BindingsView />
  <SidePanel side="end" title="Devices" storageKey="controls.devices" actions={<RescanButton />}>
    <DeviceCards />
  </SidePanel>
</Flex>`;

export { SIDE_PANEL_CODE, SIDE_PANEL_TEXT };
