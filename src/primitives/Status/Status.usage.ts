/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A read-only word for the state something is in, given as a word and a tone, or as a key of a table of states declared once.',
  useWhen: [
    'A connection, a sync, a session or a draft shows its state beside its name.',
    'A kind of state, such as a session or an engine, shows on more than one screen, so its words and tones live in one table.',
  ],
  avoidWhen: [
    { case: 'The value is a count, or a dot for news.', use: 'Badge' },
    { case: 'The value sorts an item into a group the user can filter on.', use: 'Tag' },
    { case: 'The state is a step in a task the user walks through.', use: 'Stepper' },
  ],
  rules: [
    'Pass a word and a tone for a state that shows in one place; pass map and value for a kind of state that shows on several screens.',
    'Declare each table once with defineStatuses, in a constants file beside the model it describes, and import it where the state shows.',
    'Give every word in sentence case; the pill variant sets it in capitals itself.',
    'Set pulse only on states that are still moving, such as starting or syncing.',
    'Pass fallback for a value that can be missing, such as a state not fetched yet.',
  ],
  a11y: [
    'The word is the text a screen reader reads; the tone, the dot and the icon add nothing it needs.',
    'Add role status when the state changes while the user watches, so the new word is announced.',
    'An icon from a table is hidden from screen readers and takes the place of the dot.',
  ],
  tree: {
    path: ['a status, a count or a label', 'the state something is in'],
    rule: 'Status draws one word in the tone of its state; with a table from defineStatuses, a state reads the same on every screen.',
  },
  example: `import { defineStatuses, Status } from '@drizztdourden08/tessera';

const ENGINE_STATES = defineStatuses({
  ready: { label: 'Ready', tone: 'success' },
  building: { label: 'Setting up', tone: 'warning', pulse: true },
  failed: { label: 'Broken', tone: 'danger' },
  unknown: { label: 'Checking', tone: 'neutral' },
});

const Sync = () => <Status tone="warning" dot pulse>Syncing</Status>;

const EngineState = ({ state }: { state?: 'ready' | 'building' | 'failed' }) => (
  <Status map={ENGINE_STATES} value={state} fallback="unknown" dot />
);
`,
  propsHash: '0f2e7a81aebe29c7',
} satisfies ComponentUsage;

export { usage };
