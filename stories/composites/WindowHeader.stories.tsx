/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { WindowHeader } from '../../src/composites';
import { Box, Button, Status, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type WindowHeaderArgs = {
  title: string;
  subtitle: string;
  withClose: boolean;
  withExtra: boolean;
};

const HEADER_EXTRA = (
  <Box className="story-row">
    <Status tone="success">8 online</Status>
    <Button size="sm" variant="secondary">Invite</Button>
  </Box>
);

const ignoreClose = () => undefined;

const HeaderDemo = (props: WindowHeaderArgs) => {
  const { title, subtitle, withClose, withExtra } = props;
  const [closed, setClosed] = useState(0);
  return (
    <Box className="story-column">
      <WindowHeader
        title={title}
        subtitle={subtitle || undefined}
        extra={withExtra ? HEADER_EXTRA : undefined}
        onClose={withClose ? () => setClosed(closed + 1) : undefined}
      />
      {withClose && <Text className="story-label">Close pressed {closed} times</Text>}
    </Box>
  );
};

const ARGS: Partial<WindowHeaderArgs> = { title: 'Sessions', subtitle: 'Profile: mira', withClose: true, withExtra: false };

const ARG_TYPES: StoryLiteArgTypes<WindowHeaderArgs> = {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    withClose: { control: 'boolean' },
    withExtra: { control: 'boolean' },
  };

const meta = {
  title: 'Composites · Navigation/WindowHeader',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<WindowHeaderArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <WindowHeader
      title={args.title}
      subtitle={args.subtitle || undefined}
      extra={args.withExtra ? HEADER_EXTRA : undefined}
      onClose={args.withClose ? ignoreClose : undefined}
    />
  ),
} satisfies StoryLiteStoryDefinition<WindowHeaderArgs>;

const TitleOnly = {
  name: 'Title only',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <HeaderDemo {...args} title="Game presets" subtitle="" withClose={false} withExtra={false} />,
} satisfies StoryLiteStoryDefinition<WindowHeaderArgs>;

const WithControls = {
  name: 'With controls',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <HeaderDemo {...args} title="Friday async" subtitle="eu-west-2" withExtra />,
} satisfies StoryLiteStoryDefinition<WindowHeaderArgs>;

const Overview = overviewStory({
  component: 'WindowHeader',
  description: 'The title bar shared by windows and dialogs. The title sits on the left in gold capitals, an optional subtitle follows it in plain case, and extra content such as a Status or a button fills the space before the close button. The close button shows only when onClose is set.',
  playground: Playground,
  variants: [TitleOnly, WithControls],
});

export default meta;
export { Overview, Playground, TitleOnly, WithControls };
