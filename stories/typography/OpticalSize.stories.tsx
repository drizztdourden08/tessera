/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import type { OpticalSize } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './variable-type.css';

type OpticalArgs = {
  opticalSize: 'auto' | 'text' | 'display';
  weight: number;
  italic: boolean;
  text: string;
};

const ARG_TYPES: StoryLiteArgTypes<OpticalArgs> = {
  opticalSize: { control: 'select', options: ['auto', 'text', 'display'] },
  weight: { control: 'number', description: 'Any whole number from 100 to 900.' },
  italic: { control: 'boolean' },
  text: { control: 'text' },
};

const SIZES = [14, 20, 32, 48, 64] as const;
const OPTICAL: readonly { label: string; value: OpticalSize }[] = [
  { label: 'Auto (follows size)', value: 'auto' },
  { label: 'Text (opsz 14)', value: 'text' },
  { label: 'Display (opsz 32)', value: 'display' },
];
const ITALIC_WEIGHTS = [300, 400, 600, 800] as const;
const WORD = 'Hookshot 1920';

const meta = {
  title: 'Typography/Optical size and italic',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<OpticalArgs>;

const OpticalSizes = {
  name: 'Optical size',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">
        Inter's second axis. Small text gets looser spacing and sturdier details, display text gets tighter and finer. With auto, the browser picks it from the font size.
      </Text>
      <Box className="variable-type__grid">
        <Text className="variable-type__head">Size</Text>
        {OPTICAL.map((column) => <Text key={column.label} className="variable-type__head">{column.label}</Text>)}
        {SIZES.map((size) => (
          <Box key={size} className="variable-type__row">
            <Text className="variable-type__label">{`${size}px`}</Text>
            {OPTICAL.map((column) => (
              <Text key={column.label} className={`variable-type__size-${size}`} opticalSize={column.value}>{WORD}</Text>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Italic = {
  name: 'Italic',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">A true italic, drawn as its own face with the same two axes, not a slanted roman.</Text>
      <Box className="variable-type__grid variable-type__grid--pair">
        <Text className="variable-type__head">Weight</Text>
        <Text className="variable-type__head">Roman</Text>
        <Text className="variable-type__head">Italic</Text>
        {ITALIC_WEIGHTS.map((weight) => (
          <Box key={weight} className="variable-type__row">
            <Text className="variable-type__label">{weight}</Text>
            <Text className="variable-type__size-32" weight={weight}>{WORD}</Text>
            <Text className="variable-type__size-32" weight={weight} italic>{WORD}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Playground = {
  name: 'Playground',
  args: { opticalSize: 'auto', weight: 400, italic: false, text: WORD },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Text className="variable-type__size-32" opticalSize={args.opticalSize} weight={args.weight} italic={args.italic}>{args.text}</Text>
  ),
} satisfies StoryLiteStoryDefinition<OpticalArgs>;

const Overview = overviewStory({
  component: 'Optical size and italic',
  importName: 'Text',
  description: 'Inter\'s second axis, optical size, runs from 14 to 32. Small text gets looser spacing and sturdier details, display text gets tighter and finer, and auto lets the browser follow the font size. The italic is a true italic with the same two axes. Text takes both through opticalSize and italic.',
  playground: Playground,
  variants: [OpticalSizes, Italic],
});

export default meta;
export { Italic, OpticalSizes, Overview, Playground };
