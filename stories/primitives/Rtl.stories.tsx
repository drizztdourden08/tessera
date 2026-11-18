/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { Box, Callout, Flex, Icon, IconButton, SegmentedControl, Tabs, Text, TextInput } from '../../src/primitives';

type RtlArgs = Record<string, never>;

type Direction = 'ltr' | 'rtl';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'done', label: 'Done' },
];

const VIEWS = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
];

const RtlSample = ({ dir }: { dir: Direction }) => {
  const [tab, setTab] = useState('all');
  const [view, setView] = useState('list');
  return (
    <Box dir={dir} className="story-column">
      <Text variant="overline" tone="muted">{dir === 'rtl' ? 'Right to left' : 'Left to right'}</Text>
      <Flex align="center" gap="sm">
        <Icon name="info" size={16} />
        <Text>An icon followed by a line of text.</Text>
      </Flex>
      <TextInput start={{ icon: 'search' }} placeholder="Search" aria-label="Search" />
      <Flex align="center" gap="sm" justify="between">
        <Text>A list row with actions at the end</Text>
        <Flex align="center" gap="xs">
          <IconButton size="sm" label="Edit"><Icon name="pencil" size={14} /></IconButton>
          <IconButton size="sm" label="Delete" tone="danger"><Icon name="trash-2" size={14} /></IconButton>
        </Flex>
      </Flex>
      <Tabs tabs={TABS} activeTab={tab} onTabChange={setTab} />
      <SegmentedControl value={view} options={VIEWS} onChange={setView} label="View" />
      <Callout tone="warning" icon={<Icon name="triangle-alert" size={16} />}>A callout with an accent on its leading edge.</Callout>
    </Box>
  );
};

const meta = {
  title: 'Primitives · Layout/Right to left',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RtlArgs>;

const Both = {
  name: 'Left to right and right to left',
  render: () => (
    <Flex gap="lg" wrap>
      <RtlSample dir="ltr" />
      <RtlSample dir="rtl" />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<RtlArgs>;

const Overview = overviewStory({
  component: 'Box',
  description: 'Set dir="rtl" on any container and every Tessera component inside mirrors its inline layout.',
  points: [
    'Spacing, borders, corners and text alignment use logical properties, so start and end follow the direction.',
    'Placement that follows a pointer, an anchor or a value axis stays physical: tooltips, sliders, resize handles.',
    'Box passes `dir` through to its element.',
  ],
  code: '<Box dir="rtl">...</Box>',
  variants: [Both],
});

export default meta;
export { Both, Overview };
