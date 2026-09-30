/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SettingsSection } from '../../src/composites';
import { Box, Toggle } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { AppearancePanel, GeneralPanel, HostingPanel } from './_samples/settings-panels';

type SectionArgs = {
  title: string;
  description: string;
};

const NotificationToggles = () => {
  const [joins, setJoins] = useState(true);
  const [items, setItems] = useState(false);
  return (
    <>
      <Toggle checked={joins} onChange={setJoins} label="A player joins or leaves" />
      <Toggle checked={items} onChange={setItems} label="Someone sends me an item" />
    </>
  );
};

const LockedRows = () => {
  const [tray, setTray] = useState(false);
  const [close, setClose] = useState(false);
  const [minimise, setMinimise] = useState(true);
  const lock = tray ? null : 'Turn on the tray icon first';
  return (
    <SettingsSection
      inset
      title="Tray"
      rows={[
        { key: 'tray', content: <Toggle checked={tray} onChange={setTray} label="Show a tray icon" /> },
        { key: 'close', content: <Toggle checked={close} onChange={setClose} label="Close to the tray" />, lock },
        { key: 'minimise', content: <Toggle checked={minimise} onChange={setMinimise} label="Minimise to the tray" />, lock },
      ]}
    />
  );
};

const ARGS: Partial<SectionArgs> = { title: 'Notifications', description: 'Which session events show a desktop notification.' };

const ARG_TYPES: StoryLiteArgTypes<SectionArgs> = {
    title: { control: 'text' },
    description: { control: 'textarea' },
  };

const meta = {
  title: 'Composites · Navigation/SettingsSection',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SectionArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <SettingsSection title={args.title} description={args.description || undefined}>
      <NotificationToggles />
    </SettingsSection>
  ),
} satisfies StoryLiteStoryDefinition<SectionArgs>;

const General = {
  name: 'General',
  render: () => <Box className="story-column"><GeneralPanel /></Box>,
} satisfies StoryLiteStoryDefinition<SectionArgs>;

const WithoutDescription = {
  name: 'Without a description',
  render: () => <Box className="story-column"><AppearancePanel /></Box>,
} satisfies StoryLiteStoryDefinition<SectionArgs>;

const Rows = {
  name: 'Inset rows with a locked run',
  render: () => <Box className="story-column"><LockedRows /></Box>,
} satisfies StoryLiteStoryDefinition<SectionArgs>;

const Stacked = {
  name: 'Stacked sections',
  render: () => (
    <Box className="story-column">
      <GeneralPanel />
      <HostingPanel />
      <AppearancePanel />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SectionArgs>;

const Overview = overviewStory({
  component: 'SettingsSection',
  description: 'One titled block of a settings page: an uppercase title, an optional description, and the controls under them. Reach for it to group related settings, one section per topic, stacked down the page. It is layout only; the controls inside belong to the caller. Pass rows in place of children to key each row: rows that share a lock cause run together under one DisabledOverlay, flashKey pulses one row for a search that jumps to it, and anchor sets data-section for a page that spies on its sections. inset draws the group on the sunken fill with a hairline border, the look SettingsGroupList uses.',
  playground: Playground,
  variants: [General, WithoutDescription, Rows],
});

export default meta;
export { General, Overview, Playground, Rows, Stacked, WithoutDescription };
