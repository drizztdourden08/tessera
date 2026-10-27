/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { axis } from '../_template/axis';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { TrackTableAgents } from './_samples/TrackTableAgents';
import { TRACK_WIDTHS } from './_samples/track-table-agents.constants';
import type { TrackWidth } from './_samples/track-table-agents.type';

type TrackTableArgs = {
  width: TrackWidth;
};

const ARG_TYPES: PlaygroundArgTypes<TrackTableArgs> = {
  width: { group: 'Layout', control: 'select', options: [...TRACK_WIDTHS], description: 'The width of the table. Columns marked drop leave as it narrows: Last seen, then Tasks, then Node.' },
};

const meta = {
  title: 'Composites · Data views/TrackTable',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TrackTableArgs>;

const Playground = {
  name: 'Playground',
  args: { width: 'wide' },
  argTypes: ARG_TYPES,
  render: (args) => <TrackTableAgents width={args.width} />,
} satisfies PlaygroundStory<TrackTableArgs>;

const AsItNarrows = {
  name: 'The same table at four widths',
  render: () => (
    <Demonstrator rows={axis(TRACK_WIDTHS)} align="stretch" cell={(width) => <TrackTableAgents width={width} />} />
  ),
} satisfies StoryLiteStoryDefinition<TrackTableArgs>;

const Overview = overviewStory({
  component: 'TrackTable',
  description: 'A flat, read-only table that lays its columns out in fractions of the width and drops the least needed ones as it narrows.',
  points: [
    'Each column takes `fr`, its share of the width; the default is 1.',
    'Mark a column `drop` 1, 2 or 3 to hide it when the table is narrower than 768, 640 or 480 px. 1 leaves first.',
    'The narrowing follows the width of the table itself, not the window, so it works in a pane or a drawer.',
    'There is no card, border or background: put it in a [Card] or on the page.',
    '`head={false}` hides the header row; `empty` shows when there are no rows.',
  ],
  instead: '[DataTable] to sort, group, resize or select many rows, or [RowGrid] to edit rows in place.',
  playground: Playground,
  variants: [AsItNarrows],
});

export default meta;
export { AsItNarrows, Overview, Playground };
