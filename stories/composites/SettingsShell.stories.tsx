/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SettingsShell } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { SETTINGS_GROUPS } from './_samples/settings-nav';
import { SettingsPanel } from './_samples/settings-panels';
import './SettingsShell.stories.css';

type ShellArgs = {
  filterable: boolean;
  filterPlaceholder: string;
  withHeader: boolean;
};

const ShellDemo = (props: ShellArgs) => {
  const { filterable, filterPlaceholder, withHeader } = props;
  const [active, setActive] = useState('general');
  return (
    <Box className="story-frame settings-shell-story__frame">
      <SettingsShell
        nav={{ config: { groups: SETTINGS_GROUPS }, activeId: active, onSelect: setActive, ariaLabel: 'Settings' }}
        filterable={filterable}
        filterPlaceholder={filterPlaceholder}
        header={withHeader ? <Text variant="title">Settings</Text> : undefined}
      >
        <SettingsPanel id={active} />
      </SettingsShell>
    </Box>
  );
};

const ARGS: Partial<ShellArgs> = { filterable: true, filterPlaceholder: 'Filter settings...', withHeader: false };

const ARG_TYPES: StoryLiteArgTypes<ShellArgs> = {
    filterable: { control: 'boolean' },
    filterPlaceholder: { control: 'text' },
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

const WithoutFilter = {
  name: 'Without the filter, with a header',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ShellDemo {...args} filterable={false} withHeader />,
} satisfies StoryLiteStoryDefinition<ShellArgs>;

const CODE = `import { SettingsShell } from '@drizztdourden08/tessera';

const [active, setActive] = useState('general');

<SettingsShell
  nav={{ config: { groups: SETTINGS_GROUPS }, activeId: active, onSelect: setActive }}
  filterable
  header={<Text variant="title">Settings</Text>}
>
  <SettingsPanel id={active} />
</SettingsShell>`;

const Overview = overviewStory({
  component: 'SettingsShell',
  description: 'The layout of a settings page: a SideNav on the left, open so its labels show, and a scrolling panel on the right. Reach for it for any settings-style page. The nav is data and takes every SideNav prop; the panel is the children, which the caller swaps for the active item. filterable adds a filter field to the nav that narrows its items by label, and the shell keeps the query. A host that passes nav.search owns the query and filters the groups itself. header puts a row above the nav and the panel, such as a page title. Under 640 pixels wide the nav hides.',
  playground: Playground,
  variants: [WithoutFilter],
  code: CODE,
});

export default meta;
export { Overview, Playground, WithoutFilter };
