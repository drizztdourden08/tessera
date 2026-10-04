/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ScreenLayer } from '../../src/composites';
import type { ScreenLayerSize } from '../../src/composites';
import { Box, Button, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { LayerBreakpoints } from './_samples/LayerBreakpoints';
import { LayerSample } from './_samples/LayerSample';
import { useWindowSwitch } from './_samples/useWindowSwitch';
import './ScreenLayer.stories.css';

type LayerArgs = {
  size: ScreenLayerSize;
  withFloating: boolean;
};

const RoomDemo = () => (
  <Box className="story-column">
    <Text className="story-label">Drag the bottom right corner to change the room the layer has</Text>
    <Box className="screen-layer-story__room">
      <ScreenLayer label="Sessions">
        <LayerSample />
      </ScreenLayer>
    </Box>
  </Box>
);

const LayerDemo = (props: LayerArgs) => {
  const { size, withFloating } = props;
  const [hidden, setHidden] = useState(false);
  const { floating } = useWindowSwitch(withFloating);
  return (
    <Box className="story-column">
      <Box className="story-row">
        <Button variant="secondary" onClick={() => setHidden(!hidden)}>{hidden ? 'Show the layer' : 'Hide the layer'}</Button>
        <Text className="story-label">Hidden keeps the content mounted</Text>
      </Box>
      <Box className="story-frame screen-layer-story__frame">
        <ScreenLayer label="Sessions" size={size} floating={floating} hidden={hidden}>
          <LayerSample />
        </ScreenLayer>
      </Box>
    </Box>
  );
};

const ARGS: Partial<LayerArgs> = { size: 'fill', withFloating: true };

const ARG_TYPES: PlaygroundArgTypes<LayerArgs> = {
  withFloating: { group: 'Content', control: 'boolean' },
  size: { group: 'Layout', control: 'select', options: ['fill', 'compact'], description: 'fill takes the room inside the gap; compact fits the content, up to a readable width.' },
};

const meta = {
  title: 'Composites · Screens/ScreenLayer',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<LayerArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LayerDemo {...args} />,
} satisfies PlaygroundStory<LayerArgs>;

const Breakpoints = {
  name: 'Breakpoints',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <LayerBreakpoints />,
} satisfies PlaygroundStory<LayerArgs>;

const FitsItsRoom = {
  name: 'Fits its room',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <RoomDemo />,
} satisfies PlaygroundStory<LayerArgs>;

const Compact = {
  name: 'Compact size',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LayerDemo {...args} size="compact" withFloating={false} />,
} satisfies PlaygroundStory<LayerArgs>;

const CODE = `import { ScreenLayer, ScreenWindow } from '@drizztdourden08/tessera';

// Only to build a new kind of screen. To show a screen, use
// WorkspaceScreen, InfoScreen, UtilityScreen or StageScreen.
const KioskScreen = ({ label, children }: { label: string; children: ReactNode }) => (
  <ScreenLayer label={label} className="kiosk-screen">
    {children}
  </ScreenLayer>
);`;

const Overview = overviewStory({
  component: 'ScreenLayer',
  description: 'A building block. Use it only to build a new kind of screen; to show a screen, use WorkspaceScreen, InfoScreen, UtilityScreen or StageScreen, or ScreenWindow when none of them fits. ScreenLayer is the overlay and the frame of every screen: it covers its positioned parent, keeps one gap around a card, and draws the card with nothing in it. It has no title, no close button and no padding. The floating slot sits centred on the top edge of the card, for a switch between sibling screens. size="compact" fits the card to its content up to a readable width. hidden hides the layer and keeps its content mounted.',
  playground: Playground,
  points: [
    'The gap around the card is the same on all four sides and follows the room the layer has, not the window.',
    'From 1280 px wide and 800 px high: a 2xl gap plus 5% of the smaller side. Under that: an xl gap plus 3% of the smaller side.',
    'The gap never drops below half a control height plus an lg space, so the floating switch on the top edge always has room above it.',
    'Under 960 px wide or 600 px high the gap stays at that minimum. Under 480 px wide or 440 px high there is no gap: the card fills the layer with square corners and no border, and the switch moves inside the top of the card, which pushes the content below it. On a phone the card always fills the layer.',
    'The card is a dialog: pass label, or labelledBy with the id of a visible title.',
  ],
  variants: [Breakpoints, FitsItsRoom, Compact],
  code: CODE,
});

export default meta;
export { Breakpoints, Compact, FitsItsRoom, Overview, Playground };
