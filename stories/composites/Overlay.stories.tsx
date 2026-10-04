/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Overlay } from '../../src/composites';
import { Box, Button, Spinner, StatRow, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './Overlay.stories.css';

type OverlayArgs = {
  message: string;
  withSpinner: boolean;
  startVisible: boolean;
};

const SessionPanel = () => (
  <Box className="overlay-story__content">
    <Text variant="title">Friday async</Text>
    <StatRow label="Host" value="mira" />
    <StatRow label="Server" value="eu-west-2" mono />
    <StatRow label="Players" value="8 connected" />
    <StatRow label="Items sent" value="214" />
  </Box>
);

const OverlayDemo = (props: OverlayArgs) => {
  const { message, withSpinner, startVisible } = props;
  const [visible, setVisible] = useState(startVisible);
  return (
    <Box className="story-column">
      <Box className="story-row">
        <Button variant="secondary" onClick={() => setVisible(true)}>Show overlay</Button>
      </Box>
      <Box className="story-frame">
        <SessionPanel />
        <Overlay visible={visible}>
          <Box className="overlay-story__card">
            {withSpinner && <Spinner />}
            <Text>{message}</Text>
            <Button variant="tertiary" onClick={() => setVisible(false)}>Dismiss</Button>
          </Box>
        </Overlay>
      </Box>
    </Box>
  );
};

const ARGS: Partial<OverlayArgs> = { message: 'Reconnecting to eu-west-2...', withSpinner: true, startVisible: false };

const ARG_TYPES: PlaygroundArgTypes<OverlayArgs> = {
    message: { group: 'Content', control: 'text' },
    withSpinner: { group: 'Content', control: 'boolean' },
    startVisible: { group: 'State', control: 'boolean' },
  };

const meta = {
  title: 'Composites · Overlays/Overlay',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<OverlayArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <OverlayDemo {...args} />,
} satisfies PlaygroundStory<OverlayArgs>;

const Paused = {
  name: 'Session paused',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <OverlayDemo {...args} withSpinner={false} startVisible message="The host paused the session. Items resume when play does." />
  ),
} satisfies PlaygroundStory<OverlayArgs>;

const CODE = `import { Box, Overlay, Spinner, Text } from '@drizztdourden08/tessera';

<Box className="session-panel">
  <SessionPanel />
  <Overlay visible={reconnecting}>
    <Spinner />
    <Text>Reconnecting to eu-west-2...</Text>
  </Overlay>
</Box>`;

const Overview = overviewStory({
  component: 'Overlay',
  description: 'A dimmed glass layer over a panel with its content centred, to block the panel while something runs or waits.',
  points: [
    'Use it for a reconnect, a paused session or a load that holds the whole panel.',
    '`visible` shows it with a fade; while it is false the layer draws nothing.',
    '**The parent needs a position of its own,** such as `position: relative`, for the layer to cover it.',
  ],
  instead: '[DisabledOverlay] for an area that a setting turns off.',
  playground: Playground,
  variants: [Paused],
  code: CODE,
});

export default meta;
export { Overview, Paused, Playground };
