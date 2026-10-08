/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { ResizeHandle } from '../../src/composites';
import type { ResizeHandleLook } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { axis } from '../_template/axis';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { EditorConsole } from './_samples/EditorConsole';
import { HudEditorRails } from './_samples/HudEditorRails';
import { RESIZE_HANDLE_STATES } from './_samples/resize-handle-states.constants';
import { RAILS, RESIZE_CODE, RESIZE_TEXT as T } from './_samples/resize-handle-story.constants';
import './ResizeHandle.stories.css';

type ResizeArgs = { look: ResizeHandleLook };

const LOOKS = ['grip', 'line', 'ghost'] as const;

const meta = {
  title: 'Composites · Layout/ResizeHandle',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ResizeArgs>;

const Playground = {
  name: 'Playground',
  args: { look: 'grip' },
  argTypes: {
    look: { group: 'Appearance', control: 'select', options: [...LOOKS], description: 'grip between two panes, line where room is tight, ghost where the panes show their own edges.' },
  },
  render: (args) => <HudEditorRails key={args.look} look={args.look} />,
} satisfies PlaygroundStory<ResizeArgs>;

const Rails = {
  name: 'The HUD editor rails',
  render: () => <HudEditorRails />,
} satisfies StoryLiteStoryDefinition<ResizeArgs>;

const Looks = {
  name: 'Grip, line and ghost',
  render: () => <Demonstrator rows={axis(LOOKS)} align="stretch" cell={(look) => <HudEditorRails look={look} />} />,
} satisfies StoryLiteStoryDefinition<ResizeArgs>;

const Stacked = {
  name: 'A console under the editor',
  render: () => <EditorConsole />,
} satisfies StoryLiteStoryDefinition<ResizeArgs>;

const renderState = (props: StateProps) => (
  <Box className="resize-story__editor resize-story__editor--state">
    <Box className="resize-story__canvas"><Text tone="dim">{T.outline}</Text></Box>
    <ResizeHandle
      label={`Resize ${T.outline}`}
      value={RAILS.outline.initial}
      min={RAILS.outline.min}
      max={RAILS.outline.max}
      onResize={() => undefined}
      look={props.look === 'line' ? 'line' : 'grip'}
    />
    <Box className="resize-story__canvas"><Text tone="dim">{T.canvas}</Text></Box>
  </Box>
);

const Overview = overviewStory({
  component: 'ResizeHandle',
  description: 'The line between two panels that the user drags, or moves with the keys, to resize the panel beside it.',
  points: [
    'SplitPane, ListDetailLayout, DockLayout and the DataTable column line all draw it.',
    '`usePaneSize` keeps a width in pixels between `min` and `max`, and in storage with `storageKey`.',
    'The arrow keys move it, [[Shift]] for bigger steps; [[Home]] and [[End]] jump to the limits.',
    '[[Enter]] folds the pane when `onCollapse` is set, and resets it otherwise; a double click resets it.',
    '`edge="end"` is for a panel after the line, such as an inspector: dragging toward it shrinks it.',
  ],
  instead: '[SplitPane] when two panes share the room by ratio; [ListDetailLayout] for a list beside its detail.',
  playground: Playground,
  variants: [Rails, Looks, Stacked],
  states: {
    render: renderState,
    list: [
      ...RESIZE_HANDLE_STATES,
      { name: 'Line', props: { look: 'line' } },
    ],
  },
  code: RESIZE_CODE,
});

export default meta;
export { Looks, Overview, Playground, Rails, Stacked };
