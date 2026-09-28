/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text, TYPE_FEATURE_GROUPS } from '../../src/primitives';
import type { TypeFeature } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { FeatureTable } from './FeatureTable';
import './variable-type.css';

const PLAYABLE = [
  'tabularNumbers', 'slashedZero', 'fractions', 'caseForms', 'disambiguation', 'openDigits',
  'roundQuotes', 'singleStoryA', 'alternateOne', 'compactT', 'circled', 'superscript',
] as const satisfies readonly TypeFeature[];

type FeatureArgs = { text: string } & Record<(typeof PLAYABLE)[number], boolean>;

const ARG_TYPES: StoryLiteArgTypes<FeatureArgs> = {
  text: { control: 'text' },
  ...Object.fromEntries(PLAYABLE.map((feature) => [feature, { control: 'boolean' }])),
};

const INITIAL: FeatureArgs = {
  text: 'Room IL1O0: 1/2 of 216 checks, 10:40 left (HYRULE-7) "go".',
  ...Object.fromEntries(PLAYABLE.map((feature) => [feature, false])) as Record<(typeof PLAYABLE)[number], boolean>,
};

const meta = {
  title: 'Typography/OpenType features',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FeatureArgs>;

const Gallery = {
  name: 'Gallery',
  render: () => (
    <Box className="story-column type-section">
      <Text className="story-label">
        Every feature Inter ships, named as the font names it. Turn one on with the features prop on Text: {'<Text features={[\'slashedZero\']}>'}.
      </Text>
      {TYPE_FEATURE_GROUPS.map((group) => <FeatureTable key={group} group={group} />)}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Playground = {
  name: 'Playground',
  args: INITIAL,
  argTypes: ARG_TYPES,
  render: (args) => {
    const features = PLAYABLE.filter((feature) => args[feature]);
    return <Text className="variable-type__size-32" features={features}>{args.text}</Text>;
  },
} satisfies StoryLiteStoryDefinition<FeatureArgs>;

const Overview = overviewStory({
  component: 'OpenType features',
  importName: 'Text',
  description: 'Inter ships 36 OpenType features: tabular and slashed numbers, fractions, case forms, alternate letters, circled and boxed digits and more. Text turns them on by name through its features prop, and typesettingStyle builds the same style for any element.',
  playground: Playground,
  variants: [Gallery],
});

export default meta;
export { Gallery, Overview, Playground };
