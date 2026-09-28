/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { Box, Text } from '../../src/primitives';
import { ScaleRow } from './scale-row';
import type { Specimen } from './scale-row';
import {
  DURATIONS, EASINGS, SHADOWS, TRANSITIONS, Z_INDEX,
} from './token-lists';
import './Scales.stories.css';

type Section = { title: string; file: string; specimen: Specimen; tokens: readonly string[] };

const SECTIONS: readonly Section[] = [
  { title: 'Shadows', file: 'canonical.css, shadow.css', specimen: 'shadow', tokens: SHADOWS },
  { title: 'Z-index', file: 'z-index.css', specimen: 'z', tokens: Z_INDEX },
  { title: 'Durations', file: 'motion.css', specimen: 'duration', tokens: DURATIONS },
  { title: 'Easings', file: 'motion.css', specimen: 'easing', tokens: EASINGS },
  { title: 'Transitions', file: 'motion.css', specimen: 'transition', tokens: TRANSITIONS },
];

type ScalesArgs = {
  section: string;
};

const SECTION_NAMES = ['All', ...SECTIONS.map((section) => section.title)];

const ScaleSections = ({ section }: ScalesArgs) => (
  <Box className="story-column scale-page">
    <Text className="story-label">Values are read from the rendered page. Point at a motion track to play it.</Text>
    {SECTIONS.filter((entry) => section === 'All' || entry.title === section).map((entry) => (
      <Box key={entry.title} className="scale-section">
        <Text variant="subtitle">{entry.title}</Text>
        <Text className="story-label">{`src/tokens/${entry.file}`}</Text>
        {entry.tokens.map((token) => <ScaleRow key={token} token={token} specimen={entry.specimen} />)}
      </Box>
    ))}
  </Box>
);

const ARGS: Partial<ScalesArgs> = { section: 'All' };

const ARG_TYPES: StoryLiteArgTypes<ScalesArgs> = {
    section: { control: 'select', options: SECTION_NAMES },
  };

const meta = {
  title: 'Tokens/Scales',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ScalesArgs>;

const AllScales = {
  name: 'Scales',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ScaleSections {...args} />,
} satisfies StoryLiteStoryDefinition<ScalesArgs>;

const Overview = overviewStory({
  component: 'Scales',
  description: 'The remaining scales: shadows, z-index layers, durations, easings and transitions. Values are read from the rendered page, and pointing at a motion track plays it. Pick one section to focus on it.',
  playground: AllScales,
  code: false,
  variants: [],
});

export default meta;
export { AllScales, Overview };
