/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ScreenLayer } from '../../src/composites';
import type { ScreenLayerSize } from '../../src/composites';
import { Box, Button, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { LayerBreakpoints } from './_samples/LayerBreakpoints';
import { LayerOverPage } from './_samples/LayerOverPage';
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

const OverPage = {
  name: 'Over a page, with focus',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <LayerOverPage />,
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
  description: 'A building block: the overlay and empty card of every screen, with one gap around the card that follows the room.',
  points: [
    'The gap is 2xl plus 5% of the smaller side from 1280 by 800 px, and xl plus 3% under that.',
    'Under 960 by 600 px the gap stays at its minimum; under 840 by 560 px the card fills the layer, square.',
    '`floating` sits centred on the top edge of the card, for a switch between sibling screens.',
    '`size="compact"` fits the card to its content; `hidden` hides the layer and keeps it mounted.',
    'The card and switch are one modal dialog: pass `label`, or `labelledBy` with the id of a visible title.',
    'On open focus moves to that title, or the first control; the page behind is inert; on close focus returns.',
  ],
  instead: '[WorkspaceScreen], [InfoScreen], [UtilityScreen] or [StageScreen] to show a screen, [ScreenWindow] if none fits.',
  playground: Playground,
  variants: [OverPage, Breakpoints, FitsItsRoom, Compact],
  code: CODE,
});

export default meta;
export { Breakpoints, Compact, FitsItsRoom, Overview, OverPage, Playground };
