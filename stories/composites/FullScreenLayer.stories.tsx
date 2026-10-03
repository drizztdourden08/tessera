/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { FloatingSwitch, FullScreenLayer, ListItemRow } from '../../src/composites';
import type { FloatingSwitchItem } from '../../src/composites';
import { Box, Button, Icon, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { LayerBreakpoints } from './_samples/LayerBreakpoints';
import { NAV_ICONS } from './_samples/nav';
import { PLAYERS, SESSIONS, STATUS_LABEL } from './_samples/sessions';
import './FullScreenLayer.stories.css';

type LayerArgs = {
  title: string;
  subtitle: string;
  withExtra: boolean;
  withFloating: boolean;
};

const WINDOWS: FloatingSwitchItem[] = [
  { id: 'sessions', label: 'Sessions', icon: <Icon name={NAV_ICONS.sessions} /> },
  { id: 'players', label: 'Players', icon: <Icon name={NAV_ICONS.players} /> },
];

const SessionList = () => (
  <Box className="full-screen-layer-story__body">
    {SESSIONS.map((s) => (
      <ListItemRow key={s.id} name={s.name} meta={`${STATUS_LABEL[s.status]}, ${s.players} players`} />
    ))}
  </Box>
);

const PlayerList = () => (
  <Box className="full-screen-layer-story__body">
    {PLAYERS.map((p) => <ListItemRow key={p.slot} name={p.name} meta={`${p.game}, ${p.checks} checks`} />)}
  </Box>
);

const RoomDemo = () => (
  <Box className="story-column">
    <Text className="story-label">Drag the bottom right corner to change the room the layer has</Text>
    <Box className="full-screen-layer-story__room">
      <FullScreenLayer title="Sessions" subtitle="Profile: mira" onClose={() => undefined}>
        <SessionList />
      </FullScreenLayer>
    </Box>
  </Box>
);

const LayerDemo = (props: LayerArgs) => {
  const { title, subtitle, withExtra, withFloating } = props;
  const [hidden, setHidden] = useState(false);
  const [view, setView] = useState('sessions');
  const floating = withFloating
    ? <FloatingSwitch items={WINDOWS} activeId={view} onSelect={setView} label="Switch window" />
    : undefined;
  const viewTitle = view === 'sessions' ? 'Sessions' : 'Players';
  return (
    <Box className="story-column">
      <Box className="story-row">
        <Button variant="secondary" disabled={!hidden} onClick={() => setHidden(false)}>Reopen window</Button>
        <Text className="story-label">The close button hides the layer</Text>
      </Box>
      <Box className="story-frame full-screen-layer-story__frame">
        <FullScreenLayer
          title={withFloating ? viewTitle : title}
          subtitle={subtitle}
          extra={withExtra ? <Button size="sm">New session</Button> : undefined}
          floating={floating}
          hidden={hidden}
          onClose={() => setHidden(true)}
        >
          {view === 'players' && withFloating ? <PlayerList /> : <SessionList />}
        </FullScreenLayer>
      </Box>
    </Box>
  );
};

const ARGS: Partial<LayerArgs> = { title: 'Sessions', subtitle: 'Profile: mira', withExtra: true, withFloating: false };

const ARG_TYPES: StoryLiteArgTypes<LayerArgs> = {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    withExtra: { control: 'boolean' },
    withFloating: { control: 'boolean' },
  };

const meta = {
  title: 'Composites · Screens/FullScreenLayer',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<LayerArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LayerDemo {...args} />,
} satisfies StoryLiteStoryDefinition<LayerArgs>;

const SiblingWindows = {
  name: 'Sibling windows with a floating switch',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LayerDemo {...args} withFloating />,
} satisfies StoryLiteStoryDefinition<LayerArgs>;

const TitleOnly = {
  name: 'Title only',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LayerDemo {...args} subtitle="" withExtra={false} />,
} satisfies StoryLiteStoryDefinition<LayerArgs>;

const FitsItsRoom = {
  name: 'Fits its room',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <RoomDemo />,
} satisfies StoryLiteStoryDefinition<LayerArgs>;

const Breakpoints = {
  name: 'Breakpoints',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <LayerBreakpoints />,
} satisfies StoryLiteStoryDefinition<LayerArgs>;

const CODE = `import { Button, FullScreenLayer } from '@drizztdourden08/tessera';

const [hidden, setHidden] = useState(false);

<FullScreenLayer
  title="Sessions"
  subtitle="Profile: mira"
  extra={<Button size="sm">New session</Button>}
  hidden={hidden}
  onClose={() => setHidden(true)}
>
  <SessionList />
</FullScreenLayer>`;

const Overview = overviewStory({
  component: 'FullScreenLayer',
  description: 'A window that covers its positioned parent, usually the whole app: a card with a title bar, a close button and a scrolling body. Reach for it for a full view the user opens and closes, such as a session list or a data manager. The title bar takes a subtitle and extra controls, and a floating slot sits centred on the top edge of the card for a switch between sibling windows. Setting hidden hides the layer and keeps its content mounted.',
  playground: Playground,
  points: [
    'The space around the card is the same on all four sides and follows the room the layer has, not the window.',
    'From 1280 px wide and 800 px high: a 2xl gap plus 5% of the smaller side. Under that: an xl gap plus 3% of the smaller side.',
    'The gap never drops below half a control height plus an lg space, so the floating switch on the top edge always has room above it.',
    'Under 960 px wide or 600 px high the gap stays at that minimum. Under 480 px wide or 440 px high there is no gap: the card fills the layer with square corners and no border, and the switch moves inside the top of the card. On a phone the card always fills the layer.',
  ],
  variants: [Breakpoints, FitsItsRoom, SiblingWindows, TitleOnly],
  code: CODE,
});

export default meta;
export { Breakpoints, FitsItsRoom, Overview, Playground, SiblingWindows, TitleOnly };
