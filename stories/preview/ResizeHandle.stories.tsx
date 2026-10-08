/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { axis } from '../_template/axis';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { PreviewCards } from './_shared/PreviewCards';
import type { ResizeHandleLook } from './ResizeHandle/ResizeHandle.type';
import { EditorRails } from './ResizeHandle/_samples/EditorRails';
import { RESIZE_CHOICES, RESIZE_CODE, RESIZE_MAPPING } from './ResizeHandle/_samples/resize-story.constants';
import './ResizeHandle.stories.css';

type ResizeArgs = { look: ResizeHandleLook };

const meta = {
  title: 'Preview · For approval/ResizeHandle',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ResizeArgs>;

const Playground = {
  name: 'Playground',
  args: { look: 'grip' },
  argTypes: { look: { group: 'Appearance', control: 'select', options: ['grip', 'line'], description: 'Grip between two panes; line where room is tight, such as a table header.' } },
  render: (args) => <EditorRails key={args.look} look={args.look} />,
} satisfies PlaygroundStory<ResizeArgs>;

const Editor = {
  name: 'The HUD layout editor rails, on ResizeHandle',
  render: () => <EditorRails />,
} satisfies StoryLiteStoryDefinition<ResizeArgs>;

const Looks = {
  name: 'Grip and line',
  render: () => <Demonstrator rows={axis(['grip', 'line'] as const)} align="stretch" cell={(look) => <EditorRails look={look} />} />,
} satisfies StoryLiteStoryDefinition<ResizeArgs>;

const Overview = overviewStory({
  component: 'ResizeHandle',
  description: 'For approval, not a released part: the seam you drag to resize the panel beside it, one for every layout.',
  points: [
    '**For approval:** this page lives in the gallery only; nothing on it ships until the owner picks an option.',
    'It is the divider SplitPane and ListDetailLayout already draw, made public with a size hook in pixels.',
    'Arrow keys move it, Shift for bigger steps, Home and End jump to the limits, Enter resets it.',
    '`edge="end"` is for a panel on the far side, such as an inspector: dragging toward it shrinks it.',
    '`look` is `grip` between two panes, or `line` where room is tight, such as a table header.',
  ],
  instead: '[SplitPane] when two panes share the room by ratio; [ListDetailLayout] for a list beside its detail.',
  playground: Playground,
  variants: [Editor, Looks],
  sections: [
    { title: 'Every seam in Tessera today', node: <PreviewCards entries={RESIZE_MAPPING} /> },
    { title: 'Options weighed', node: <PreviewCards entries={RESIZE_CHOICES} /> },
  ],
  code: RESIZE_CODE,
});

export default meta;
export { Editor, Looks, Overview, Playground };
