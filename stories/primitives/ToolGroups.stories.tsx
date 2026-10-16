/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { ScriptTools } from './_samples/ScriptTools';
import { SpriteToolsFrame } from './_samples/SpriteToolsFrame';
import { TOOL_GROUPS_CODE } from './_samples/tool-story.constants';

type ToolGroupsArgs = { count: number; compact: boolean };

const meta = {
  title: 'Primitives · Actions/ToolGroups',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ToolGroupsArgs>;

const Playground = {
  name: 'Playground',
  args: { count: 3, compact: false },
  argTypes: {
    count: { group: 'Content', control: 'select', options: [1, 2, 3], description: 'How many groups: File, then View, then Zoom.' },
    compact: { group: 'Appearance', control: 'boolean', description: 'One row of small controls, the group names hidden.' },
  },
  render: (args) => <ScriptTools count={Number(args.count)} compact={args.compact} />,
} satisfies PlaygroundStory<ToolGroupsArgs>;

const Editor = {
  name: 'The tools of a script editor',
  render: () => <ScriptTools />,
} satisfies StoryLiteStoryDefinition<ToolGroupsArgs>;

const One = {
  name: 'One group',
  render: () => <ScriptTools count={1} />,
} satisfies StoryLiteStoryDefinition<ToolGroupsArgs>;

const Compact = {
  name: 'Compact: the tools of a sprite studio in one row',
  render: () => <SpriteToolsFrame />,
} satisfies StoryLiteStoryDefinition<ToolGroupsArgs>;

const Overview = overviewStory({
  component: 'ToolGroups',
  description: 'Tools in groups, each under a small label, with a line between groups, for the top of a studio or an editor.',
  points: [
    'Each group is `{ id, label, content }`; `content` holds any controls, such as buttons or a segmented control.',
    'Each group is a group named by its label, so a screen reader reads the label before the tools.',
    'The groups wrap to a new line when the room runs out.',
    '`compact` draws one row of small controls with no names shown; a screen reader still reads each name.',
    '[StudioLayout] draws its top bar and its editor toolbar with it.',
  ],
  instead: '[ButtonGroup] for buttons joined into one control; [ActionBar] for actions that fold into More.',
  playground: Playground,
  variants: [Editor, One, Compact],
  code: TOOL_GROUPS_CODE,
});

export default meta;
export { Compact, Editor, One, Overview, Playground };
