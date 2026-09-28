/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { SPECIMEN, WEIGHTS } from './type-lists';
import { TypeTable } from './TypeTable';
import { WeightRamp } from './WeightRamp';
import './variable-type.css';

type WeightArgs = {
  weight: number;
  italic: boolean;
  text: string;
};

const ARG_TYPES: StoryLiteArgTypes<WeightArgs> = {
  weight: { control: 'number', description: 'Any whole number from 100 to 900. Inter draws every one.' },
  italic: { control: 'boolean' },
  text: { control: 'text' },
};

const meta = {
  title: 'Typography/Weights',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<WeightArgs>;

const Tokens = {
  name: 'Tokens',
  render: () => (
    <Box className="story-column type-section">
      <Text className="story-label">Nine named weights. Inter is variable, so these are stops on a continuous axis, not separate files.</Text>
      <TypeTable entries={WEIGHTS} property="fontWeight" specimen={SPECIMEN} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Continuous = {
  name: 'Continuous',
  render: () => (
    <Box className="story-column type-section">
      <Text className="story-label">Every 50 units from 100 to 900, one per line. Any value in between works too, which is what Emphasis animates through.</Text>
      <WeightRamp from={100} to={900} step={50} word="Hookshot" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Playground = {
  name: 'Playground',
  args: { weight: 537, italic: false, text: 'Wren sent the Hookshot to Tavi' },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="story-column type-section">
      <Text className="variable-type__display" weight={args.weight} italic={args.italic}>{args.text}</Text>
      <Text className="variable-type__caption">{`font-weight: ${args.weight}`}</Text>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<WeightArgs>;

export default meta;
export { Continuous, Playground, Tokens };
