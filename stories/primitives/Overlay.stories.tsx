/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, Overlay, Spinner, StatRow, Text } from '../../src/primitives';
import type { OverlayTone } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import './Overlay.stories.css';

type OverlayArgs = {
  message: string;
  withSpinner: boolean;
  startVisible: boolean;
  tone: OverlayTone;
  blur: boolean;
  keepMounted: boolean;
};

const TONES: readonly OverlayTone[] = ['glass', 'scrim', 'secondary', 'clear'];

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
  const { message, withSpinner, startVisible, tone, blur, keepMounted } = props;
  const [visible, setVisible] = useState(startVisible);
  return (
    <Box className="story-column">
      <Box className="story-row">
        <Button variant="secondary" onClick={() => setVisible(true)}>Show overlay</Button>
      </Box>
      <Box className="story-frame">
        <SessionPanel />
        <Overlay visible={visible} tone={tone} blur={blur} keepMounted={keepMounted}>
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

const ARGS: Partial<OverlayArgs> = {
  message: 'Reconnecting to eu-west-2...', withSpinner: true, startVisible: false, tone: 'glass', blur: false, keepMounted: false,
};

const ARG_TYPES: PlaygroundArgTypes<OverlayArgs> = {
    message: { group: 'Content', control: 'text' },
    withSpinner: { group: 'Content', control: 'boolean' },
    tone: { group: 'Appearance', control: 'select', options: [...TONES], description: 'The colour of the layer: glass, a dark scrim, a secondary tint or none.' },
    blur: { group: 'Appearance', control: 'boolean', description: 'Blurs what sits under the layer.' },
    startVisible: { group: 'State', control: 'boolean' },
    keepMounted: { group: 'Behaviour', control: 'boolean', description: 'Keeps the layer in the page while hidden, so it fades out too.' },
  };

const meta = {
  title: 'Primitives · Layout/Overlay',
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

const Tones = {
  name: 'Tones',
  render: () => (
    <Demonstrator
      rows={axis(TONES)}
      cell={(tone) => (
        <Box className="story-frame">
          <SessionPanel />
          <Overlay visible tone={tone} blur={tone === 'secondary'}>
            <Text>{tone === 'clear' ? 'A layer with no colour, as under a screen' : 'Paused'}</Text>
          </Overlay>
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<OverlayArgs>;

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
    '`visible` fades it in; hidden, it draws nothing, or with `keepMounted` stays in the page and fades out.',
    '`tone`: `glass` by default, `scrim` for a [Drawer], `secondary` with `blur` in [DisabledOverlay], or `clear`.',
    '`onClick` on the layer closes what sits above it, as a [Drawer] does.',
    '**The parent needs a position of its own,** such as `position: relative`, for the layer to cover it.',
  ],
  instead: '[DisabledOverlay] for an area that a setting turns off.',
  playground: Playground,
  variants: [Paused, Tones],
  code: CODE,
});

export default meta;
export { Overview, Paused, Playground, Tones };
