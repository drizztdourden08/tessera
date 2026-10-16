/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { ScriptFrame } from './_samples/ScriptFrame';
import { TOOL_FRAME_CODE } from './_samples/tool-story.constants';
import './ToolFrame.stories.css';

type ToolFrameArgs = { toolbar: boolean; padded: boolean };

const meta = {
  title: 'Primitives · Layout/ToolFrame',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ToolFrameArgs>;

const Playground = {
  name: 'Playground',
  args: { toolbar: true, padded: true },
  argTypes: {
    toolbar: { group: 'Content', control: 'boolean', description: 'The tools on the top edge, here ToolGroups with File and View.' },
    padded: { group: 'Appearance', control: 'boolean', description: 'Space around the content; leave it off when the content has its own, like a log.' },
  },
  render: (args) => <ScriptFrame toolbar={args.toolbar} padded={args.padded} />,
} satisfies PlaygroundStory<ToolFrameArgs>;

const Editor = {
  name: 'A script editor with its tools',
  render: () => <ScriptFrame />,
} satisfies StoryLiteStoryDefinition<ToolFrameArgs>;

const Plain = {
  name: 'No toolbar',
  render: () => <ScriptFrame toolbar={false} />,
} satisfies StoryLiteStoryDefinition<ToolFrameArgs>;

const Overview = overviewStory({
  component: 'ToolFrame',
  description: 'A sunken frame for the thing being worked on, with its toolbar on the top edge, such as an editor or a log.',
  points: [
    '`toolbar` sits on the top edge, on the surface colour, over a line; the content scrolls under it.',
    '`padded` puts space around the content; leave it off for content that has its own, like a list.',
    '`as` and every other prop reach the frame, so `as="section"` with `aria-label` names it.',
    '[StudioLayout] holds its editor in one and [LogPanel] its lines and filter bar.',
  ],
  instead: '[Box] with `surface="sunken"` for a well without a toolbar; [Card] for a raised item with a heading.',
  playground: Playground,
  variants: [Editor, Plain],
  code: TOOL_FRAME_CODE,
});

export default meta;
export { Editor, Overview, Plain, Playground };
