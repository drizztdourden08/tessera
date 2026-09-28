/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { ColorPicker } from '../../src/composites/ColorPicker';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { SWATCH_GROUPS } from './_samples/data-colors';

type ColorPickerArgs = {
  title: string;
  start: string;
  disableAlpha: boolean;
  showOriginal: boolean;
  showSwatches: boolean;
};

const PickerDemo = (args: ColorPickerArgs) => {
  const { title, start, disableAlpha, showOriginal, showSwatches } = args;
  const [value, setValue] = useState(start);
  const [alpha, setAlpha] = useState(1);
  return (
    <Box className="story-row">
      <ColorPicker
        title={title}
        value={value}
        onChange={setValue}
        alpha={alpha}
        onAlphaChange={setAlpha}
        disableAlpha={disableAlpha}
        original={showOriginal ? start : undefined}
        onReset={showOriginal ? () => { setValue(start); setAlpha(1); } : undefined}
        swatchGroups={showSwatches ? SWATCH_GROUPS : undefined}
      />
      <Text className="story-label">{disableAlpha ? value : `${value} at ${Math.round(alpha * 100)}%`}</Text>
    </Box>
  );
};

const ARGS: Partial<ColorPickerArgs> = { title: 'Team Harbor', start: '#3f8fd2', disableAlpha: false, showOriginal: true, showSwatches: true };

const ARG_TYPES: StoryLiteArgTypes<ColorPickerArgs> = {
    title: { control: 'text' },
    start: { control: 'color', description: 'The colour the slot started at' },
    disableAlpha: { control: 'boolean' },
    showOriginal: { control: 'boolean', description: 'Show the starting colour as a reference and reset target' },
    showSwatches: { control: 'boolean' },
  };

const meta = {
  title: 'Composites · Content/ColorPicker',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ColorPickerArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PickerDemo key={args.start} {...args} />,
} satisfies StoryLiteStoryDefinition<ColorPickerArgs>;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Box className="story-row">
      <PickerDemo title="Alpha, original and swatches" start="#3f8fd2" disableAlpha={false} showOriginal showSwatches />
      <PickerDemo title="No alpha" start="#d2663f" disableAlpha showOriginal={false} showSwatches />
      <PickerDemo title="Bare" start="#5fb34a" disableAlpha showOriginal={false} showSwatches={false} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ColorPickerArgs>;

const CODE = `// Left out of the package barrel, so react-color loads only where a picker is used.
import { ColorPicker } from '@drizztdourden08/tessera/color-picker';

const [color, setColor] = useState('#3f8fd2');
const [alpha, setAlpha] = useState(1);

<ColorPicker
  title="Team Harbor"
  value={color}
  onChange={setColor}
  alpha={alpha}
  onAlphaChange={setAlpha}
  original="#3f8fd2"
  onReset={() => setColor('#3f8fd2')}
/>`;

const Overview = overviewStory({
  component: 'ColorPicker',
  description: 'A colour editor: a saturation, hue and alpha wheel, hex and RGBA fields, and quick-assign swatches grouped by where each colour comes from. Use it inline wherever one colour slot is edited; for a picker that floats beside a swatch, use ColorPickerPopover. It can hide the alpha channel, show the starting colour with a Reset button, and show the stored hardware word and whether the colour was snapped to it.',
  playground: Playground,
  variants: [AllVariants],
  code: CODE,
});

export default meta;
export { AllVariants, Overview, Playground };
