/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Button } from '../../src/primitives';
import type { ButtonSize, ButtonVariant } from '../../src/primitives/Button/Button.type';
import { overviewStory } from '../_template/overview-story';
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

const STATES = ['md', 'sm', 'disabled'] as const;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <VariantGrid
      rows={axis(VARIANTS)}
      columns={axis(STATES)}
      cell={(variant, state) => (
        <Button variant={variant} size={state === 'sm' ? 'sm' : 'md'} disabled={state === 'disabled'}>Save changes</Button>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<ButtonArgs>;

const Overview = overviewStory({
  component: 'Button',
  description: 'The one control for an action the user starts: saving, opening, confirming. Primary marks the main action of a view, secondary and tertiary the ones beside it. Danger, warning, info and success carry an urgency. Every coloured variant rests as a dim tint and fills with its colour on hover. Ghost stays out of the way in toolbars and rows. Two sizes, and an active state for a button that toggles. A clickable container with a look of its own is a Pressable, not a Button.',
  playground: Playground,
  variants: [AllVariants],
});

export default meta;
export { AllVariants, Overview, Playground };
