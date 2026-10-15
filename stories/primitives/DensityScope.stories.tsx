/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { Density } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { DenseEditorPanel } from './_samples/DenseEditorPanel';

const DENSITIES: readonly Density[] = ['comfortable', 'compact'];

const meta = {
  title: 'Primitives · Inputs/DensityScope',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const EditorPanel = {
  name: 'A dense editor panel',
  render: () => <DenseEditorPanel density="compact" />,
} satisfies StoryLiteStoryDefinition;

const Compare = {
  name: 'Comfortable and compact',
  render: () => (
    <Demonstrator
      columns={axis(DENSITIES)}
      valign="start"
      cell={(_row, column) => <DenseEditorPanel density={column} />}
    />
  ),
} satisfies StoryLiteStoryDefinition;

const CODE = `import { DensityScope, Field, Select, Slider } from '@drizztdourden08/tessera';

<DensityScope density="compact">
  <Field label="Anchor">
    <Select options={ANCHORS} value={anchor} onChange={setAnchor} />
  </Field>
  <Field label="Width">
    <Slider value={width} max={400} onChange={setWidth} />
  </Field>
</DensityScope>`;

const Overview = overviewStory({
  component: 'DensityScope',
  description: 'Sets how dense the form parts inside it are, once for a whole panel, such as an inspector beside a canvas.',
  points: [
    '`compact` draws every input, Field and Button inside at `sm` unless the part sets its own `size`.',
    'It also tightens the gap inside a Slider, Checkbox, SegmentedControl and ToggleGroup, and a DisabledOverlay.',
    'A `comfortable` scope inside a compact one brings the parts back to their usual size.',
    'It draws no box of its own, so it never changes the layout around its children.',
  ],
  instead: '[Field] with `size="sm"` for one small control in an otherwise usual form.',
  variants: [EditorPanel, Compare],
  code: CODE,
});

export default meta;
export { Compare, EditorPanel, Overview };
