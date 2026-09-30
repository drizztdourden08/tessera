/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, ColorSwatch, Text } from '../../src/primitives';
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
  disabled: boolean;
};

const TUNIC_GREEN = '#38a048';

const TUNIC_ROW: readonly string[] = [
  '#000000', '#f8f8f8', '#f0d0a8', '#b86820', '#282828', TUNIC_GREEN, '#58d068', '#e84830',
  '#f89048', '#c02010', '#4870d8', '#88b0f8', '#d0a000', '#f8d840', '#906040', '#584028',
];

const EDITED_SLOTS = new Set([5, 6]);

const ARGS: Partial<ColorSwatchArgs> = { hex: TUNIC_GREEN, caption: '5', selected: false, edited: false, transparent: false, disabled: false };

const ARG_TYPES: StoryLiteArgTypes<ColorSwatchArgs> = {
    hex: { control: 'color' },
    caption: { control: 'text' },
    selected: { control: 'boolean' },
    edited: { control: 'boolean' },
    transparent: { control: 'boolean' },
    disabled: { control: 'boolean' },
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
      disabled={args.disabled}
      aria-label="Palette slot"
    />
  ),
} satisfies StoryLiteStoryDefinition<ColorSwatchArgs>;

const Fills = {
  name: 'Fills',
  render: () => (
    <Demonstrator
      columns={axis(['colour', 'transparent'])}
      cell={(_row, fill) => (fill === 'transparent'
        ? <ColorSwatch color={TUNIC_GREEN} caption="0" transparent aria-label="Palette slot 0" />
        : <ColorSwatch color={TUNIC_GREEN} caption="5" aria-label="Palette slot 5" />)}
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
  description: 'One colour drawn as a button, for picking a slot in a palette or a colour from a set. A small caption inside it, usually the palette index, labels the slot. Selected draws a ring, edited marks a value changed from its original, transparent swaps the fill for a checkerboard, and every button prop, onClick and disabled included, passes through.',
  playground: Playground,
  variants: [Fills],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      STATE.focus,
      STATE.selected,
      { name: 'Edited', props: { edited: true } },
      STATE.disabled,
    ],
  },
});

export default meta;
export { Fills, Overview, Palette, Playground };
