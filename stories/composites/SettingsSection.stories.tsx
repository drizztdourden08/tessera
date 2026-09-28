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
  description: 'One titled block of a settings page: an uppercase title, an optional description, and the controls under them. Reach for it to group related settings, one section per topic, stacked down the page. It is layout only; the controls inside belong to the caller.',
  playground: Playground,
  variants: [General, WithoutDescription],
});

export default meta;
export { General, Overview, Playground, Stacked, WithoutDescription };
