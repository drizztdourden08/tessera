/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SideNav, WindowHeader } from '../../src/composites';
import { Drawer } from '../../src/composites/Drawer';
import { Box, Button, StatRow, Text, Toggle } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { SETTINGS_GROUPS } from './_samples/nav';
import './Drawer.stories.css';

type DrawerSide = 'left' | 'right' | 'top';

type DrawerArgs = {
  side: DrawerSide;
  label: string;
};

type DrawerDemoProps = DrawerArgs & { openLabel: string; renderBody: (close: () => void) => ReactNode };

const DrawerDemo = (props: DrawerDemoProps) => {
  const { side, label, openLabel, renderBody } = props;
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Box className="story-frame drawer-story__frame">
      <Box className="drawer-story__page">
        <Text variant="title">Friday async</Text>
        <Text>Eight players connected on eu-west-2. The drawer opens inside this frame.</Text>
        <Box className="story-row">
          <Button variant="secondary" onClick={() => setOpen(true)}>{openLabel}</Button>
        </Box>
      </Box>
      <Drawer open={open} onClose={close} side={side} label={label}>{renderBody(close)}</Drawer>
    </Box>
  );
};

const PlayerDetails = ({ close }: { close: () => void }) => (
  <>
    <WindowHeader title="Player" subtitle="mira" onClose={close} />
    <Box className="drawer-story__panel">
      <StatRow label="Slot" value="1" mono />
      <StatRow label="Game" value="Puzzle platformer" />
      <StatRow label="Checks" value="112 / 180" />
      <StatRow label="Last item" value="Double jump, from kenji" />
    </Box>
  </>
);

const NavBody = () => {
  const [active, setActive] = useState('general');
  return <SideNav groups={SETTINGS_GROUPS} activeId={active} onSelect={setActive} searchable />;
};

const FilterBody = () => {
  const [running, setRunning] = useState(true);
  const [mine, setMine] = useState(false);
  return (
    <Box className="drawer-story__panel">
      <Toggle checked={running} onChange={setRunning} label="Running sessions only" />
      <Toggle checked={mine} onChange={setMine} label="Sessions I host" />
    </Box>
  );
};

const ARGS: Partial<DrawerArgs> = { side: 'right', label: 'Player details' };

const ARG_TYPES: StoryLiteArgTypes<DrawerArgs> = {
    side: { control: 'select', options: ['left', 'right', 'top'] },
    label: { control: 'text' },
  };

const meta = {
  title: 'Composites · Dialogs/Drawer',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DrawerArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <DrawerDemo {...args} openLabel="Open drawer" renderBody={(close) => <PlayerDetails close={close} />} />
  ),
} satisfies StoryLiteStoryDefinition<DrawerArgs>;

const NavigationDrawer = {
  name: 'Navigation from the left',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <DrawerDemo {...args} side="left" label="Settings sections" openLabel="Open menu" renderBody={() => <NavBody />} />
  ),
} satisfies StoryLiteStoryDefinition<DrawerArgs>;

const FilterSheet = {
  name: 'Filter sheet from the top',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <DrawerDemo {...args} side="top" label="Session filters" openLabel="Filters" renderBody={() => <FilterBody />} />
  ),
} satisfies StoryLiteStoryDefinition<DrawerArgs>;

const CODE = `import { Drawer, WindowHeader } from '@drizztdourden08/tessera';

<Drawer open={open} onClose={() => setOpen(false)} side="right" label="Player details">
  <WindowHeader title="Player" subtitle="mira" onClose={() => setOpen(false)} />
  <PlayerDetails />
</Drawer>`;

const Overview = overviewStory({
  component: 'Drawer',
  description: 'A sheet that slides in from one edge over a scrim. Reach for it on touch and narrow layouts, for navigation, details or filters that should not take a whole page. It opens from the right by default, or from the left or the top, and a tap on the scrim closes it. The body is yours, and label names the panel for screen readers.',
  playground: Playground,
  variants: [NavigationDrawer, FilterSheet],
  code: CODE,
});

export default meta;
export { FilterSheet, NavigationDrawer, Overview, Playground };
