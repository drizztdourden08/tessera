/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { ResizeHandle } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { EditorConsole } from './_samples/EditorConsole';
import { HudEditorRails } from './_samples/HudEditorRails';
import { RESIZE_HANDLE_STATES } from './_samples/resize-handle-states.constants';
import { RAILS, RESIZE_CODE, RESIZE_TEXT as T } from './_samples/resize-handle-story.constants';
import './ResizeHandle.stories.css';

type ResizeArgs = { step: number };

const meta = {
  title: 'Composites · Layout/ResizeHandle',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ResizeArgs>;

const Playground = {
  name: 'Playground',
  args: { step: 16 },
  argTypes: {
    step: { group: 'Behaviour', control: 'range', min: 4, max: 64, step: 4, description: 'Pixels an arrow key moves the line; Shift moves four times as far.' },
  },
  render: (args) => <HudEditorRails key={args.step} step={args.step} />,
} satisfies PlaygroundStory<ResizeArgs>;

const Rails = {
  name: 'The HUD editor rails',
  render: () => <HudEditorRails />,
} satisfies StoryLiteStoryDefinition<ResizeArgs>;

const Stacked = {
  name: 'A console under the editor',
  render: () => <EditorConsole />,
} satisfies StoryLiteStoryDefinition<ResizeArgs>;

const renderState = () => (
  <Box className="resize-story__editor resize-story__editor--state">
    <Box className="resize-story__canvas"><Text tone="dim">{T.outline}</Text></Box>
    <ResizeHandle
      label={`Resize ${T.outline}`}
      value={RAILS.outline.initial}
      min={RAILS.outline.min}
      max={RAILS.outline.max}
      onResize={() => undefined}
    />
    <Box className="resize-story__canvas"><Text tone="dim">{T.canvas}</Text></Box>
  </Box>
);

const Overview = overviewStory({
  component: 'ResizeHandle',
  description: 'The line between two panels that the user drags, or moves with the keys, to resize the panel beside it.',
  points: [
    'It draws one thin line, brightened a little on hover, focus and drag. SidePanel, SplitPane, ListDetailLayout, DockLayout and the DataTable column line all draw it.',
    '`usePaneSize` keeps a width in pixels between `min` and `max`, and in storage with `storageKey`.',
    'The arrow keys move it, [[Shift]] for bigger steps; [[Home]] and [[End]] jump to the limits.',
    '`fold` lets a drag past the end of the range, or an arrow key at the end, fold the pane; [[Enter]] folds and unfolds it, and a double click resets it.',
    '`edge="end"` is for a panel after the line, such as an inspector: dragging toward it shrinks it.',
  ],
  instead: '[SplitPane] when two panes share the room by ratio; [ListDetailLayout] for a list beside its detail.',
  playground: Playground,
  variants: [Rails, Stacked],
  states: {
    render: renderState,
    list: RESIZE_HANDLE_STATES,
  },
  code: RESIZE_CODE,
});

export default meta;
export { Overview, Playground, Rails, Stacked };
