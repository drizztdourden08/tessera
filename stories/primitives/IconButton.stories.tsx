/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Flex, Icon, IconButton, Text } from '../../src/primitives';
import type { IconName } from '../../src/primitives';
import type { IconButtonSize, IconButtonTone, IconButtonVariant } from '../../src/primitives/IconButton/IconButton.type';
import { overviewStory } from '../_template/overview-story';
import { forceAttributes } from '../_template/states/force-attributes';
import type { StateEntry, StateProps } from '../_template/states/states.type';
import { BUTTON_STATES } from './_samples/button-states';
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

const glyph = (name: GlyphName, size: IconButtonSize) => (
  <Icon name={GLYPHS[name]} size={size === 'md' ? 16 : 12} />
);

const ARGS: Partial<IconButtonArgs> = {
  label: 'Close panel', glyph: 'close', variant: 'ghost', tone: 'none', size: 'sm', active: false, loading: false, disabled: false,
};

const ARG_TYPES: PlaygroundArgTypes<IconButtonArgs> = {
    label: { group: 'Content', control: 'text', description: 'Accessible name, read by screen readers.' },
    glyph: { group: 'Content', control: 'select', options: Object.keys(GLYPHS) as GlyphName[], optionView: (name) => <Icon name={GLYPHS[name]} size={16} /> },
    variant: { group: 'Appearance', control: 'select', options: [...VARIANTS] },
    tone: { group: 'Appearance', control: 'select', options: ['none', 'danger'], description: 'Draws a ghost button in a status colour with a soft glow.' },
    size: { group: 'Appearance', control: 'select', options: ['xs', 'sm', 'md'] },
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

const SIZES = ['md', 'sm', 'xs'] as const;

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

const DangerTone = {
  name: 'Danger tone',
  render: () => (
    <Flex gap="sm" align="center">
      {SIZES.map((size) => (
        <IconButton key={size} label={`${LABELS.bug}, ${size}`} tone="danger" size={size}>{glyph('bug', size)}</IconButton>
      ))}
    </Flex>
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

const ToolbarDemo = () => {
  const [pinned, setPinned] = useState(true);
  const [muted, setMuted] = useState(false);

  return (
    <Box className="story-column">
      <Flex gap="xs" align="center">
        <Text variant="title">Item tracker</Text>
        <IconButton label={LABELS.pin} active={pinned} onClick={() => setPinned((value) => !value)}>
          {glyph('pin', 'sm')}
        </IconButton>
        <IconButton label={LABELS.mute} active={muted} onClick={() => setMuted((value) => !value)}>
          {glyph('mute', 'sm')}
        </IconButton>
        <IconButton label={LABELS.overflow}>{glyph('overflow', 'sm')}</IconButton>
        <IconButton label={LABELS.close}>{glyph('close', 'sm')}</IconButton>
      </Flex>
      <Text variant="caption">{`Pinned: ${pinned ? 'yes' : 'no'}. Audio: ${muted ? 'muted' : 'on'}.`}</Text>
    </Box>
  );
};

const Toolbar = {
  name: 'Toggle toolbar',
  render: () => <ToolbarDemo />,
} satisfies StoryLiteStoryDefinition<IconButtonArgs>;

const Overview = overviewStory({
  component: 'IconButton',
  description: 'A square button that shows only an icon, for toolbars, panel headers and row actions where a word would not fit.',
  points: [
    '**`label` is required:** it becomes the name screen readers announce.',
    'It takes the variants of [Button], and `md` and `sm` match its 39 and 28 px. Header back and close buttons are `md`.',
    '`xs` is 20 px, for dense rows and compact panels. An unsized icon draws at 16 px in `md`, 12 px below.',
    '`active` marks a toggle as on; `loading` swaps the icon for a [Spinner] and stops clicks.',
    '`tone="danger"` draws a ghost button in red, for a remove or a report a bug button.',
    '`hint` reports a one-line description to the [HintScope] around it, for a [HintLine] to show.',
  ],
  instead: '[Button] when a word fits.',
  playground: Playground,
  variants: [AllVariants, DangerTone, Loading],
  states: markedStates(BUTTON_STATES, renderState),
});

export default meta;
export { AllVariants, DangerTone, Loading, Overview, Playground, Toolbar };
