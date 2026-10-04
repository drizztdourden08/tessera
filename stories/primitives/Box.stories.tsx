/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './Box.stories.css';

type BoxElement = 'div' | 'section' | 'article' | 'aside' | 'span';

type BoxArgs = {
  as: BoxElement;
  content: string;
  framed: boolean;
};

const ELEMENTS: readonly BoxElement[] = ['div', 'section', 'article', 'aside', 'span'];

const CHANGELOG = [
  { version: '2.4.0', notes: ['Save slots show a screenshot of the last room', 'Controller presets can be renamed'] },
  { version: '2.3.1', notes: ['Fixed audio drift after a long session', 'The seed field accepts pasted links'] },
];

const ARGS: Partial<BoxArgs> = { as: 'section', content: 'A plain structural element. Pick the tag with `as`.', framed: true };

const ARG_TYPES: PlaygroundArgTypes<BoxArgs> = {
    content: { group: 'Content', control: 'text' },
    framed: { group: 'Appearance', control: 'boolean' },
    as: { group: 'Behaviour', control: 'select', options: [...ELEMENTS] },
  };

const meta = {
  title: 'Primitives · Layout/Box',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<BoxArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box as={args.as} className={args.framed ? 'box-demo' : undefined}>
      {args.content}
    </Box>
  ),
} satisfies PlaygroundStory<BoxArgs>;

const SemanticElements = {
  name: 'Semantic elements',
  render: () => (
    <Box className="story-column">
      {CHANGELOG.map((release) => (
        <Box as="article" key={release.version} className="box-demo">
          <Text as="h3" variant="title">{`Version ${release.version}`}</Text>
          <Box as="ul" className="box-demo__list">
            {release.notes.map((note) => (
              <Box as="li" key={note}>{note}</Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<BoxArgs>;

const Disclosure = {
  name: 'Details and summary',
  render: () => (
    <Box className="story-column">
      <Box as="details" open className="box-demo">
        <Box as="summary" className="box-demo__summary">Advanced settings</Box>
        <Text variant="subtitle">Frame skip, audio latency and the save-state folder live here.</Text>
      </Box>
      <Box as="details" className="box-demo">
        <Box as="summary" className="box-demo__summary">Diagnostics</Box>
        <Text variant="subtitle">Collapsed by default. Open it to read the log path.</Text>
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<BoxArgs>;

const Overview = overviewStory({
  component: 'Box',
  description: 'The plain element to use wherever a bare div would go outside the primitives.',
  points: [
    '`as` picks the tag, so the same component draws a section, an article, a list or a details block.',
    'It adds no styles of its own.',
    'Every other prop and a ref pass through to the element.',
  ],
  instead: '[Flex] or [Stack] when the children need laying out.',
  playground: Playground,
  variants: [SemanticElements, Disclosure],
});

export default meta;
export { Disclosure, Overview, Playground, SemanticElements };
