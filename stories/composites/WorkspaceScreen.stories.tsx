/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { WorkspaceHubDemo } from './_samples/WorkspaceHubDemo';

type WorkspaceArgs = {
  compact: boolean;
  withSwitch: boolean;
};

const ARGS: Partial<WorkspaceArgs> = { compact: false, withSwitch: true };

const ARG_TYPES: StoryLiteArgTypes<WorkspaceArgs> = {
  compact: { control: 'boolean', description: 'For a narrow window: the side list stays a strip of icons and opens over the page.' },
  withSwitch: { control: 'boolean', description: 'A floating switch between sibling workspaces on the top edge.' },
};

const meta = {
  title: 'Composites · Screens/WorkspaceScreen',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<WorkspaceArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WorkspaceHubDemo compact={args.compact} withSwitch={args.withSwitch} />,
} satisfies StoryLiteStoryDefinition<WorkspaceArgs>;

const Narrow = {
  name: 'A narrow window',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <WorkspaceHubDemo compact withSwitch={false} />,
} satisfies StoryLiteStoryDefinition<WorkspaceArgs>;

const CODE = `import { WorkspaceScreen } from '@drizztdourden08/tessera';

<WorkspaceScreen
  title="Home"
  subtitle="Profile: mira"
  onClose={close}
  nav={{ config: HUB_NAV, activeId: active, onSelect: setActive, defaultOpen: true }}
  page={{ icon: <Icon name="settings" />, title: 'General', anchors: GENERAL_ANCHORS }}
>
  <SettingsGroupList sections={generalSections} />
</WorkspaceScreen>`;

const Overview = overviewStory({
  component: 'WorkspaceScreen',
  description: 'The screen the user works in: a settings hub, a profile hub or a data manager. It is a ScreenWindow with a SideNav on the left and the current page on the right. The page is a SettingsPage: page sets its icon, its title and the pills of its header, which jump to its sections or switch its views, and the children are its body, which scrolls. The host swaps page and children when the nav changes. With a search in the nav and results set, the page gives way to the results while the user searches. filterable narrows the nav by label instead. The title bar takes a subtitle and extra controls, and the floating slot takes a switch between sibling workspaces.',
  playground: Playground,
  points: [
    'Use it for screens with several pages the user moves between and changes things on.',
    'For About or credits, use InfoScreen. For one short task with a status, use UtilityScreen. For one big custom surface, use StageScreen.',
    'hidden keeps the screen mounted, so the page and the scroll stay where the user left them.',
  ],
  variants: [Narrow],
  code: CODE,
});

export default meta;
export { Narrow, Overview, Playground };
