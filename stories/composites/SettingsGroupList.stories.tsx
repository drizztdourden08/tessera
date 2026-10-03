/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SettingsGroupList } from '../../src/composites';
import type { SettingsGroupListSection } from '../../src/composites';
import { Box, Toggle } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { useSettingsSample } from './_samples/settings-list';

type GroupListArgs = {
  withReset: boolean;
  flash: string;
  emptyMessage: string;
};

const ListDemo = (props: GroupListArgs) => {
  const { withReset, flash, emptyMessage } = props;
  const sections = useSettingsSample();
  const shown = withReset ? sections : sections.map((section) => ({ ...section, onReset: undefined }));
  return (
    <Box className="story-column">
      <SettingsGroupList sections={shown} flash={flash || undefined} emptyMessage={emptyMessage} />
    </Box>
  );
};

const ARGS: Partial<GroupListArgs> = { withReset: true, flash: '', emptyMessage: 'Nothing to set here right now.' };

const ARG_TYPES: StoryLiteArgTypes<GroupListArgs> = {
  withReset: { control: 'boolean' },
  flash: { control: 'select', options: ['', 'restore', 'volume', 'window-tray', 'sound'] },
  emptyMessage: { control: 'text' },
};

const meta = {
  title: 'Composites · Settings/SettingsGroupList',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<GroupListArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ListDemo {...args} />,
} satisfies StoryLiteStoryDefinition<GroupListArgs>;

const WithoutReset = {
  name: 'Without reset',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ListDemo {...args} withReset={false} />,
} satisfies StoryLiteStoryDefinition<GroupListArgs>;

const Empty = {
  name: 'Empty',
  render: () => <SettingsGroupList sections={[]} />,
} satisfies StoryLiteStoryDefinition<GroupListArgs>;

const stateSection = (props: StateProps): SettingsGroupListSection[] => [{
  id: 'window',
  title: 'Window',
  changedCount: props.changed === true ? 2 : 0,
  onReset: () => undefined,
  groups: [{
    id: 'window-startup',
    title: 'Startup',
    rows: [
      { key: 'restore', content: <Toggle checked onChange={() => undefined} label="Open the last screen on launch" /> },
      { key: 'updates', content: <Toggle checked={false} onChange={() => undefined} label="Check for updates" />, lock: props.locked === true ? 'Managed by your organisation' : null },
    ],
  }],
}];

const renderState = (props: StateProps) => (
  <SettingsGroupList sections={stateSection(props)} flash={typeof props.flash === 'string' ? props.flash : undefined} />
);

const CODE = `import { SettingsGroupList } from '@drizztdourden08/tessera';

<SettingsGroupList
  sections={[{
    id: 'window',
    title: 'Window',
    changedCount: 1,
    onReset: resetWindow,
    groups: [{
      id: 'window-startup',
      title: 'Startup',
      rows: [
        { key: 'restore', content: <Toggle checked={restore} onChange={setRestore} label="Open the last screen on launch" /> },
        { key: 'closeToTray', content: <Toggle ... />, lock: tray ? null : 'Turn on the tray icon first' },
      ],
    }],
  }]}
  flash={jumpedTo}
/>`;

const Overview = overviewStory({
  component: 'SettingsGroupList',
  description: 'The body of a settings page, drawn from data: sections with a large underlined title, each holding bordered groups of rows. A section that takes onReset shows a reset button in its heading, faint until the heading is hovered, which asks once and names how many settings differ from their defaults. Rows that share a lock cause run together under one DisabledOverlay that says why they are locked. flash names a row key, group id or section id to pulse once, for a search that jumps to a setting. Every section and group carries data-section and every row data-setting-key, so SettingsPage can spy on the sections and a search can find a row. Each group is a SettingsSection.',
  playground: Playground,
  variants: [WithoutReset, Empty],
  states: {
    render: renderState,
    list: [
      { ...STATE.idle, name: 'At defaults' },
      { name: 'Changed', props: { changed: true } },
      { name: 'Heading hover', pseudo: 'hover', target: '.settings-group-list__heading', props: { changed: true } },
      { name: 'Locked run', props: { locked: true } },
      { name: 'Search hit', props: { flash: 'restore' } },
    ],
  },
  code: CODE,
});

export default meta;
export { Empty, Overview, Playground, WithoutReset };
