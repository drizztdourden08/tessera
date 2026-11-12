/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Two or more trees side by side on one shared row axis, such as a source plan and its live run, so row 5 of every column is the same step.',
  useWhen: [
    'A plan and its run, or a before and an after, must be compared step by step.',
    'Each column draws the same tree, and a step that one side lacks stays as an empty slot so the rows still line up.',
  ],
  avoidWhen: [
    { case: 'One tree the user opens and closes.', use: 'GroupTree' },
    { case: 'Rows of flat records the user sorts or filters.', use: 'DataTable' },
  ],
  rules: [
    'Give each column an id and a title; set width on a column that needs a fixed size, with fill for the one that takes the leftover.',
    'Give each row an id, a depth from 0 to 8 and a cells record keyed by column id; the depth indents every cell of that row.',
    'Leave a column out of cells, or set it to undefined, when that side has no such step; the cell draws the ghost.',
    'Pass ghost to change what a missing cell shows; it defaults to a faint dash.',
    'Pass tone on a row (accent, success, warning, danger or info) to tint the whole row, such as accent for the step that runs now.',
    'Pass label to name the table for a screen reader.',
  ],
  a11y: [
    'It is a real table, so each cell reads with its column title.',
    'A ghost cell is only a placeholder; do not put text in it that a reader must act on.',
  ],
  tree: {
    path: ['data', 'trees side by side on one row axis'],
    rule: 'PairedTree draws N trees from Table parts on a shared row axis, with a ghost where one side has no step.',
  },
  example: `import { PairedTree } from '@drizztdourden08/tessera';

const PlanAndRun = () => (
  <PairedTree
    label="Plan and run"
    columns={[
      { id: 'plan', title: 'Plan', width: 'lg' },
      { id: 'run', title: 'Run', width: 'fill' },
    ]}
    rows={[
      { id: 'a', depth: 0, cells: { plan: 'Build', run: 'Build' }, tone: 'success' },
      { id: 'b', depth: 1, cells: { plan: 'Compile', run: undefined } },
    ]}
  />
);
`,
  propsHash: '1db58850d24a2250',
} satisfies ComponentUsage;

export { usage };
