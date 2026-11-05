/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Button, ContentSwap, Flex, Paragraph, Stack } from '../../src/primitives';
import type { ContentSwapEffect, ContentSwapSequence } from '../../src/primitives';
import { axis } from '../_template/axis';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import './ContentSwap.stories.css';

type ContentSwapArgs = {
  effect: ContentSwapEffect;
  sequence: ContentSwapSequence;
};

const TABS: readonly (readonly [string, string])[] = [
  ['Players', 'Six players joined this session. Two are away.'],
  ['Map', 'Seed 7f3a9c21, large, with rivers on.'],
  ['Log', 'The server restarted twice. No errors since.'],
];

const ARGS: Partial<ContentSwapArgs> = { effect: 'fade', sequence: 'overlap' };

const ARG_TYPES: PlaygroundArgTypes<ContentSwapArgs> = {
  effect: { group: 'Appearance', control: 'select', options: ['fade', 'slide', 'scale'] },
  sequence: { group: 'Appearance', control: 'select', options: ['overlap', 'out-in'], description: 'overlap crossfades; out-in removes the old content before the new shows.' },
};

const meta = {
  title: 'Primitives · Layout/ContentSwap',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ContentSwapArgs>;

const TabSwap = ({ effect, sequence }: Partial<ContentSwapArgs>) => {
  const [tab, setTab] = useState(0);
  return (
    <Stack className="content-swap-story__frame">
      <Flex gap="xs">
        {TABS.map(([name], index) => (
          <Button key={name} size="sm" variant={index === tab ? 'primary' : 'secondary'} onClick={() => setTab(index)}>{name}</Button>
        ))}
      </Flex>
      <ContentSwap swapKey={tab} effect={effect} sequence={sequence}>
        <Box className="content-swap-story__panel">
          <Paragraph tone="dim">{TABS[tab][1]}</Paragraph>
        </Box>
      </ContentSwap>
    </Stack>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TabSwap {...args} />,
} satisfies PlaygroundStory<ContentSwapArgs>;

const Sequences = {
  name: 'Overlap, and out then in',
  render: () => (
    <Demonstrator
      rows={axis(['overlap', 'out-in'] as const)}
      align="start"
      cell={(sequence) => <TabSwap sequence={sequence} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<ContentSwapArgs>;

const CODE = `import { ContentSwap } from '@drizztdourden08/tessera';

<ContentSwap swapKey={tab} effect="slide">
  <StepPanel tab={tab} />
</ContentSwap>

<ContentSwap swapKey={tab} sequence="out-in">
  <TabPanel tab={tab} />
</ContentSwap>`;

const Overview = overviewStory({
  component: 'ContentSwap',
  description: 'A box that moves from the old content to the new when its key changes, such as a tab panel.',
  points: [
    '`swapKey` says when the content is a different thing; the old content is a copy that takes no input.',
    '`effect` is fade, slide, scale or reflow; `direction` back slides to an earlier step.',
    '`sequence` overlap crossfades both; out-in fades the old out and drops it before the new shows.',
    'Under reduced motion the content swaps at once in both sequences.',
  ],
  instead: '[Disclosure] for content that only shows or hides in place.',
  playground: Playground,
  variants: [Sequences],
  code: CODE,
});

export default meta;
export { Overview, Playground, Sequences };
