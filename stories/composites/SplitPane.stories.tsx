/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SplitPane } from '../../src/composites';
import type { CollapsedSide, SplitOrientation } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { EditorSplit, FilesSplit } from './_samples/SplitPaneDemos';
import type { SplitSettings } from './_samples/SplitPaneDemos';
import { RESIZE_HANDLE_STATES } from './_samples/resize-handle-states.constants';
import './SplitPane.stories.css';

type SplitArgs = {
  orientation: SplitOrientation;
  defaultRatio: number;
  minRatio: number;
  maxRatio: number;
  collapsible: boolean;
  defaultCollapsed: CollapsedSide;
};

const HOW_TO = 'Drag the line between the panes to resize them; pull a pane narrower than its minimum and it folds to a rail, then drag the rail outward to open it. Once the line has focus the arrow keys move it, and a double-click resets it';

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
  orientation: 'horizontal', defaultRatio: 0.34, minRatio: 0.2, maxRatio: 0.8, collapsible: true, defaultCollapsed: 'none',
};

const ARG_TYPES: PlaygroundArgTypes<SplitArgs> = {
    defaultRatio: { group: 'Value', control: 'range', min: 0, max: 1, step: 0.05 },
    minRatio: { group: 'Value', control: 'range', min: 0, max: 1, step: 0.05 },
    maxRatio: { group: 'Value', control: 'range', min: 0, max: 1, step: 0.05 },
    collapsible: { group: 'Behaviour', control: 'boolean', description: 'A pane dragged past its minimum folds to a rail, and a round button beside the bar folds it too.' },
    orientation: { group: 'Layout', control: 'select', options: ['horizontal', 'vertical'] },
    defaultCollapsed: { group: 'State', control: 'select', options: ['none', 'start', 'end'] },
  };

const EDITOR_ARG_TYPES: PlaygroundArgTypes<SplitArgs> = {
  minRatio: ARG_TYPES.minRatio,
  maxRatio: ARG_TYPES.maxRatio,
  collapsible: ARG_TYPES.collapsible,
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
  description: 'Two panes with a bar between them that the user drags to give either one more room.',
  points: [
    '`orientation` puts the panes side by side or one above the other.',
    '`minRatio` and `maxRatio` keep both panes usable; `defaultRatio` sets the first split.',
    'A pane pulled under its minimum, or an arrow key at the end, folds to a rail; drag the rail out to open.',
    'A round [CollapseToggle] beside the line folds either pane too; `collapsible={false}` drops folding.',
    'The line takes the arrow keys, [[Home]] and [[End]]; [[Enter]] folds or opens a pane and a double click resets it.',
    '**The parent needs a size:** the split fills it.',
  ],
  playground: Playground,
  variants: [EditorAndConsole],
  states: {
    render: renderState,
    list: [
      ...RESIZE_HANDLE_STATES,
      { name: 'Collapsed', props: { collapsed: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { EditorAndConsole, Overview, Playground };
