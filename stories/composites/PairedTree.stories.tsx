/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { PairedTree } from '../../src/composites';
import type { PairedTreeColumn, PairedTreeRow } from '../../src/composites';
import { overviewStory } from '../_template/overview-story';

type PairedTreeArgs = Record<string, never>;

const meta = {
  title: 'Composites · Data/PairedTree',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PairedTreeArgs>;

const COLUMNS: readonly PairedTreeColumn[] = [
  { id: 'plan', title: 'Plan', width: 'lg' },
  { id: 'run', title: 'Run', width: 'fill' },
];

const ROWS: readonly PairedTreeRow[] = [
  { id: 'build', depth: 0, cells: { plan: 'Build', run: 'Build, done' }, tone: 'success' },
  { id: 'compile', depth: 1, cells: { plan: 'Compile', run: 'Compile, done' }, tone: 'success' },
  { id: 'link', depth: 1, cells: { plan: 'Link', run: 'Link, running' }, tone: 'accent' },
  { id: 'sign', depth: 2, cells: { plan: 'Sign', run: undefined } },
  { id: 'pack', depth: 2, cells: { plan: 'Pack', run: undefined } },
  { id: 'check', depth: 0, cells: { plan: 'Check', run: 'Check, waiting' } },
  { id: 'lint', depth: 1, cells: { plan: 'Lint', run: 'Lint, waiting' } },
  { id: 'ship', depth: 0, cells: { plan: 'Ship', run: 'Ship, waiting' } },
];

const CODE = `import { PairedTree } from '@drizztdourden08/tessera';

<PairedTree
  label="Plan and run"
  columns={[
    { id: 'plan', title: 'Plan', width: 'lg' },
    { id: 'run', title: 'Run', width: 'fill' },
  ]}
  rows={[
    { id: 'build', depth: 0, cells: { plan: 'Build', run: 'Build, done' }, tone: 'success' },
    { id: 'link', depth: 1, cells: { plan: 'Link', run: undefined } },
  ]}
/>`;

const PlanAndRun = {
  name: 'A plan and its run',
  render: () => <PairedTree label="Plan and run" columns={COLUMNS} rows={ROWS} />,
} satisfies StoryLiteStoryDefinition<PairedTreeArgs>;

const Overview = overviewStory({
  component: 'PairedTree',
  description: 'Two or more trees side by side on one shared row axis, such as a plan and its live run.',
  points: [
    'Row 5 of every column is the same step, so the sides read across.',
    '`depth` indents every cell of a row, from 0 to 8.',
    'A column missing from `cells` draws the `ghost`, a faint dash by default, and keeps the row aligned.',
    '`tone` on a row tints it, such as accent for the step that runs now and success for the done ones.',
  ],
  instead: '[GroupTree] for one tree the user opens and closes.',
  variants: [PlanAndRun],
  code: CODE,
});

export default meta;
export { Overview, PlanAndRun };
