/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { AsideLayout, Box, Text } from '../../src/primitives';
import type { AsideSide } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './AsideLayout.stories.css';

type AsideLayoutArgs = { side: AsideSide };

const meta = {
  title: 'Primitives · Layout/AsideLayout',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<AsideLayoutArgs>;

const Reporting = ({ side, size }: { side: AsideSide; size: 'wide' | 'narrow' }) => {
  const [shown, setShown] = useState(false);
  return (
    <Box className={`aside-layout-demo aside-layout-demo--${size}`}>
      <AsideLayout
        side={side}
        asideLabel="Facts"
        onAsideChange={setShown}
        main={<Text>{shown ? 'The aside shows: true' : 'The aside shows: false'}</Text>}
        aside={<Text>Owner, state and dates</Text>}
      />
    </Box>
  );
};

const EndSide = {
  name: 'Aside at the end',
  render: () => <Reporting side="end" size="wide" />,
} satisfies StoryLiteStoryDefinition<AsideLayoutArgs>;

const StartSide = {
  name: 'Aside at the start',
  render: () => <Reporting side="start" size="wide" />,
} satisfies StoryLiteStoryDefinition<AsideLayoutArgs>;

const NarrowContainer = {
  name: 'Narrow container hides the aside',
  render: () => <Reporting side="end" size="narrow" />,
} satisfies StoryLiteStoryDefinition<AsideLayoutArgs>;

const Overview = overviewStory({
  component: 'AsideLayout',
  description: 'Puts a side rail beside the main content while its own container is wide enough.',
  points: [
    '`main` and `aside` are plain content; main takes the rest of the width.',
    '`asideWidth` takes sm, md or lg, three widths from the scale.',
    '`breakpoint` is the container width in px, not the window width.',
    'Below the breakpoint the aside is not drawn at all.',
    '`onAsideChange` reports whether the aside shows.',
  ],
  instead: '[Grid] for equal columns, or [Flex] for a plain row.',
  variants: [EndSide, StartSide, NarrowContainer],
});

export default meta;
export { EndSide, NarrowContainer, Overview, StartSide };
