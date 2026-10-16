/* @layer stories @kind data */
const TOOL_TEXT = {
  file: 'File',
  view: 'View',
  zoom: 'Zoom',
  save: 'Save to this app',
  share: 'Export a file',
  run: 'Run',
  format: 'Format',
  wrap: 'Wrap lines',
  editor: 'Intro script',
  zoomLevel: '100%',
  lines: [
    'on start:',
    '  show title "A Link to the Past"',
    '  wait 2 seconds',
    '  fade to the overworld',
    'on press Start:',
    '  open the item menu',
  ],
} as const;

const TOOL_FRAME_CODE = `import { ToolFrame, ToolGroups } from '@drizztdourden08/tessera';

<ToolFrame
  as="section"
  aria-label="Intro script"
  padded
  toolbar={<ToolGroups groups={[{ id: 'file', label: 'File', content: <RunButtons /> }]} />}
>
  <ScriptEditor />
</ToolFrame>`;

const TOOL_GROUPS_CODE = `import { Button, ToolGroups } from '@drizztdourden08/tessera';

<ToolGroups
  groups={[
    { id: 'save', label: 'Save to this app', content: <><Button size="sm">Save</Button><Button size="sm" variant="secondary">Save as a copy</Button></> },
    { id: 'export', label: 'Export a file', content: <Button size="sm" variant="secondary">Export PNG</Button> },
  ]}
/>`;

export { TOOL_FRAME_CODE, TOOL_GROUPS_CODE, TOOL_TEXT };
