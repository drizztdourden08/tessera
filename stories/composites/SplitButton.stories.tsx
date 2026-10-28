/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { ButtonSize, ButtonVariant } from '../../src/primitives';
import { axis } from '../_template/axis';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { SplitButtonDemo } from './_samples/SplitButtonDemo';

type SplitButtonArgs = { label: string; variant: ButtonVariant; size: ButtonSize; pressed: boolean; toggle: boolean; disabled: boolean };

const VARIANTS: readonly ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'ghost'];
const SIZES: readonly ButtonSize[] = ['xs', 'sm', 'md', 'lg'];

const ARGS: SplitButtonArgs = { label: 'New file', variant: 'secondary', size: 'md', pressed: false, toggle: false, disabled: false };

const ARG_TYPES: PlaygroundArgTypes<SplitButtonArgs> = {
  label: { group: 'Content', control: 'text', description: 'Names the main action.' },
  variant: { group: 'Appearance', control: 'select', options: VARIANTS },
  size: { group: 'Appearance', control: 'select', options: SIZES },
  toggle: { group: 'Behaviour', control: 'boolean', description: 'Give it pressed, so the main button toggles on and off.' },
  pressed: { group: 'State', control: 'boolean', description: 'The on look of a toggle; needs toggle.' },
  disabled: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Composites · Actions/SplitButton',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SplitButtonArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SplitButtonDemo key={String(args.toggle)} {...args} pressed={args.toggle ? args.pressed : undefined} />,
} satisfies PlaygroundStory<SplitButtonArgs>;

const Variants = {
  name: 'Variants',
  render: () => <Demonstrator rows={axis(VARIANTS)} cell={(variant) => <SplitButtonDemo variant={variant} />} />,
} satisfies StoryLiteStoryDefinition<SplitButtonArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => <Demonstrator rows={axis(SIZES)} cell={(size) => <SplitButtonDemo size={size} />} />,
} satisfies StoryLiteStoryDefinition<SplitButtonArgs>;

const Toggle = {
  name: 'Toggle: the main button flips pressed, the chevron keeps its menu',
  render: () => <SplitButtonDemo label="Snap" toggle />,
} satisfies StoryLiteStoryDefinition<SplitButtonArgs>;

const CODE = `import { SplitButton } from '@drizztdourden08/tessera';

<SplitButton
  label="New file"
  onClick={createFile}
  menuLabel="New options"
  items={[
    { id: 'folder', label: 'New folder', onSelect: createFolder },
    { id: 'template', label: 'New from template', onSelect: createFromTemplate },
  ]}
/>`;

const Overview = overviewStory({
  component: 'SplitButton',
  description: 'A button that runs its main action, joined to a chevron that opens the related actions.',
  points: [
    'Use it when one action is the usual choice and its variants sit one step behind it.',
    '`label` and `onClick` are the main action; `items` are the menu behind the chevron.',
    '`pressed` makes the main button a toggle with an on look and `aria-pressed`.',
    '`variant` and `size` follow [Button]; the chevron matches both.',
    'The chevron is named by `menuLabel` and reports `aria-haspopup` and `aria-expanded`.',
  ],
  instead: '[DropdownMenu] when no action is the usual choice.',
  playground: Playground,
  variants: [Variants, Sizes, Toggle],
  code: CODE,
});

export default meta;
export { Overview, Playground, Sizes, Toggle, Variants };
