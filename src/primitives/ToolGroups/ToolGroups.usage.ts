/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Tools in groups, each under a small label, with a line between groups, for the top bar of a studio or the toolbar of an editor.',
  useWhen: [
    'A bar holds several kinds of actions that read better under a name, such as Save to this app and Export a file.',
    'The toolbar of an editor mixes buttons, toggles and a segmented control, grouped by what they change.',
  ],
  avoidWhen: [
    { case: 'Buttons joined into one control with shared borders.', use: 'ButtonGroup' },
    { case: 'Actions on one item that fold into More when the room runs out.', use: 'ActionBar' },
    { case: 'A plain row of buttons with no names over them.', use: 'ButtonRow' },
  ],
  rules: [
    'Pass groups as { id, label, content }; content holds any controls, such as buttons or a SegmentedControl.',
    'Keep labels short and in sentence case; they name what the tools do, such as View or Export a file.',
    'Pass label to name the whole set when it is not the only toolbar on the screen.',
    'The groups wrap to a new line when the room runs out, so keep each group small.',
  ],
  a11y: [
    'Each group is a group named by its visible label, so a screen reader reads the label before the tools.',
    'With label, the whole set is a group named by it.',
  ],
  tree: {
    path: ['actions', 'several related buttons', 'tools in groups, each under a small label'],
    rule: 'ToolGroups names each group of tools with a small label and draws a line between groups; StudioLayout uses it for its bar and its toolbar.',
  },
  example: `import { Button, ToolGroups } from '@drizztdourden08/tessera';

const FileActions = ({ onSave, onExport }: { onSave: () => void; onExport: () => void }) => (
  <ToolGroups
    groups={[
      { id: 'save', label: 'Save to this app', content: <Button size="sm" onClick={onSave}>Save</Button> },
      { id: 'export', label: 'Export a file', content: <Button size="sm" variant="secondary" onClick={onExport}>Export PNG</Button> },
    ]}
  />
);
`,
  propsHash: 'f075de6326e0df7b',
} satisfies ComponentUsage;

export { usage };
