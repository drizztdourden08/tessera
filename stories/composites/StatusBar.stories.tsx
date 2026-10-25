/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { StatusBar } from '../../src/composites';
import { axis } from '../_template/axis';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { pixelEditorItems, STATUS_BAR_ACTIONS, STATUS_BAR_ARGS } from './_samples/status-bar-sample';
import type { StatusBarSampleArgs } from './_samples/status-bar-sample.type';
import './StatusBar.stories.css';

const ARG_TYPES: PlaygroundArgTypes<StatusBarSampleArgs> = {
  cursor: { group: 'Value', control: 'text', description: 'Numbers line up in columns, so x and y do not jitter.' },
  zoom: { group: 'Value', control: 'text' },
  colour: { group: 'Value', control: 'color', description: 'Also drives the swatch passed as `swatch`.' },
  size: { group: 'Content', control: 'text' },
  layer: { group: 'Content', control: 'text' },
  frame: { group: 'Content', control: 'text' },
};

const meta = {
  title: 'Composites · Layout/StatusBar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StatusBarSampleArgs>;

const Playground = {
  name: 'Playground',
  args: STATUS_BAR_ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatusBar label="Editor status" items={pixelEditorItems(args)} actions={STATUS_BAR_ACTIONS} />,
} satisfies PlaygroundStory<StatusBarSampleArgs>;

const PixelEditor = {
  name: 'Pixel editor bar',
  render: () => <StatusBar label="Editor status" items={pixelEditorItems(STATUS_BAR_ARGS)} />,
} satisfies StoryLiteStoryDefinition<StatusBarSampleArgs>;

const WithActions = {
  name: 'Actions at the end of the bar',
  render: () => (
    <StatusBar label="Editor status" items={pixelEditorItems(STATUS_BAR_ARGS)} actions={STATUS_BAR_ACTIONS} />
  ),
} satisfies StoryLiteStoryDefinition<StatusBarSampleArgs>;

const Narrow = {
  name: 'Narrow: items drop by priority',
  render: () => (
    <Demonstrator
      rows={axis(['wide', 'medium', 'narrow'] as const)}
      align="start"
      cell={(width) => <StatusBar className={`status-bar-story--${width}`} label="Editor status" items={pixelEditorItems(STATUS_BAR_ARGS)} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<StatusBarSampleArgs>;

const Overview = overviewStory({
  component: 'StatusBar',
  description: 'The thin bar at the foot of an editor window: labelled readouts such as cursor, zoom and colour.',
  points: [
    '`items` are the readouts: a `label`, a `value`, and optionally an `icon`, a `swatch`, a `tone` and a `title`.',
    '`align` puts an item at the start or the end; a `swatch` is a CSS colour drawn as a small chip.',
    '`priority` 1 to 3 drops an item when the bar is narrow, 3 first; items without it stay.',
    'Values use tabular numbers, so a cursor x,y does not jitter; long text ends in an ellipsis.',
    '`actions` end the bar as ghost icon buttons with a tooltip; each takes `loading` and `disabled`.',
    'It is a labelled region, not a live region, so pointer moves are never announced; put it last in the window.',
  ],
  instead: '[StatRow] for one label and value on a line; [SaveBar] for the buttons at the foot of a form.',
  playground: Playground,
  variants: [PixelEditor, WithActions, Narrow],
  code: false,
});

export default meta;
export { Narrow, Overview, PixelEditor, Playground, WithActions };
