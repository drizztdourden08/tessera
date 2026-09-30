/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Button, Flex, Glyph } from '../../src/primitives';
import type { ButtonSize, ButtonVariant } from '../../src/primitives/Button/Button.type';
import { overviewStory } from '../_template/overview-story';
import { forceAttributes } from '../_template/states/force-attributes';
import type { StateEntry, StateProps } from '../_template/states/states.type';
import { ButtonLoading } from './_samples/button-loading';
import { BUTTON_STATES } from './_samples/button-states';
import { markedStates } from './_samples/marked-states';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';

type ButtonArgs = {
  label: string;
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  loading: boolean;
  active: boolean;
};

const VARIANTS: readonly ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'info', 'success', 'ghost'];

const ARGS: Partial<ButtonArgs> = { label: 'Save changes', variant: 'primary', size: 'md', disabled: false, loading: false, active: false };

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
    loading: { control: 'boolean', description: 'Shows the spinner in place of the icon, or over the label, and disables the button.' },
    active: { control: 'boolean' },
  },
  render: (args) => (
    <Button variant={args.variant} size={args.size} disabled={args.disabled} loading={args.loading} active={args.active}>
      {args.label}
    </Button>
  ),
} satisfies StoryLiteStoryDefinition<ButtonArgs>;

const SIZES: readonly ButtonSize[] = ['md', 'sm'];

const STATE_BUTTONS: readonly { variant: ButtonVariant; label: string; withIcon?: boolean }[] = [
  { variant: 'primary', label: 'Save changes' },
  { variant: 'tertiary', label: 'Duplicate', withIcon: true },
  { variant: 'danger', label: 'Delete' },
  { variant: 'ghost', label: 'Cancel' },
];

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Demonstrator
      rows={axis(VARIANTS)}
      columns={axis(SIZES)}
      cell={(variant, size) => <Button variant={variant} size={size}>Save changes</Button>}
    />
  ),
} satisfies StoryLiteStoryDefinition<ButtonArgs>;

const Loading = {
  name: 'Loading',
  render: () => <ButtonLoading />,
} satisfies StoryLiteStoryDefinition<ButtonArgs>;

const renderState = (props: StateProps, pseudo?: StateEntry['pseudo']) => (
  <Flex gap="sm" align="center">
    {STATE_BUTTONS.map(({ variant, label, withIcon }) => (
      <Button key={variant} variant={variant} icon={withIcon ? <Glyph name="copy" /> : undefined} {...forceAttributes(pseudo)} {...props}>{label}</Button>
    ))}
  </Flex>
);

const Overview = overviewStory({
  component: 'Button',
  description: 'The one control for an action the user starts: saving, opening, confirming. Primary marks the main action of a view, secondary and tertiary the ones beside it. Danger, warning, info and success carry an urgency. Every coloured variant rests as a dim tint and fills with its colour on hover. Ghost stays out of the way in toolbars and rows. Two sizes. A focused button draws a ring in the primary colour and a pressed one sinks to a deeper fill. Set active on a button that toggles to mark it as on; it is announced as pressed. Set loading while the action it started runs: the Spinner takes the place of the icon, or covers the label when there is no icon, the button keeps its width, stops taking clicks and is announced as busy. Loading is not disabled: a disabled button fades and never spins. A clickable container with a look of its own is a Pressable, not a Button.',
  playground: Playground,
  variants: [AllVariants, Loading],
  states: markedStates(BUTTON_STATES, renderState),
});

export default meta;
export { AllVariants, Loading, Overview, Playground };
