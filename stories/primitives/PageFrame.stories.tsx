/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, PageFrame, Text, Title } from '../../src/primitives';
import type { PageFramePadding, PageFrameWidth } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './PageFrame.stories.css';

type PageFrameArgs = {
  width: PageFrameWidth | 'none';
  padding: PageFramePadding;
  paragraphs: number;
};

const ARGS: Partial<PageFrameArgs> = { width: 'md', padding: 'lg', paragraphs: 8 };

const ARG_TYPES: PlaygroundArgTypes<PageFrameArgs> = {
  width: { group: 'Layout', control: 'select', options: ['none', 'sm', 'md', 'lg'], description: 'The column the content is centred in.' },
  padding: { group: 'Layout', control: 'select', options: ['md', 'lg'], description: 'md is 16 px, lg is the 24 px default.' },
  paragraphs: { group: 'Content', control: 'number', description: 'How many paragraphs fill the page.' },
};

const meta = {
  title: 'Primitives · Layout/PageFrame',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PageFrameArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="page-frame-story">
      <PageFrame fill padding={args.padding} width={args.width === 'none' ? undefined : args.width}>
        <Title>Account</Title>
        {Array.from({ length: args.paragraphs }, (_, index) => (
          <Text key={index} as="p">The frame scrolls on its own while the window behind it stays still.</Text>
        ))}
      </PageFrame>
    </Box>
  ),
} satisfies PlaygroundStory<PageFrameArgs>;

const Overview = overviewStory({
  component: 'PageFrame',
  description: 'A full-height, padded page that scrolls inside its own frame, for a web app whose root stays locked.',
  points: [
    'The frame is the scroller: it is `100dvh` tall and the page behind it never moves.',
    '`fill` takes the height of the parent instead of the window.',
    '`padding="md"` sets 16 px of page padding in place of the 24 px default.',
    '`width` centres the content in a `sm`, `md` or `lg` column; leave it out for the full width.',
    'It is a [ScrollArea] with the page padding, so it takes the same props except `axis`.',
    'Use [PageRoot] instead when the whole document should scroll.',
  ],
  instead: '[PageRoot] to let the document scroll, or [ScrollArea] for a box inside a screen.',
  playground: Playground,
  variants: [Playground],
  code: `import { PageFrame, Title } from '@drizztdourden08/tessera';

<PageFrame width="md">
  <Title>Account</Title>
</PageFrame>`,
});

export default meta;
export { Overview, Playground };
