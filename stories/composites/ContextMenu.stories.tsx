/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { ContextMenuDemo, ControlledContextMenu } from './_samples/ContextMenuDemo';
import type { ContextMenuDemoArgs } from './_samples/ContextMenuDemo';

const ARGS: ContextMenuDemoArgs = { closeOnSelect: true, filter: false, disabled: false, longPress: true };

const ARG_TYPES: PlaygroundArgTypes<ContextMenuDemoArgs> = {
  closeOnSelect: { group: 'Behaviour', control: 'boolean' },
  filter: { group: 'Behaviour', control: 'boolean', description: 'Adds a search field to the menu.' },
  longPress: { group: 'Behaviour', control: 'boolean', description: 'Opens the menu on a long press with touch.' },
  disabled: { group: 'State', control: 'boolean', description: 'Leaves the browser menu in place.' },
};

const meta = {
  title: 'Composites · Menus/ContextMenu',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ContextMenuDemoArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ContextMenuDemo {...args} />,
} satisfies PlaygroundStory<ContextMenuDemoArgs>;

const Corner = {
  name: 'Flips near the edge',
  render: () => <ContextMenuDemo corner />,
} satisfies StoryLiteStoryDefinition<ContextMenuDemoArgs>;

const Controlled = {
  name: 'Opened by the app',
  render: () => <ControlledContextMenu />,
} satisfies StoryLiteStoryDefinition<ContextMenuDemoArgs>;

const CODE = `import { ContextMenu } from '@drizztdourden08/tessera';

<ContextMenu label="Tab" groups={groups}>
  Release notes
</ContextMenu>

<ContextMenu groups={groups} open={point !== null} point={point ?? undefined} onClose={() => setPoint(null)} />`;

const Overview = overviewStory({
  component: 'ContextMenu',
  description: 'A menu that opens where the user right-clicks or long presses, built from the same data as DropdownMenu.',
  points: [
    'Wrap the target and pass `groups`: items, checks, confirms and sub-menus are those of DropdownMenu.',
    'It opens at the pointer on right-click, and under the focused element on Shift+F10 or the menu key.',
    'A long press opens it with touch; `longPress` turns that off when a long press already means something.',
    'The menu flips above or to the left of the point when there is no room.',
    'Pass `open`, `point` and `onClose` to drive it from the app; `onOpen` reports where a gesture asked for it.',
  ],
  instead: '[DropdownMenu] when the menu hangs from its own button.',
  playground: Playground,
  variants: [Corner, Controlled],
  code: CODE,
});

export default meta;
export { Controlled, Corner, Overview, Playground };
