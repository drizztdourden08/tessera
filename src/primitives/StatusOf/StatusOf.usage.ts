/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Draws one state from a table of states declared once with defineStatuses, so a state reads the same on every screen.',
  useWhen: [
    'A kind of state, such as a session, a player or an engine, shows on more than one screen.',
    'An app keeps a table that maps each state to a label and a tone, and draws a Status from it by hand.',
  ],
  avoidWhen: [
    { case: 'One state shows in one place and has no table behind it.', use: 'Status' },
    { case: 'The state is a step in a task the user walks through.', use: 'Stepper' },
  ],
  rules: [
    'Declare each table once with defineStatuses, in a constants file beside the model it describes, and import it where the state shows.',
    'Give every key a label in sentence case; the pill variant sets it in capitals itself.',
    'Set pulse only on states that are still moving, such as starting or generating.',
    'Pass fallback for a value that can be missing, such as a state not fetched yet.',
  ],
  a11y: [
    'The label is the text a screen reader reads; the tone, the dot and the icon add nothing it needs.',
    'An icon is hidden from screen readers and takes the place of the dot.',
  ],
  tree: {
    path: ['a status, a count or a label', 'one of a set of states, declared once'],
    rule: 'StatusOf reads the label, the tone, the pulse and the icon from one typed table, so a state cannot drift between screens.',
  },
  example: `import { defineStatuses, StatusOf } from '@drizztdourden08/tessera';

const ENGINE_STATES = defineStatuses({
  ready: { label: 'Ready', tone: 'success' },
  building: { label: 'Setting up', tone: 'warning', pulse: true },
  failed: { label: 'Broken', tone: 'danger' },
  unknown: { label: 'Checking', tone: 'neutral' },
});

const EngineState = ({ state }: { state?: 'ready' | 'building' | 'failed' }) => (
  <StatusOf map={ENGINE_STATES} value={state} fallback="unknown" dot />
);
`,
  propsHash: '039ed0ca4d8db489',
} satisfies ComponentUsage;

export { usage };
