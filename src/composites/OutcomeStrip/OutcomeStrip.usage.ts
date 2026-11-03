/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A row of small cells, one per step of a test plan, each toned by its outcome, with the current step outlined and its label on hover.',
  useWhen: [
    'A card or a runner shows how far a list of steps has got and how each one ended.',
    'The user may jump to a step by pressing its cell.',
  ],
  avoidWhen: [
    { case: 'The steps are numbered stages of one task with a current position.', use: 'Stepper' },
    { case: 'The row shows parts of one total as proportions.', use: 'StackedBar' },
  ],
  rules: [
    'Pass steps. A step has an id, an outcome and a label. The strip keeps no state.',
    'outcome is pass, fail, partial, blocked, skip, pending or current. Pass is green, fail red, partial amber, blocked blue, skip faint and pending an empty cell. Current is an empty cell with an outline.',
    'size xs is for a card and sm is for a runner. sm is the default.',
    'The label of a step shows in a tooltip on hover and focus and is the name of the cell.',
    'Pass onSelect and every cell becomes a button that calls it with the step id. Without it the cells are static.',
    'The cells wrap to the next line when there are more than the row can hold.',
  ],
  a11y: [
    'With onSelect the strip is a toolbar with one Tab stop, on the current cell or the last one focused. Left and Right arrows, Home and End move between cells; Enter and Space select.',
    'Without onSelect the strip is a group of images named by their labels.',
    'The current cell has aria-current step and an outline, so the outcome is not shown by colour alone.',
  ],
  tree: {
    path: ['a status, a count or a label', 'one cell per step, toned by its outcome'],
    rule: 'OutcomeStrip is the row of toned cells that shows how each step of a plan ended.',
  },
  example: `import { OutcomeStrip } from '@drizztdourden08/tessera';

const opened: string[] = [];
const openStep = (id: string) => opened.push(id);

const steps = [
  { id: 't1', outcome: 'pass', label: 'Sign in' },
  { id: 't2', outcome: 'fail', label: 'Reset password' },
  { id: 't3', outcome: 'current', label: 'Change email' },
  { id: 't4', outcome: 'pending', label: 'Delete account' },
] as const;

const Runner = () => <OutcomeStrip aria-label="Test plan" steps={steps} size="sm" onSelect={openStep} />;
`,
  propsHash: '06756cb5c719d88e',
} satisfies ComponentUsage;

export { usage };
