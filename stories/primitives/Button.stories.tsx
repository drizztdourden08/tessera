/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Button, Flex } from '../../src/primitives';
import type { ButtonSize, ButtonVariant } from '../../src/primitives/Button/Button.type';
import { overviewStory } from '../_template/overview-story';
import { forceAttributes } from '../_template/states/force-attributes';
import type { StateEntry, StateProps } from '../_template/states/states.type';
import { BUTTON_STATES } from './_samples/button-states';
import { markedStates } from './_samples/marked-states';
import { axis, VariantGrid } from '../_template/VariantGrid';

type ButtonArgs = {
  label: string;
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  active: boolean;
};

const VARIANTS: readonly ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'info', 'success', 'ghost'];

const ARGS: Partial<ButtonArgs> = { label: 'Save changes', variant: 'primary', size: 'md', disabled: false, active: false };

const meta = {
  title: 'Primitives · Actions/Button',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ButtonArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: [...VARIANTS] },
    size: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    active: { control: 'boolean' },
  },
  render: (args) => (
    <Button variant={args.variant} size={args.size} disabled={args.disabled} active={args.active}>
      {args.label}
    </Button>
  ),
} satisfies StoryLiteStoryDefinition<ButtonArgs>;

const SIZES: readonly ButtonSize[] = ['md', 'sm'];

const STATE_BUTTONS: readonly { variant: ButtonVariant; label: string }[] = [
  { variant: 'primary', label: 'Save changes' },
  { variant: 'tertiary', label: 'Preview' },
  { variant: 'danger', label: 'Delete' },
  { variant: 'ghost', label: 'Cancel' },
];

const AllVariants = {
  name: 'All variants',
  render: () => (
    <VariantGrid
      rows={axis(VARIANTS)}
      columns={axis(SIZES)}
      cell={(variant, size) => <Button variant={variant} size={size}>Save changes</Button>}
    />
  ),
} satisfies StoryLiteStoryDefinition<ButtonArgs>;

const renderState = (props: StateProps, pseudo?: StateEntry['pseudo']) => (
  <Flex gap="sm" align="center">
    {STATE_BUTTONS.map(({ variant, label }) => <Button key={variant} variant={variant} {...forceAttributes(pseudo)} {...props}>{label}</Button>)}
  </Flex>
);

const Overview = overviewStory({
  component: 'Button',
  description: 'The one control for an action the user starts: saving, opening, confirming. Primary marks the main action of a view, secondary and tertiary the ones beside it. Danger, warning, info and success carry an urgency. Every coloured variant rests as a dim tint and fills with its colour on hover. Ghost stays out of the way in toolbars and rows. Two sizes. A focused button draws a ring in the primary colour and a pressed one sinks to a deeper fill. Set active on a button that toggles to mark it as on; it is announced as pressed. A clickable container with a look of its own is a Pressable, not a Button.',
  playground: Playground,
  variants: [AllVariants],
  states: markedStates(BUTTON_STATES, renderState),
});

export default meta;
export { AllVariants, Overview, Playground };
