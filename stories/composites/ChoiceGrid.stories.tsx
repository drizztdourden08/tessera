/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { BrushPicker, RampStrip, SwatchSections } from './_samples/ChoiceGridDemos';
import type { ChoiceGridDemoProps } from './_samples/ChoiceGridDemos';

const ARGS: Partial<ChoiceGridDemoProps> = { role: 'radiogroup', columns: 3, pickOnRelease: false };

const ARG_TYPES: PlaygroundArgTypes<ChoiceGridDemoProps> = {
  role: { group: 'Behaviour', control: 'select', options: ['radiogroup', 'listbox'], description: 'A radio group picks as the arrows move; a listbox picks on Enter or Space.' },
  columns: { group: 'Layout', control: 'number', description: 'Columns in each section.' },
  pickOnRelease: { group: 'Behaviour', control: 'boolean', description: 'Pick when the pointer is let go over a cell, even if the press began elsewhere.' },
};

const meta = {
  title: 'Composites · Inputs/ChoiceGrid',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ChoiceGridDemoProps>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <BrushPicker {...args} />,
} satisfies PlaygroundStory<ChoiceGridDemoProps>;

const Ramp = {
  name: 'Ramp strip',
  render: () => <RampStrip />,
} satisfies StoryLiteStoryDefinition<ChoiceGridDemoProps>;

const Listbox = {
  name: 'Listbox ramp',
  render: () => <RampStrip role="listbox" />,
} satisfies StoryLiteStoryDefinition<ChoiceGridDemoProps>;

const Palette = {
  name: 'Swatches in sections',
  render: () => <SwatchSections />,
} satisfies StoryLiteStoryDefinition<ChoiceGridDemoProps>;

const CODE = `import { ChoiceGrid, ColorSwatch } from '@drizztdourden08/tessera';

<ChoiceGrid
  label="Ramp"
  value={shade}
  onChange={setShade}
  cells={cells}
  renderCell={(cell, state) => (
    <ColorSwatch color={colors[cell.value]} selected={state.selected} focusRing="apart" {...state.props} />
  )}
/>`;

const Overview = overviewStory({
  component: 'ChoiceGrid',
  description: 'A row or grid of any cells where one is picked, as one radio group or one listbox.',
  points: [
    'It is one Tab stop: arrows move, Home and End jump, and Up and Down step a row when `columns` is set.',
    '`sections` group the cells under headings; arrows cross from one section to the next.',
    '`renderCell` draws each cell, such as a `ColorSwatch`; spread `state.props` on it.',
    '`pickOnRelease` picks when the pointer is let go over a cell, for a palette that opens under a held press.',
    '`footer` holds an add button or a hint under the cells.',
  ],
  instead: '[SegmentedControl] for a few text options in one line, or [Select] for a long list.',
  playground: Playground,
  variants: [Ramp, Listbox, Palette],
  code: CODE,
});

export default meta;
export { Listbox, Overview, Palette, Playground, Ramp };
