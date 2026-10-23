/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The thin bar at the foot of an editor window: a row of labelled readouts such as cursor, zoom, colour and frame.',
  useWhen: [
    'An editor or tool window shows live facts about its work, such as the pixel under the pointer and the current zoom.',
    'A readout needs a small colour chip beside its value, such as the colour you are drawing with.',
  ],
  avoidWhen: [
    { case: 'The save state of a form and its Save and Discard buttons.', use: 'SaveBar' },
    { case: 'One label and value on a line inside a panel, not a bar.', use: 'StatRow' },
    { case: 'A headline number with its trend and chart.', use: 'StatTile' },
  ],
  rules: [
    'Give each item a stable id, a short label and a value; keep the value short, such as 24, 17 or 800%.',
    'Set align to end for the readouts that describe the document, such as layer and frame, and leave the rest at the start.',
    'Set priority from 1 to 3 on the readouts that may go when the bar is narrow: 3 goes first, 1 last. An item with no priority never goes.',
    'Pass swatch as a CSS colour value and put the colour name or hex in the value, so the chip is never the only signal.',
    'Use tone on a value only when it is past a limit, and title for a longer description on hover.',
    'Give the bar a label that names the region, such as Editor status.',
  ],
  a11y: [
    'The bar is a labelled region and each readout is a term and its value in a description list.',
    'It has no live region, so a cursor position that changes on every pointer move is never announced.',
    'To announce a change, such as a finished export, use a separate live region, not the bar.',
    'The swatch is hidden from assistive technology; its colour is read from the value beside it.',
  ],
  tree: {
    path: ['layout', 'window chrome', 'the status line at the foot'],
    rule: 'StatusBar is the one thin line of readouts at the foot of an editor window.',
  },
  example: `import { StatusBar } from '@drizztdourden08/tessera';

const EditorStatus = ({ x, y, colour }: { x: number; y: number; colour: string }) => (
  <StatusBar
    label="Editor status"
    items={[
      { id: 'cursor', label: 'Cursor', value: \`\${x}, \${y}\`, icon: 'move' },
      { id: 'colour', label: 'Colour', value: colour, swatch: colour },
      { id: 'frame', label: 'Frame', value: '3 / 8', align: 'end', priority: 1 },
    ]}
  />
);
`,
  propsHash: '0d473a9c0b7aba37',
} satisfies ComponentUsage;

export { usage };
