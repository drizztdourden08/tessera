/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Pressable } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { PRESSABLE_SURFACES } from './_samples/pressable-surfaces';
import { PressableClicks } from './_samples/PressableClicks';
import './Pressable.stories.css';

type PressableArgs = {
  text: string;
  disabled: boolean;
};

const ARGS: Partial<PressableArgs> = { text: 'Load the Saturday save', disabled: false };

const ARG_TYPES: StoryLiteArgTypes<PressableArgs> = {
  text: { control: 'text' },
  disabled: { control: 'boolean', description: 'Stops clicks and focus, and drops the pointer cursor.' },
};

const meta = {
  title: 'Primitives · Actions/Pressable',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PressableArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Pressable className="pressable-demo__row" disabled={args.disabled}>{args.text}</Pressable>
  ),
} satisfies StoryLiteStoryDefinition<PressableArgs>;

const Surfaces = {
  name: 'Surfaces drawn by the caller',
  render: () => (
    <Demonstrator
      rows={axis(Object.keys(PRESSABLE_SURFACES))}
      cell={(name) => PRESSABLE_SURFACES[name]}
    />
  ),
} satisfies StoryLiteStoryDefinition<PressableArgs>;

const Clicks = {
  name: 'Click, Enter and Space',
  render: () => <PressableClicks />,
} satisfies StoryLiteStoryDefinition<PressableArgs>;

const CODE = `import { Pressable } from '@drizztdourden08/tessera';

<Pressable className="save-row" onClick={() => openSave(save.id)}>
  {save.name}
</Pressable>`;

const Overview = overviewStory({
  component: 'Pressable',
  description: 'A button with its look taken away: no border, padding or background, with the font and colour of its parent. It keeps what a button does: focus, Enter and Space, disabled and type="button" by default. Use Button or IconButton unless you need a clickable surface whose whole look you draw yourself, such as a menu row, a table header or a tile. It has no hover, focus or pressed look of its own, so the class you give it draws them. Use Link when the click goes to another page.',
  playground: Playground,
  variants: [Surfaces, Clicks],
  code: CODE,
});

export default meta;
export { Clicks, Overview, Playground, Surfaces };
