/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A value in the corner of a surface that shows when it changes and fades after a second, such as the zoom of a canvas.',
  useWhen: [
    'A control changes a value the user wants to see for a moment, such as a zoom of 200%.',
    'Double click on the value should reset it.',
  ],
  avoidWhen: [
    { case: 'The user must be told that something finished or failed.', use: 'Toast' },
    { case: 'The value must stay on screen.', use: 'Text' },
  ],
  rules: [
    'Put it inside a positioned parent, which is the surface the corners belong to.',
    'Pass the live value as text; it stays hidden on first render and shows on each change.',
    'Leave showMs at one second unless the value is long to read.',
    'Pass onActivate for a reset on double click, and a title that says so.',
    'Make the control that changes the value carry its own accessible value, because the readout is hidden from screen readers.',
  ],
  a11y: [
    'The readout is hidden from screen readers; it repeats what the control already exposes.',
    'Reduced motion drops the fade.',
    'Forced colours draw it with system colours.',
  ],
  tree: {
    path: ['feedback', 'a value that shows when it changes and fades'],
    rule: 'TransientReadout is tied to one value and one surface, where Toast is a message raised from anywhere in the app.',
  },
  example: `import { TransientReadout } from '@drizztdourden08/tessera';

const ZoomReadout = ({ zoom, reset }: { zoom: number; reset: () => void }) => (
  <TransientReadout value={\`\${zoom}%\`} corner="bottom-end" onActivate={reset} title="Double click to reset" />
);
`,
  propsHash: 'dfa32fe36a500685',
} satisfies ComponentUsage;

export { usage };
