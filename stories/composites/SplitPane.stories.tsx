/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SplitPane } from '../../src/composites';
import type { CollapsedSide, SplitOrientation } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { EditorSplit, FilesSplit } from './_samples/SplitPaneDemos';
import type { SplitSettings } from './_samples/SplitPaneDemos';
import './SplitPane.stories.css';

type SplitArgs = {
  orientation: SplitOrientation;
  defaultRatio: number;
  minRatio: number;
  maxRatio: number;
  snapAt: number;
  defaultCollapsed: CollapsedSide;
};

const HOW_TO = 'Drag the bar between the panes to resize them. Once it has focus the arrow keys move it, and a double-click resets it';

const SplitFrame = (props: { settings: SplitSettings; scene: 'files' | 'editor' }) => {
  const { settings, scene } = props;
  const key = Object.values(settings).join('-');
  return (
    <Box className="story-column">
      <Text className="story-label">{HOW_TO}</Text>
      <Box className="story-frame split-pane-story__frame">
        {scene === 'files' ? <FilesSplit key={key} {...settings} /> : <EditorSplit key={key} {...settings} />}
      </Box>
    </Box>
  );
};

const ARGS: Partial<SplitArgs> = {
  orientation: 'horizontal', defaultRatio: 0.34, minRatio: 0.2, maxRatio: 0.8, snapAt: 0.14, defaultCollapsed: 'none',
};

const ARG_TYPES: PlaygroundArgTypes<SplitArgs> = {
    defaultRatio: { group: 'Value', control: 'range', min: 0, max: 1, step: 0.05 },
    minRatio: { group: 'Value', control: 'range', min: 0, max: 1, step: 0.05 },
    maxRatio: { group: 'Value', control: 'range', min: 0, max: 1, step: 0.05 },
    snapAt: { group: 'Value', control: 'range', min: 0, max: 1, step: 0.05 },
    orientation: { group: 'Layout', control: 'select', options: ['horizontal', 'vertical'] },
    defaultCollapsed: { group: 'State', control: 'select', options: ['none', 'start', 'end'] },
  };

const EDITOR_ARG_TYPES: PlaygroundArgTypes<SplitArgs> = {
  minRatio: ARG_TYPES.minRatio,
  maxRatio: ARG_TYPES.maxRatio,
  snapAt: ARG_TYPES.snapAt,
  defaultCollapsed: ARG_TYPES.defaultCollapsed,
};

const meta = {
  title: 'Composites · Layout/SplitPane',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SplitArgs>;

const Playground = {
  name: 'Files and preview',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SplitFrame scene="files" settings={args} />,
} satisfies PlaygroundStory<SplitArgs>;

const EditorAndConsole = {
  name: 'Editor and console',
  args: ARGS,
  argTypes: EDITOR_ARG_TYPES,
  render: (args) => <SplitFrame scene="editor" settings={{ ...args, orientation: 'vertical', defaultRatio: 0.7 }} />,
} satisfies PlaygroundStory<SplitArgs>;

const renderState = (props: StateProps) => (
  <Box className="story-frame split-pane-story__state">
    <SplitPane
      start={<Text className="story-label">Files</Text>}
      end={<Text className="story-label">Preview</Text>}
      startLabel="files"
      endLabel="preview"
      defaultRatio={0.5}
      defaultCollapsed={props.collapsed === true ? 'start' : 'none'}
    />
  </Box>
);

const CODE = `import { SplitPane } from '@drizztdourden08/tessera';

<SplitPane
  start={<FileList />}
  end={<FilePreview />}
  defaultRatio={0.34}
  startLabel="files"
  endLabel="preview"
/>

<SplitPane
  orientation="vertical"
  start={<Editor />}
  end={<Console />}
  defaultRatio={0.7}
  minRatio={0.3}
  startLabel="editor"
  endLabel="console"
/>`;

const Overview = overviewStory({
  component: 'SplitPane',
  description: 'Two panes that share a space, with a bar between them the user drags to give either one more room. Reach for it when both views matter but their balance depends on the task, such as a file list beside a preview or an editor above its console. The bar shows a thin line with a grip in the middle and lights up under the pointer. `orientation` puts the panes side by side or one above the other, and `minRatio` and `maxRatio` keep both panes usable. Dragging a pane past the snap point hides it and leaves a labelled rail that brings it back on a click or a drag. The bar takes the arrow keys (Shift for bigger steps), Home and End, and a double-click or Enter resets it. It fills its parent, so the parent needs a size.',
  playground: Playground,
  variants: [EditorAndConsole],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.split-pane__divider' },
      { ...STATE.focus, target: '.split-pane__divider' },
      { ...STATE.active, name: 'Dragging', target: '.split-pane__divider' },
      { name: 'Collapsed', props: { collapsed: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { EditorAndConsole, Overview, Playground };
