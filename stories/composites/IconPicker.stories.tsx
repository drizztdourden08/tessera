/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { IconPickerDemo } from './_samples/IconPickerDemo';
import type { IconPickerDemoProps } from './_samples/IconPickerDemo';

const ARGS: Partial<IconPickerDemoProps> = { allowUpload: true, disabled: false };

const ARG_TYPES: PlaygroundArgTypes<IconPickerDemoProps> = {
  allowUpload: { group: 'Behaviour', control: 'boolean', description: 'Show the SVG and PNG upload button.' },
  disabled: { group: 'State', control: 'boolean', description: 'Stop the button from opening.' },
};

const meta = {
  title: 'Composites · Inputs/IconPicker',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<IconPickerDemoProps>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <IconPickerDemo {...args} />,
} satisfies PlaygroundStory<IconPickerDemoProps>;

const CODE = `import { IconPicker } from '@drizztdourden08/tessera';

<IconPicker label="Project icon" value={icon} onChange={setIcon} />`;

const Overview = overviewStory({
  component: 'IconPicker',
  description: 'A button that shows the current icon and opens a grid of icons, with a search and an SVG or PNG upload.',
  points: [
    'One value comes out: an icon name, an SVG text or a PNG data URL.',
    'Down moves from the search into the grid; arrows move, Enter picks, Escape closes.',
    'An SVG over 64 KB or a PNG over 256 KB is refused with a message under the button.',
  ],
  instead: '[ChoiceGrid] for a grid of cells you draw yourself.',
  playground: Playground,
  variants: [],
  code: CODE,
});

export default meta;
export { Overview, Playground };
