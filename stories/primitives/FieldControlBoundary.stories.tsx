/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { BoundedRange } from './_samples/BoundedRange';

const COLUMNS = ['Without a boundary', 'With a boundary'] as const;

const meta = {
  title: 'Primitives · Inputs/FieldControlBoundary',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Compare = {
  name: 'A range of two inputs in one Field',
  render: () => (
    <Demonstrator
      columns={axis(COLUMNS)}
      valign="start"
      align="stretch"
      fill
      cell={(_row, column) => <BoundedRange bounded={column === 'With a boundary'} />}
    />
  ),
} satisfies StoryLiteStoryDefinition;

const CODE = `import { Field, FieldControlBoundary, Flex, NumberInput } from '@drizztdourden08/tessera';

<Field label="Hint cost range" error={error}>
  <FieldControlBoundary>
    <Flex gap="xs">
      <NumberInput aria-label="From" value={low} onChange={setLow} />
      <NumberInput aria-label="To" value={high} onChange={setHigh} />
    </Flex>
  </FieldControlBoundary>
</Field>`;

const Overview = overviewStory({
  component: 'FieldControlBoundary',
  description: 'Stops a Field from handing its id, error state, note and size to the inputs inside. Field gives these to the one control it wraps; when that control is built from several inputs, such as a low and high pair, every input would take the same id and turn red together. Wrap the inner inputs in a boundary and label each one with aria-label. It draws nothing and takes no props. The Field still shows its error line below. A single input in a Field needs no boundary.',
  variants: [Compare],
  code: CODE,
});

export default meta;
export { Compare, Overview };
