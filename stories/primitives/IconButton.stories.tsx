/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Flex, Icon, IconButton } from '../../src/primitives';
import type { IconName } from '../../src/primitives';
import type { IconButtonSize, IconButtonTone, IconButtonVariant } from '../../src/primitives/IconButton/IconButton.type';
import { overviewStory } from '../_template/overview-story';
import { forceAttributes } from '../_template/states/force-attributes';
import type { StateEntry, StateProps } from '../_template/states/states.type';
import { BUTTON_STATES } from './_samples/button-states';
import { CardHeadRow } from './_samples/CardHeadRow';
import { IconButtonMixedPin } from './_samples/IconButtonMixedPin';
import { IconButtonToolbar } from './_samples/IconButtonToolbar';
import { markedStates } from './_samples/marked-states';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';

type GlyphName = 'close' | 'plus' | 'pin' | 'mute' | 'overflow' | 'bug';

type ToneChoice = 'none' | IconButtonTone;

type IconButtonArgs = {
  label: string;
  glyph: GlyphName;
  variant: IconButtonVariant;
  tone: ToneChoice;
  size: IconButtonSize;
  active: boolean;
  loading: boolean;
  disabled: boolean;
};

const VARIANTS: readonly IconButtonVariant[] = ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'info', 'success', 'ghost'];

const GLYPHS: Record<GlyphName, IconName> = {
  close: 'x',
  plus: 'plus',
  pin: 'pin',
  mute: 'volume-x',
  overflow: 'ellipsis',
  bug: 'bug',
};

const LABELS: Record<GlyphName, string> = {
  close: 'Close panel',
  plus: 'Add player',
  pin: 'Pin tracker',
  mute: 'Mute audio',
  overflow: 'More actions',
  bug: 'Report a bug',
};

const GLYPH_PX: Record<IconButtonSize, number> = { '2xs': 10, xs: 12, sm: 12, md: 16 };

const glyph = (name: GlyphName, size: IconButtonSize) => (
  <Icon name={GLYPHS[name]} size={GLYPH_PX[size]} />
);

const ARGS: Partial<IconButtonArgs> = {
  label: 'Close panel', glyph: 'close', variant: 'ghost', tone: 'none', size: 'sm', active: false, loading: false, disabled: false,
};

const ARG_TYPES: PlaygroundArgTypes<IconButtonArgs> = {
    label: { group: 'Content', control: 'text', description: 'Accessible name, read by screen readers.' },
    glyph: { group: 'Content', control: 'select', options: Object.keys(GLYPHS) as GlyphName[], optionView: (name) => <Icon name={GLYPHS[name]} size={16} /> },
    variant: { group: 'Appearance', control: 'select', options: [...VARIANTS] },
    tone: { group: 'Appearance', control: 'select', options: ['none', 'danger', 'info', 'accent'], description: 'Draws a ghost button in a status colour with a soft glow; accent is the brand colour.' },
    size: { group: 'Appearance', control: 'select', options: ['2xs', 'xs', 'sm', 'md'] },
    active: { group: 'State', control: 'boolean' },
    loading: { group: 'State', control: 'boolean', description: 'Shows the spinner in place of the icon and disables the button.' },
    disabled: { group: 'State', control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Actions/IconButton',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<IconButtonArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <IconButton
      label={args.label}
      variant={args.variant}
      tone={args.tone === 'none' ? undefined : args.tone}
      size={args.size}
      active={args.active}
      loading={args.loading}
      disabled={args.disabled}
    >
      {glyph(args.glyph, args.size)}
    </IconButton>
  ),
} satisfies PlaygroundStory<IconButtonArgs>;

const SIZES = ['md', 'sm', 'xs', '2xs'] as const;

const STATE_VARIANTS: readonly IconButtonVariant[] = ['primary', 'tertiary', 'danger', 'ghost'];

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Demonstrator
      rows={axis(VARIANTS)}
      columns={axis(SIZES)}
      cell={(variant, size) => (
        <IconButton label={`${LABELS.plus}, ${variant}`} title={variant} variant={variant} size={size}>
          {glyph('plus', size)}
        </IconButton>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<IconButtonArgs>;

const TONES: readonly IconButtonTone[] = ['danger', 'info', 'accent'];

const Tones = {
  name: 'Danger, info and accent tones',
  render: () => (
    <Demonstrator
      rows={axis(TONES)}
      columns={axis(SIZES)}
      cell={(tone, size) => (
        <IconButton label={`${LABELS.bug}, ${tone} ${size}`} tone={tone} size={size}>{glyph('bug', size)}</IconButton>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<IconButtonArgs>;

const Loading = {
  name: 'Loading',
  render: () => (
    <Demonstrator
      rows={axis(STATE_VARIANTS)}
      columns={axis(SIZES)}
      cell={(variant, size) => (
        <IconButton label={`${LABELS.plus}, ${variant}`} variant={variant} size={size} loading>{glyph('plus', size)}</IconButton>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<IconButtonArgs>;

const PRESS_STATES = ['off', 'mixed'] as const;

const Mixed = {
  name: 'Mixed: some picked items are on, and a press turns it on',
  render: () => (
    <Demonstrator
      rows={axis(STATE_VARIANTS)}
      columns={axis(PRESS_STATES)}
      cell={(variant, state) => <IconButtonMixedPin key={`${variant}-${state}`} variant={variant} mixed={state === 'mixed'} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<IconButtonArgs>;

const renderState = (props: StateProps, pseudo?: StateEntry['pseudo']) => (
  <Flex gap="sm" align="center">
    {STATE_VARIANTS.map((variant) => (
      <IconButton key={variant} label={`${LABELS.pin}, ${variant}`} variant={variant} size="md" {...forceAttributes(pseudo)} {...props}>
        {glyph('pin', 'md')}
      </IconButton>
    ))}
    <IconButton label={`${LABELS.bug}, danger tone`} tone="danger" size="md" {...forceAttributes(pseudo)} {...props}>
      {glyph('bug', 'md')}
    </IconButton>
  </Flex>
);

const WithTooltip = {
  name: 'Tooltip on hover and focus',
  render: () => (
    <Flex gap="md" align="center">
      <IconButton label={LABELS.pin} tooltip="Pin tracker" size="md">{glyph('pin', 'md')}</IconButton>
      <IconButton label={LABELS.mute} tooltip="Mute audio" tooltipPlacement="bottom" size="md">{glyph('mute', 'md')}</IconButton>
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<IconButtonArgs>;

const HeadRow = {
  name: 'Card head row at 16 px',
  render: () => <CardHeadRow />,
} satisfies StoryLiteStoryDefinition<IconButtonArgs>;

const Toolbar = {
  name: 'Toggle toolbar',
  render: () => <IconButtonToolbar />,
} satisfies StoryLiteStoryDefinition<IconButtonArgs>;

const Overview = overviewStory({
  component: 'IconButton',
  description: 'A square button that shows only an icon, for toolbars, panel headers and row actions where a word would not fit.',
  points: [
    '**`label` is required:** it becomes the name screen readers announce.',
    'It takes the variants of [Button]; sizes `md` 39, `sm` 28, `xs` 20 and `2xs` 16 px. Back and close are `md`.',
    '`xs` suits dense rows, `2xs` card head rows; an unsized icon draws 16 px in `md`, 12 below, 10 in `2xs`.',
    '`tooltip` shows a [Tooltip] on hover and keyboard focus; `tooltipPlacement` picks the side.',
    '`active` marks a toggle as on, `mixed` hatches it when picked items differ; `loading` swaps in a [Spinner].',
    '`tone` tints a ghost button (`danger`, `info`, `accent`); `hint` feeds a one-line description to a [HintLine].',
  ],
  instead: '[Button] when a word fits.',
  playground: Playground,
  variants: [AllVariants, Tones, Mixed, Loading, WithTooltip, HeadRow],
  states: markedStates(BUTTON_STATES, renderState),
});

export default meta;
export { AllVariants, HeadRow, Loading, Mixed, Overview, Playground, Tones, Toolbar, WithTooltip };
