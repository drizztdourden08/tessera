/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { sizesStory } from '../_template/sizes-story';
import { Box, ColorSwatch, Text, type ControlSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type ColorSwatchArgs = {
  hex: string;
  caption: string;
  selected: boolean;
  edited: boolean;
  transparent: boolean;
  unused: boolean;
  mixed: boolean;
  marks: boolean;
  apartRing: boolean;
  fill: boolean;
  disabled: boolean;
  size: ControlSize;
};

const TUNIC_GREEN = '#38a048';

const TRANSLUCENT_GREEN = '#38a04880';

const TUNIC_ROW: readonly string[] = [
  '#000000', '#f8f8f8', '#f0d0a8', '#b86820', '#282828', TUNIC_GREEN, '#58d068', '#e84830',
  '#f89048', '#c02010', '#4870d8', '#88b0f8', '#d0a000', '#f8d840', '#906040', '#584028',
];

const CORNER_MARKS: readonly string[] = ['1', '2', '3', '4'];

const EDITED_SLOTS = new Set([5, 6]);

const ARGS: Partial<ColorSwatchArgs> = { hex: TUNIC_GREEN, caption: '5', selected: false, edited: false, transparent: false, unused: false, mixed: false, marks: false, apartRing: false, fill: false, disabled: false, size: 'md' };

const ARG_TYPES: PlaygroundArgTypes<ColorSwatchArgs> = {
    caption: { group: 'Content', control: 'text' },
    hex: { group: 'Value', control: 'color' },
    transparent: { group: 'Appearance', control: 'boolean' },
    marks: { group: 'Appearance', control: 'boolean', description: 'Four corner marks, numbered 1 to 4' },
    apartRing: { group: 'Appearance', control: 'boolean', description: 'Draw the focus ring outside the selected ring' },
    fill: { group: 'Appearance', control: 'boolean', description: 'Stretch to the width of the cell, keeping it square' },
    unused: { group: 'State', control: 'boolean' },
    mixed: { group: 'State', control: 'boolean' },
    selected: { group: 'State', control: 'boolean' },
    edited: { group: 'State', control: 'boolean' },
    disabled: { group: 'State', control: 'boolean' },
    size: SIZE_ARG,
  };

const meta = {
  title: 'Primitives · Inputs/ColorSwatch',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ColorSwatchArgs>;

const PaletteRow = () => {
  const [picked, setPicked] = useState(5);
  return (
    <Box className="story-column">
      <Box className="story-row">
        {TUNIC_ROW.map((hex, index) => (
          <ColorSwatch
            key={hex}
            size="sm"
            color={hex}
            caption={index}
            transparent={index === 0}
            edited={EDITED_SLOTS.has(index)}
            selected={index === picked}
            aria-label={`Palette slot ${index}`}
            onClick={() => setPicked(index)}
          />
        ))}
      </Box>
      <Text className="story-label">
        Slot {picked}: {picked === 0 ? 'transparent' : TUNIC_ROW[picked]}
      </Text>
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <ColorSwatch
      color={args.hex}
      caption={args.caption === '' ? undefined : args.caption}
      selected={args.selected}
      edited={args.edited}
      transparent={args.transparent}
      unused={args.unused}
      mixed={args.mixed}
      marks={args.marks ? CORNER_MARKS : undefined}
      focusRing={args.apartRing ? 'apart' : 'inset'}
      fill={args.fill}
      disabled={args.disabled}
      size={args.size}
      aria-label="Palette slot"
    />
  ),
} satisfies PlaygroundStory<ColorSwatchArgs>;

const Fills = {
  name: 'Fills',
  render: () => (
    <Demonstrator
      columns={axis(['colour', 'translucent', 'transparent'])}
      cell={(_row, fill) => {
        if (fill === 'transparent') return <ColorSwatch color={TUNIC_GREEN} caption="0" transparent aria-label="Palette slot 0" />;
        if (fill === 'translucent') return <ColorSwatch color={TRANSLUCENT_GREEN} caption="5" aria-label="Palette slot 5, half clear" />;
        return <ColorSwatch color={TUNIC_GREEN} caption="5" aria-label="Palette slot 5" />;
      }}
    />
  ),
} satisfies StoryLiteStoryDefinition<ColorSwatchArgs>;

const Sizes = sizesStory<ColorSwatchArgs>((size) => <ColorSwatch size={size} color={TUNIC_GREEN} caption="5" aria-label={`Palette slot 5, ${size}`} />);

const Marks = {
  name: 'Marks and states',
  render: () => (
    <Demonstrator
      columns={axis(['plain', 'one mark', 'four marks', 'unused', 'mixed', 'apart ring'])}
      cell={(_row, kind) => {
        const label = `Palette slot 5, ${kind}`;
        if (kind === 'one mark') return <ColorSwatch color={TUNIC_GREEN} marks={['2']} aria-label={label} />;
        if (kind === 'four marks') return <ColorSwatch color={TUNIC_GREEN} marks={CORNER_MARKS} aria-label={label} />;
        if (kind === 'unused') return <ColorSwatch color={TUNIC_GREEN} caption="5" unused aria-label={label} />;
        if (kind === 'mixed') return <ColorSwatch color={TUNIC_GREEN} mixed aria-label={label} />;
        if (kind === 'apart ring') return <ColorSwatch color={TUNIC_GREEN} caption="5" selected focusRing="apart" aria-label={label} />;
        return <ColorSwatch color={TUNIC_GREEN} caption="5" aria-label={label} />;
      }}
    />
  ),
} satisfies StoryLiteStoryDefinition<ColorSwatchArgs>;

const NAMED_MARKS = { 'top-start': '1', 'bottom-start': '2', 'top-end': '3', 'bottom-end': '4' } as const;

const NamedCorners = {
  name: 'Marks by corner name',
  render: () => (
    <Demonstrator
      columns={axis(['sm', 'md', 'wide'])}
      cell={(_row, kind) => (
        kind === 'wide'
          ? <Box className="story-swatch-grid story-swatch-grid--wide"><ColorSwatch color={TUNIC_GREEN} fill marks={NAMED_MARKS} aria-label="Palette slot 5, fill" /></Box>
          : <ColorSwatch color={TUNIC_GREEN} size={kind === 'sm' ? 'sm' : 'md'} marks={NAMED_MARKS} aria-label={`Palette slot 5, ${kind}`} />
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<ColorSwatchArgs>;

const FILL_CELLS: readonly string[] = TUNIC_ROW.slice(0, 8);

const Stretch = {
  name: 'Fill the cell',
  render: () => (
    <Demonstrator
      columns={axis(['Fixed size', 'fill'])}
      valign="start"
      cell={(_row, mode) => (
        <Box className={mode === 'fill' ? 'story-swatch-grid story-swatch-grid--wide' : 'story-swatch-grid'}>
          {FILL_CELLS.map((hex, index) => (
            <ColorSwatch key={hex} color={hex} fill={mode === 'fill'} caption={index} aria-label={`Palette slot ${index}, ${mode}`} />
          ))}
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<ColorSwatchArgs>;

const renderState = (props: StateProps) => <ColorSwatch color={TUNIC_GREEN} caption="5" aria-label="Palette slot 5" {...props} />;

const Palette = {
  name: 'Palette row',
  render: () => <PaletteRow />,
} satisfies StoryLiteStoryDefinition<ColorSwatchArgs>;

const Overview = overviewStory({
  component: 'ColorSwatch',
  description: 'One colour drawn as a button, for picking a slot in a palette or a colour from a set.',
  points: [
    '`caption` writes a small label inside it, usually the palette index.',
    '`selected` draws a ring, and `edited` marks a value changed from its original.',
    '`transparent` swaps the fill for a checkerboard; a `color` with alpha below 1 shows one behind it.',
    '`marks` puts up to four marks in the corners, by position or by corner name; they grow with the swatch.',
    '`unused` dashes it, `mixed` draws a dash, and `focusRing="apart"` draws the focus ring outside `selected`.',
    '`md` and `sm` match the control heights, `xs` is 16 px for a menu icon; `fill` stretches it to its cell.',
  ],
  playground: Playground,
  variants: [Fills, Marks, NamedCorners, Sizes, Stretch],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      STATE.focus,
      STATE.selected,
      { name: 'Edited', props: { edited: true } },
      { name: 'Unused', props: { unused: true } },
      { name: 'Mixed', props: { mixed: true } },
      STATE.disabled,
    ],
  },
});

export default meta;
export { Fills, Marks, NamedCorners, Overview, Palette, Playground, Sizes, Stretch };
