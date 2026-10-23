/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { LayersList } from './_samples/LayersList';
import { LAYERS_ARG_TYPES, LAYERS_ARGS, LAYERS_CODE } from './_samples/layers-story.constants';
import type { LayerSet, LayersArgs } from './_samples/layers-story.type';
import './ReorderList.stories.css';

const meta = {
  title: 'Composites · Lists/ReorderList',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<LayersArgs>;

const Playground = {
  name: 'Playground',
  args: LAYERS_ARGS,
  argTypes: LAYERS_ARG_TYPES,
  render: (args) => <LayersList key={`${args.layers}-${String(args.toggles)}`} layers={args.layers} toggles={args.toggles} />,
} satisfies PlaygroundStory<LayersArgs>;

const Layers = {
  name: 'The layers of a drawing, live: select, drag the grip, flip visible and locked',
  render: () => <LayersList />,
} satisfies StoryLiteStoryDefinition<LayersArgs>;

const LongList = {
  name: 'Forty layers in a box that scrolls',
  render: () => <LayersList layers="forty" tall />,
} satisfies StoryLiteStoryDefinition<LayersArgs>;

const OrderOnly = {
  name: 'Order only, with no toggles',
  render: () => <LayersList toggles={false} />,
} satisfies StoryLiteStoryDefinition<LayersArgs>;

const STATE_SETS: readonly { name: string; layers: LayerSet }[] = [
  { name: 'filled', layers: 'six' },
  { name: 'empty', layers: 'none' },
];

const Overview = overviewStory({
  component: 'ReorderList',
  description: 'A list the user puts in order by drag or keys, with on and off icons on each row, such as drawing layers.',
  points: [
    'The app keeps the items: `onMove` gets the old and the new index, and the list draws what it is given.',
    '`toggles` describes the icons once; each item holds its own state in `toggles`, and `onToggle` flips it.',
    'Drag the grip, or press [[Alt+Up]] or [[Alt+Down]] on a row. A move is announced and focus stays put.',
    'Arrows, [[Home]] and [[End]] move focus; [[Space]] or [[Enter]] selects. `selectedId` marks the open item.',
    'A toggle is an icon button named by its label, with aria-pressed set to its state.',
  ],
  instead: '[RowGrid] for rows with inputs to edit, or [ListItemRow] for rows whose order is fixed.',
  playground: Playground,
  variants: [Layers, LongList, OrderOnly],
  states: {
    render: (props: StateProps) => <LayersList layers={(props.layers as LayerSet | undefined) ?? 'six'} />,
    list: STATE_SETS.map(({ name, layers }) => ({ name, props: { layers } })),
  },
  code: LAYERS_CODE,
});

export default meta;
export { Layers, LongList, Overview, OrderOnly, Playground };
