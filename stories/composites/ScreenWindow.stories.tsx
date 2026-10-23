/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { EscapeLevels } from './_samples/EscapeLevels';
import { HubWindow } from './_samples/hub-window/HubWindow';
import { WindowDemo } from './_samples/window-demo/WindowDemo';
import type { WindowArgs } from './_samples/window-demo/window-demo.type';
import './ScreenWindow.stories.css';

const ARGS: Partial<WindowArgs> = { title: 'Sessions', subtitle: 'Profile: mira', withExtra: true, withFloating: false, withHeader: false, withBack: false, titleRow: true, withIcon: false, cornerTitle: true, movable: false, square: false };

const ARG_TYPES: PlaygroundArgTypes<WindowArgs> = {
  title: { group: 'Content', control: 'text' },
  subtitle: { group: 'Content', control: 'text' },
  withExtra: { group: 'Content', control: 'boolean' },
  withFloating: { group: 'Content', control: 'boolean' },
  withBack: { group: 'Content', control: 'boolean', description: 'back, in the title bar or in the page header: here it goes back to the page behind.' },
  withHeader: { group: 'Appearance', control: 'boolean', description: 'A page header with an icon is the top of the window, in place of the title bar.' },
  titleRow: { group: 'Appearance', control: 'boolean', description: 'Off: no title row; the title names the window, and a round X sits on the top right corner.' },
  cornerTitle: { group: 'Appearance', control: 'boolean', description: 'With no title row: the title in a small chip on the top left corner. Off: the corner keeps only its buttons.' },
  withIcon: { group: 'Appearance', control: 'boolean', description: 'With no title row: a 14 px icon before the title in the corner chip.' },
  movable: { group: 'Appearance', control: 'boolean', description: 'With no title row: a lock beside the X; unlocked, the window moves and resizes.' },
  square: { group: 'Appearance', control: 'boolean', description: 'No corner radius and no outer border, for a window shown fullscreen.' },
};

const meta = {
  title: 'Composites · Screens/ScreenWindow',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<WindowArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowDemo {...args} />,
} satisfies PlaygroundStory<WindowArgs>;

const SiblingWindows = {
  name: 'Sibling windows with a floating switch',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowDemo {...args} withFloating />,
} satisfies PlaygroundStory<WindowArgs>;

const WithHeader = {
  name: 'With a page header',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowDemo {...args} withHeader />,
} satisfies PlaygroundStory<WindowArgs>;

const WithBack = {
  name: 'With a back button',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowDemo {...args} withBack />,
} satisfies PlaygroundStory<WindowArgs>;

const TitleOnly = {
  name: 'Title only',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowDemo {...args} subtitle="" withExtra={false} />,
} satisfies PlaygroundStory<WindowArgs>;

const Narrow = {
  name: 'In a narrow box',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowDemo {...args} phone />,
} satisfies PlaygroundStory<WindowArgs>;

const CornerTitle = {
  name: 'No title row: the title and an icon in a chip on the corner',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowDemo {...args} titleRow={false} withIcon movable subtitle="" withExtra={false} />,
} satisfies PlaygroundStory<WindowArgs>;

const CornerTitleLong = {
  name: 'No title row, long title: the chip ends in an ellipsis',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WindowDemo {...args} title={LONG_TITLE} titleRow={false} withIcon movable subtitle="" withExtra={false} phone />,
} satisfies PlaygroundStory<WindowArgs>;

const HubLocked = {
  name: 'No title row, locked: the X and the lock on the corner',
  render: () => <HubWindow />,
} satisfies StoryLiteStoryDefinition<WindowArgs>;

const HubUnlocked = {
  name: 'Unlocked: drag the top edge, resize from any edge or corner',
  render: () => <HubWindow defaultLocked={false} />,
} satisfies StoryLiteStoryDefinition<WindowArgs>;

const HubMoved = {
  name: 'Unlocked, moved and resized',
  render: () => <HubWindow defaultLocked={false} defaultRect={MOVED_RECT} />,
} satisfies StoryLiteStoryDefinition<WindowArgs>;

const EscapeOrder = {
  name: 'Escape by level',
  render: () => <EscapeLevels />,
} satisfies StoryLiteStoryDefinition<WindowArgs>;

const MOVED_RECT = { x: 64, y: 72, width: 720, height: 480 };

const LONG_TITLE = 'Multiworld session history for the whole Saturday league';

const CODE = `import { Button, Icon, ScreenWindow } from '@drizztdourden08/tessera';

<ScreenWindow title="Sessions" subtitle="Profile: mira" onClose={close}>
  <SessionList />
</ScreenWindow>

<ScreenWindow title="Sessions" header={{ icon: <Icon name="layers" />, actions: <Button size="sm">New session</Button> }} onClose={close}>
  <SessionList />
</ScreenWindow>

<ScreenWindow title="Data" titleRow={false} movable storageKey="hub.data" floating={<FloatingSwitch ... />} onClose={close}>
  <DataPages />
</ScreenWindow>`;

const Overview = overviewStory({
  component: 'ScreenWindow',
  description: 'A building block: a ScreenLayer with a title, a close button and an empty container, the window of every screen kind.',
  points: [
    'The title bar takes a `subtitle`, `extra` controls before the close button and `back` for a back button.',
    '`header` swaps the title bar for a [ContentHeader] at the top edge, with the close button at its end.',
    'The padding is xl, lg under 960 by 600 px, and md once the card fills the layer; `header` drops it.',
    '`titleRow={false}`: the title and an `icon` sit in a chip top left, and a round X top right.',
    '`cornerTitle={false}` drops the chip; `movable` adds a lock; unlocked, the window moves and resizes.',
    '`floating`, `hidden`, `size`, `square` go to the [ScreenLayer]; Escape calls `onClose` once nothing is above.',
  ],
  instead: '[WorkspaceScreen], [InfoScreen], [UtilityScreen] or [StageScreen] first; this only when none of them fits.',
  playground: Playground,
  variants: [WithHeader, SiblingWindows, CornerTitle, CornerTitleLong, HubLocked, HubUnlocked, HubMoved, WithBack, TitleOnly, Narrow, EscapeOrder],
  code: CODE,
});

export default meta;
export { CornerTitle, CornerTitleLong, EscapeOrder, HubLocked, HubMoved, HubUnlocked, Narrow, Overview, Playground, SiblingWindows, TitleOnly, WithBack, WithHeader };
