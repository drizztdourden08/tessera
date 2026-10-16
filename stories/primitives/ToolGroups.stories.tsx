/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { ScriptTools } from './_samples/ScriptTools';
import { TOOL_GROUPS_CODE } from './_samples/tool-story.constants';

type ToolGroupsArgs = { count: number };

const meta = {
  title: 'Primitives · Actions/ToolGroups',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ToolGroupsArgs>;

const Playground = {
  name: 'Playground',
  args: { count: 3 },
  argTypes: {
    count: { group: 'Content', control: 'select', options: [1, 2, 3], description: 'How many groups: File, then View, then Zoom.' },
  },
  render: (args) => <ScriptTools count={Number(args.count)} />,
} satisfies PlaygroundStory<ToolGroupsArgs>;

const Editor = {
  name: 'The tools of a script editor',
  render: () => <ScriptTools />,
} satisfies StoryLiteStoryDefinition<ToolGroupsArgs>;

const One = {
  name: 'One group',
  render: () => <ScriptTools count={1} />,
} satisfies StoryLiteStoryDefinition<ToolGroupsArgs>;

const Overview = overviewStory({
  component: 'ToolGroups',
  description: 'Tools in groups, each under a small label, with a line between groups, for the top of a studio or an editor.',
  points: [
    'Each group is `{ id, label, content }`; `content` holds any controls, such as buttons or a segmented control.',
    'Each group is a group named by its label, so a screen reader reads the label before the tools.',
    'The groups wrap to a new line when the room runs out.',
    '[StudioLayout] draws its top bar and its editor toolbar with it.',
  ],
  instead: '[ButtonGroup] for buttons joined into one control; [ActionBar] for actions that fold into More.',
  playground: Playground,
  variants: [Editor, One],
  code: TOOL_GROUPS_CODE,
});

export default meta;
export { Editor, One, Overview, Playground };
