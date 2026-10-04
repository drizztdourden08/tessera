/* @layer stories @kind story */
import { useState } from 'react';
import type { ComponentType } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { FilterPanelDrawer, ItemDetailsDrawer, NotificationsDrawer, SearchSheetDrawer } from './_samples/DrawerBodies';
import type { SampleDrawerProps } from './_samples/DrawerBodies';
import './Drawer.stories.css';

type DrawerSide = 'left' | 'right' | 'top';

type DrawerArgs = {
  side: DrawerSide;
  label: string;
};

type DrawerDemoProps = DrawerArgs & { openLabel: string; Sample: ComponentType<SampleDrawerProps> };

const DrawerDemo = (props: DrawerDemoProps) => {
  const { side, label, openLabel, Sample } = props;
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
      <Sample open={open} close={close} side={side} label={label} />
    </Box>
  );
};

const ARGS: Partial<DrawerArgs> = { side: 'right', label: 'File details' };

const ARG_TYPES: PlaygroundArgTypes<DrawerArgs> = {
  label: { group: 'Content', control: 'text' },
  side: { group: 'Layout', control: 'select', options: ['left', 'right', 'top'] },
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
    <DrawerDemo {...args} openLabel="Show details" Sample={ItemDetailsDrawer} />
  ),
} satisfies PlaygroundStory<DrawerArgs>;

const FilterPanel = {
  name: 'Filters from the left',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <DrawerDemo {...args} side="left" label="Filters" openLabel="Filters" Sample={FilterPanelDrawer} />
  ),
} satisfies PlaygroundStory<DrawerArgs>;

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
      Sample={NotificationsDrawer}
    />
  ),
} satisfies PlaygroundStory<DrawerArgs>;

const SearchSheet = {
  name: 'Search from the top',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <DrawerDemo {...args} side="top" label="Search files" openLabel="Search" Sample={SearchSheetDrawer} />
  ),
} satisfies PlaygroundStory<DrawerArgs>;

const CODE = `import { Button, Drawer } from '@drizztdourden08/tessera';

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Details"
  subtitle="Budget 2026.xlsx"
  actions={<Button variant="primary" onClick={openFile}>Open</Button>}
>
  <FileDetails />
</Drawer>`;

const Overview = overviewStory({
  component: 'Drawer',
  description: 'A panel that slides in from one edge over a scrim, for details, filters or a quick search that should not take a whole page.',
  points: [
    '`side` picks the edge: `right` by default, `left` or `top`.',
    '`title` and `subtitle` fill a header with a close button; `actions` sit in a footer row.',
    'The body pads its content and scrolls when it runs long.',
    'A tap on the scrim or the close button calls `onClose`.',
    '`label` names the panel for screen readers when there is no `title`.',
  ],
  instead: '[DialogShell] for a modal that waits for an answer.',
  playground: Playground,
  variants: [FilterPanel, Notifications, SearchSheet],
  code: CODE,
});

export default meta;
export { FilterPanel, Notifications, Overview, Playground, SearchSheet };
