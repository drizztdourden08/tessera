/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, Flex, Icon, Text } from '../../src/primitives';
import type { ButtonLook, ButtonSize, ButtonVariant } from '../../src/primitives/Button/Button.type';
import { overviewStory } from '../_template/overview-story';
import { forceAttributes } from '../_template/states/force-attributes';
import type { StateEntry, StateProps } from '../_template/states/states.type';
import { ButtonHints } from './_samples/ButtonHints';
import { ButtonLoading } from './_samples/button-loading';
import { ButtonPixel } from './_samples/button-pixel';
import { BUTTON_STATES } from './_samples/button-states';
import { markedStates } from './_samples/marked-states';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import './Button.stories.css';

type ButtonArgs = {
  label: string;
  variant: ButtonVariant;
  size: ButtonSize;
  look: ButtonLook;
  disabled: boolean;
  loading: boolean;
  active: boolean;
};

const VARIANTS: readonly ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'info', 'success', 'ghost'];

const ARGS: Partial<ButtonArgs> = { label: 'Save changes', variant: 'primary', size: 'md', look: 'flat', disabled: false, loading: false, active: false };

const meta = {
  title: 'Primitives · Actions/Button',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ButtonArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: {
    label: { group: 'Content', control: 'text' },
    variant: { group: 'Appearance', control: 'select', options: [...VARIANTS] },
    size: { group: 'Appearance', control: 'select', options: ['xs', 'sm', 'md'] },
    look: { group: 'Appearance', control: 'select', options: ['flat', 'pixel'], description: 'pixel draws a dithered fill, a stepped frame and the game font; it has no ghost form.' },
    disabled: { group: 'State', control: 'boolean' },
    loading: { group: 'State', control: 'boolean', description: 'Shows the spinner in place of the icon, or over the label, and disables the button.' },
    active: { group: 'State', control: 'boolean' },
  },
  render: (args) => (
    <Button variant={args.variant} size={args.size} look={args.look} disabled={args.disabled} loading={args.loading} active={args.active}>
      {args.label}
    </Button>
  ),
} satisfies PlaygroundStory<ButtonArgs>;

const SIZES: readonly ButtonSize[] = ['md', 'sm', 'xs'];

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

const Icons = {
  name: 'An icon before or after the label',
  render: () => (
    <Demonstrator
      rows={axis(['icon', 'iconEnd', 'both'] as const)}
      columns={axis(SIZES)}
      cell={(side, size) => (
        <Button
          variant="secondary"
          size={size}
          icon={side === 'iconEnd' ? undefined : <Icon name="save" />}
          iconEnd={side === 'icon' ? undefined : <Icon name="chevron-down" />}
        >
          Save
        </Button>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<ButtonArgs>;

const EveryIcon = {
  name: 'Every variant and size with an icon',
  render: () => (
    <Demonstrator
      rows={axis(VARIANTS)}
      columns={axis(SIZES)}
      cell={(variant, size) => (
        <Flex gap="sm" align="center">
          <Button variant={variant} size={size} icon={<Icon name="plus" />}>New save</Button>
          <Button variant={variant} size={size} iconEnd={<Icon name="chevron-down" />}>Open</Button>
        </Flex>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<ButtonArgs>;

const Loading = {
  name: 'Loading',
  render: () => <ButtonLoading />,
} satisfies StoryLiteStoryDefinition<ButtonArgs>;

const PixelLook = {
  name: 'Pixel look',
  render: () => <ButtonPixel />,
} satisfies StoryLiteStoryDefinition<ButtonArgs>;

const TightRow = {
  name: 'In a tight row',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">A 224 px row: each label stays on one line, and a button that does not fit moves down</Text>
      <Flex gap="sm" wrap className="button-demo__tight">
        <Button variant="primary" size="sm">Save</Button>
        <Button size="sm">Discard the draft</Button>
        <Button variant="ghost" size="sm">Open the log</Button>
      </Flex>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ButtonArgs>;

const Hints = {
  name: 'Reporting a hint to a HintLine',
  render: () => <ButtonHints />,
} satisfies StoryLiteStoryDefinition<ButtonArgs>;

const renderState = (props: StateProps, pseudo?: StateEntry['pseudo']) => (
  <Flex gap="sm" align="center">
    {STATE_BUTTONS.map(({ variant, label, withIcon }) => (
      <Button key={variant} variant={variant} icon={withIcon ? <Icon name="copy" /> : undefined} {...forceAttributes(pseudo)} {...props}>{label}</Button>
    ))}
  </Flex>
);

const Overview = overviewStory({
  component: 'Button',
  description: 'The control for an action the user starts, such as saving, opening or confirming.',
  points: [
    '`primary` marks the main action of a view; `secondary` and `tertiary` sit beside it, `ghost` in toolbars.',
    '`danger`, `warning`, `info` and `success` carry an urgency.',
    '`md` is 39 px tall, `sm` 28 px and `xs` 20 px; a compact [DensityScope] makes `sm` the default.',
    '`active` marks a toggle button as on, announced as pressed; `hint` reports to a [HintScope], as on [IconButton].',
    '`look="pixel"` draws a dithered fill, a stepped frame and the game font; ghost keeps its flat look.',
    '`icon` or `iconEnd` sits beside the label; `loading` swaps in a [Spinner], keeps the width, ignores clicks.',
  ],
  instead: '[IconButton] for an icon alone, or [Pressable] for a clickable surface with a look of its own.',
  playground: Playground,
  variants: [AllVariants, Icons, EveryIcon, Loading, PixelLook, TightRow, Hints],
  states: markedStates(BUTTON_STATES, renderState),
});

export default meta;
export { AllVariants, EveryIcon, Hints, Icons, Loading, Overview, PixelLook, Playground, TightRow };
