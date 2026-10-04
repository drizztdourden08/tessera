/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SearchResultHit } from '../../src/composites';
import { Box, Icon, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';

type HitArgs = {
  label: string;
  description: string;
  path: string;
  query: string;
  withIcon: boolean;
};

const HitDemo = (props: HitArgs) => {
  const { label, description, path, query, withIcon } = props;
  const [opened, setOpened] = useState(0);
  return (
    <Box className="story-column">
      <SearchResultHit
        label={label}
        description={description || undefined}
        path={path === '' ? undefined : path.split('/').map((step) => step.trim())}
        query={query}
        icon={withIcon ? <Icon name="keyboard" /> : undefined}
        onOpen={() => setOpened(opened + 1)}
      />
      <Text className="story-label">{`Opened ${opened} times`}</Text>
    </Box>
  );
};

const ARGS: Partial<HitArgs> = { label: 'Search', description: 'Ctrl+K opens the search from any screen.', path: 'Reference / Keyboard', query: 'sea', withIcon: true };

const ARG_TYPES: PlaygroundArgTypes<HitArgs> = {
  label: { group: 'Content', control: 'text' },
  description: { group: 'Content', control: 'text' },
  path: { group: 'Content', control: 'text', description: 'Where the match lives, one name per step, split here on /.' },
  query: { group: 'Content', control: 'text', description: 'The text to mark in the label and the description.' },
  withIcon: { group: 'Content', control: 'boolean' },
};

const meta = {
  title: 'Composites · Lists/SearchResultHit',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<HitArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <HitDemo {...args} />,
} satisfies PlaygroundStory<HitArgs>;

const LabelOnly = {
  name: 'Label only',
  render: () => <Box className="story-column"><SearchResultHit label="Saves" query="sav" /></Box>,
} satisfies StoryLiteStoryDefinition<HitArgs>;

const LongPath = {
  name: 'A long path',
  render: () => (
    <Box className="story-column">
      <SearchResultHit label="Close to the tray" description="The close button hides the window." path={['Settings', 'General', 'Tray', 'Icon']} query="tray" icon={<Icon name="settings" />} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<HitArgs>;

const Overview = overviewStory({
  component: 'SearchResultHit',
  description: 'One match in the search results that is not a setting, such as a help entry or a record.',
  points: [
    'It shows an `icon`, the `label` with the `query` marked, a `description` and its `path`.',
    'The whole row is one button that calls `onOpen`; an arrow shows on hover and focus.',
    'Settings show as their own live rows instead.',
  ],
  playground: Playground,
  variants: [LabelOnly, LongPath],
  states: {
    render: (props) => <SearchResultHit label="Open a port" description="Players reach your session on the port you pick." path={['Guides', 'Hosting']} query="port" {...props} />,
    list: [STATE.idle, STATE.hover, STATE.focus],
  },
});

export default meta;
export { LabelOnly, LongPath, Overview, Playground };
