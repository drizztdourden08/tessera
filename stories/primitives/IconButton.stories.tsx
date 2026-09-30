/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Flex, Icon, IconButton, Text } from '../../src/primitives';
import type { IconName } from '../../src/primitives';
import type { IconButtonTone, IconButtonVariant } from '../../src/primitives/IconButton/IconButton.type';
import { overviewStory } from '../_template/overview-story';
import { forceAttributes } from '../_template/states/force-attributes';
import type { StateEntry, StateProps } from '../_template/states/states.type';
import { BUTTON_STATES } from './_samples/button-states';
import { markedStates } from './_samples/marked-states';
import { axis, VariantGrid } from '../_template/VariantGrid';

type GlyphName = 'close' | 'plus' | 'pin' | 'mute' | 'overflow' | 'bug';

type ToneChoice = 'none' | IconButtonTone;

type IconButtonArgs = {
  label: string;
  glyph: GlyphName;
  variant: IconButtonVariant;
  tone: ToneChoice;
  size: 'sm' | 'md';
  active: boolean;
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

const glyph = (name: GlyphName, size: 'sm' | 'md') => (
  <Icon name={GLYPHS[name]} size={size === 'sm' ? 12 : 16} />
);

const ARGS: Partial<IconButtonArgs> = {
  label: 'Close panel', glyph: 'close', variant: 'ghost', tone: 'none', size: 'sm', active: false, disabled: false,
};

const ARG_TYPES: StoryLiteArgTypes<IconButtonArgs> = {
    label: { control: 'text', description: 'Accessible name, read by screen readers.' },
    glyph: { control: 'select', options: Object.keys(GLYPHS) as GlyphName[] },
    variant: { control: 'select', options: [...VARIANTS] },
    tone: { control: 'select', options: ['none', 'danger'], description: 'Draws a ghost button in a status colour with a soft glow.' },
    size: { control: 'select', options: ['sm', 'md'] },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
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
      disabled={args.disabled}
    >
      {glyph(args.glyph, args.size)}
    </IconButton>
  ),
} satisfies StoryLiteStoryDefinition<IconButtonArgs>;

const SIZES = ['md', 'sm'] as const;

const STATE_VARIANTS: readonly IconButtonVariant[] = ['primary', 'tertiary', 'danger', 'ghost'];

const AllVariants = {
  name: 'All variants',
  render: () => (
    <VariantGrid
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
  description: 'A square button that shows only an icon, for toolbars, panel headers and row actions where a word would not fit. Its label is required and becomes the accessible name. The same coloured variants as Button plus ghost, and two sizes. It shares the Button focus ring and pressed fill, and active marks a toggle as on and announces it as pressed. tone="danger" draws a ghost button in red with a soft red glow, for a report a bug button or a remove button, and fills red inside a danger ring on hover.',
  playground: Playground,
  variants: [AllVariants, DangerTone],
  states: markedStates(BUTTON_STATES, renderState),
});

export default meta;
export { AllVariants, DangerTone, Overview, Playground, Toolbar };
