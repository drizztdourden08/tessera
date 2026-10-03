/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Drawer } from '../../src/composites/Drawer';
import { Box, Button, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { FilterPanelBody, ItemDetailsBody, NotificationsBody, SearchSheetBody } from './_samples/DrawerBodies';
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
        <Text variant="title">Project files</Text>
        <Text>24 files in this folder, last changed today. The drawer opens inside this frame.</Text>
        <Box className="story-row">
          <Button variant="secondary" onClick={() => setOpen(true)}>{openLabel}</Button>
        </Box>
      </Box>
      <Drawer open={open} onClose={close} side={side} label={label}>{renderBody(close)}</Drawer>
    </Box>
  );
};

const ARGS: Partial<DrawerArgs> = { side: 'right', label: 'File details' };

const ARG_TYPES: StoryLiteArgTypes<DrawerArgs> = {
  side: { control: 'select', options: ['left', 'right', 'top'] },
  label: { control: 'text' },
};

const meta = {
  title: 'Composites · Overlays/Drawer',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DrawerArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <DrawerDemo {...args} openLabel="Show details" renderBody={(close) => <ItemDetailsBody close={close} />} />
  ),
} satisfies StoryLiteStoryDefinition<DrawerArgs>;

const FilterPanel = {
  name: 'Filters from the left',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <DrawerDemo {...args} side="left" label="Filters" openLabel="Filters" renderBody={(close) => <FilterPanelBody close={close} />} />
  ),
} satisfies StoryLiteStoryDefinition<DrawerArgs>;

const Notifications = {
  name: 'Notifications from the right',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <DrawerDemo
      {...args}
      side="right"
      label="Notifications"
      openLabel="Notifications"
      renderBody={(close) => <NotificationsBody close={close} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<DrawerArgs>;

const SearchSheet = {
  name: 'Search from the top',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <DrawerDemo {...args} side="top" label="Search files" openLabel="Search" renderBody={() => <SearchSheetBody />} />
  ),
} satisfies StoryLiteStoryDefinition<DrawerArgs>;

const CODE = `import { Drawer, WindowHeader } from '@drizztdourden08/tessera';

<Drawer open={open} onClose={() => setOpen(false)} side="right" label="File details">
  <WindowHeader title="Details" subtitle="Budget 2026.xlsx" onClose={() => setOpen(false)} />
  <FileDetails />
</Drawer>`;

const Overview = overviewStory({
  component: 'Drawer',
  description: 'A sheet that slides in from one edge over a scrim. Reach for it on touch and narrow layouts, for details, filters, notifications or a quick search that should not take a whole page. It opens from the right by default, or from the left or the top, and a tap on the scrim closes it. The body is yours, and label names the panel for screen readers.',
  playground: Playground,
  variants: [FilterPanel, Notifications, SearchSheet],
  code: CODE,
});

export default meta;
export { FilterPanel, Notifications, Overview, Playground, SearchSheet };
