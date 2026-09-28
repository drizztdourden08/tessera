/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SettingsShell } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { SETTINGS_GROUPS } from './_samples/nav';
import { SettingsPanel } from './_samples/settings-panels';
import './SettingsShell.stories.css';

type ShellArgs = {
  searchable: boolean;
  searchPlaceholder: string;
  withHeader: boolean;
};

const ShellDemo = (props: ShellArgs) => {
  const { searchable, searchPlaceholder, withHeader } = props;
  const [active, setActive] = useState('general');
  const nav = {
    groups: SETTINGS_GROUPS,
    activeId: active,
    onSelect: setActive,
    searchable,
    searchPlaceholder,
    header: withHeader ? <Text variant="title">Settings</Text> : undefined,
  };
  return (
    <Box className="story-frame settings-shell-story__frame">
      <SettingsShell nav={nav}>
        <SettingsPanel id={active} />
      </SettingsShell>
    </Box>
  );
};

const ARGS: Partial<ShellArgs> = { searchable: true, searchPlaceholder: 'Filter settings...', withHeader: false };

const ARG_TYPES: StoryLiteArgTypes<ShellArgs> = {
    searchable: { control: 'boolean' },
    searchPlaceholder: { control: 'text' },
    withHeader: { control: 'boolean' },
  };

const meta = {
  title: 'Composites · Navigation/SettingsShell',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ShellArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ShellDemo {...args} />,
} satisfies StoryLiteStoryDefinition<ShellArgs>;

const WithoutSearch = {
  name: 'Without search, with a header',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ShellDemo {...args} searchable={false} withHeader />,
} satisfies StoryLiteStoryDefinition<ShellArgs>;

const CODE = `import { SettingsShell } from '@drizztdourden08/tessera';

const [active, setActive] = useState('general');

<SettingsShell nav={{ groups: SETTINGS_GROUPS, activeId: active, onSelect: setActive, searchable: true }}>
  <SettingsPanel id={active} />
</SettingsShell>`;

const Overview = overviewStory({
  component: 'SettingsShell',
  description: 'The layout of a settings page: a grouped SideNav on the left and a scrolling panel on the right. Reach for it for any settings-style page. The nav is data and takes every SideNav prop, including its filter box and header; the panel is the children, which the caller swaps for the active item.',
  playground: Playground,
  variants: [WithoutSearch],
  code: CODE,
});

export default meta;
export { Overview, Playground, WithoutSearch };
