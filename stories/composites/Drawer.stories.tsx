/* @layer stories @kind story */
import { useState } from 'react';
import type { ComponentType } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { FilterPanelDrawer, ItemDetailsDrawer, NotificationsDrawer, RecordDrawer, SearchSheetDrawer } from './_samples/DrawerBodies';
import type { SampleDrawerProps } from './_samples/DrawerBodies';
import './Drawer.stories.css';

type DrawerSide = 'left' | 'right' | 'top';

type DrawerArgs = {
  side: DrawerSide;
  size: 'md' | 'lg' | 'wide' | 'xl';
  label: string;
  look: 'default' | 'record';
};

type DrawerDemoProps = DrawerArgs & { stackNarrow?: boolean; headerActionsRow?: 'title' | 'eyebrow'; openLabel: string; Sample: ComponentType<SampleDrawerProps> };

const DrawerDemo = (props: DrawerDemoProps) => {
  const { side, size, look, label, stackNarrow, headerActionsRow, openLabel, Sample } = props;
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
      <Sample open={open} close={close} side={side} size={size} look={look} label={label} stackNarrow={stackNarrow} headerActionsRow={headerActionsRow} />
    </Box>
  );
};

const ARGS: Partial<DrawerArgs> = { side: 'right', size: 'md', look: 'default', label: 'File details' };

const ARG_TYPES: PlaygroundArgTypes<DrawerArgs> = {
  label: { group: 'Content', control: 'text' },
  side: { group: 'Layout', control: 'select', options: ['left', 'right', 'top'] },
  look: { group: 'Layout', control: 'select', options: ['default', 'record'], description: 'record keeps chips in the eyebrow as authored and draws the title in the text colour, in sentence case.' },
  size: { group: 'Layout', control: 'select', options: ['md', 'lg', 'wide', 'xl'], description: 'md is 384 px, lg 640 px, wide 768 px, xl 1024 px, each capped by the window; under 480 px every size is full width. A top drawer ignores it.' },
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

const Record = {
  name: 'Record with eyebrow and header actions',
  args: { ...ARGS, size: 'wide', label: 'Incident' },
  argTypes: ARG_TYPES,
  render: (args) => (
    <DrawerDemo {...args} openLabel="Open record" Sample={RecordDrawer} />
  ),
} satisfies PlaygroundStory<DrawerArgs>;

const RecordLook = {
  name: 'look="record": chips as authored and a white sentence-case title',
  args: { ...ARGS, size: 'wide', look: 'record', label: 'Node' },
  argTypes: ARG_TYPES,
  render: (args) => (
    <DrawerDemo {...args} openLabel="Open node" Sample={RecordDrawer} />
  ),
} satisfies PlaygroundStory<DrawerArgs>;

const StackedHeader = {
  name: 'stackNarrow: the header tools drop under the title when the drawer is narrow',
  args: { ...ARGS, label: 'Incident' },
  argTypes: ARG_TYPES,
  render: (args) => (
    <DrawerDemo {...args} stackNarrow openLabel="Open record" Sample={RecordDrawer} />
  ),
} satisfies PlaygroundStory<DrawerArgs>;

const EyebrowActions = {
  name: 'headerActionsRow="eyebrow": the header tools sit in the id and tag row',
  args: { ...ARGS, size: 'wide', look: 'record', label: 'Node' },
  argTypes: ARG_TYPES,
  render: (args) => (
    <DrawerDemo {...args} headerActionsRow="eyebrow" openLabel="Open node" Sample={RecordDrawer} />
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
    '`title`, `subtitle` and `eyebrow` fill the header and wrap when long; `actions` sit in a footer row.',
    '`look="record"` keeps eyebrow chips as written and a plain sentence-case title.',
    '`stackNarrow` moves the header tools under a long title; `headerActionsRow="eyebrow"` puts them beside the id.',
    '`size` runs `md`, `lg`, `wide` and `xl`; any size is full width under 480 px.',
    '[[Esc]], the scrim or the close button calls `onClose`; focus stays inside. `label` names a panel with no `title`.',
  ],
  instead: '[DialogShell] for a modal that waits for an answer.',
  playground: Playground,
  variants: [Record, RecordLook, EyebrowActions, StackedHeader, FilterPanel, Notifications, SearchSheet],
  code: CODE,
});

export default meta;
export { EyebrowActions, FilterPanel, Notifications, Overview, Playground, Record, RecordLook, SearchSheet, StackedHeader };
