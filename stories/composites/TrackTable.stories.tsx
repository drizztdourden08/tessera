/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { axis } from '../_template/axis';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { TrackTableAgents } from './_samples/TrackTableAgents';
import { TrackTableSteps } from './_samples/TrackTableSteps';
import { TRACK_STEP_WIDTHS } from './_samples/track-table-steps.constants';
import { TRACK_WIDTHS } from './_samples/track-table-agents.constants';
import type { TrackWidth } from './_samples/track-table-agents.type';

type TrackTableArgs = {
  width: TrackWidth;
  clickable: boolean;
  tones: boolean;
  details: boolean;
};

const ARG_TYPES: PlaygroundArgTypes<TrackTableArgs> = {
  width: { group: 'Layout', control: 'select', options: [...TRACK_WIDTHS], description: 'The width of the table. Columns marked drop leave as it narrows: Last seen, then Tasks, then Node.' },
  clickable: { group: 'Behaviour', control: 'boolean', description: 'Pass onRowClick: each row takes focus, and Enter or a click opens its detail.' },
  tones: { group: 'Appearance', control: 'boolean', description: 'Pass rowTone: a stale agent is muted and a stalled one is warning.' },
  details: { group: 'Behaviour', control: 'boolean', description: 'Pass rowDetail: the opened row shows a full width line under it. Needs clickable.' },
};

const meta = {
  title: 'Composites · Data views/TrackTable',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TrackTableArgs>;

const Playground = {
  name: 'Playground',
  args: { width: 'wide', clickable: false, tones: false, details: false },
  argTypes: ARG_TYPES,
  render: (args) => <TrackTableAgents width={args.width} clickable={args.clickable} tones={args.tones} details={args.details} />,
} satisfies PlaygroundStory<TrackTableArgs>;

const AsItNarrows = {
  name: 'The same table at four widths',
  render: () => (
    <Demonstrator rows={axis(TRACK_WIDTHS)} align="stretch" cell={(width) => <TrackTableAgents width={width} />} />
  ),
} satisfies StoryLiteStoryDefinition<TrackTableArgs>;

const Interactive = {
  name: 'Rows you can open: focus a row, press Enter, and its detail shows under it',
  render: () => <TrackTableAgents width="wide" clickable details />,
} satisfies StoryLiteStoryDefinition<TrackTableArgs>;

const Toned = {
  name: 'Row tones: a stale agent is muted, a stalled one is warning',
  render: () => <TrackTableAgents width="wide" tones />,
} satisfies StoryLiteStoryDefinition<TrackTableArgs>;

const FixedWidths = {
  name: 'Fixed widths: State, Tasks and Last seen keep a set size, Agent and Node share the rest',
  render: () => <TrackTableAgents width="wide" fixed />,
} satisfies StoryLiteStoryDefinition<TrackTableArgs>;

const HostSteps = {
  name: 'Host steps: hideBelow 1280, 1120, 896 and 768 hide a column each, and its track goes with it',
  render: () => (
    <Demonstrator rows={axis(TRACK_STEP_WIDTHS)} align="stretch" cell={(width) => <TrackTableSteps width={width} />} />
  ),
} satisfies StoryLiteStoryDefinition<TrackTableArgs>;

const Overview = overviewStory({
  component: 'TrackTable',
  description: 'A flat, read-only table that lays its columns out in fractions of the width and drops the least needed ones as it narrows.',
  points: [
    'Each column takes `fr`, its share of the width (default 1), or `width`, a fixed size token name or CSS length.',
    'Mark a column `drop` 1, 2 or 3 to hide it below 768, 640 or 480 px; `hideBelow` picks a width from 1280 to 480.',
    'The narrowing follows the width of the table itself, not the window, so it works in a pane or a drawer.',
    'No card, border or background: put it in a [Card] or on the page; `head={false}` hides the header.',
    '`onRowClick(row)` makes a row a focus target that Enter and a click both use.',
    '`rowDetail(row)` draws a full width row under its row; `rowTone(row)` tints it like `rowState` of [DataTable].',
  ],
  instead: '[DataTable] to sort, group, resize or select many rows, or [RowGrid] to edit rows in place.',
  playground: Playground,
  variants: [AsItNarrows, HostSteps, FixedWidths, Interactive, Toned],
});

export default meta;
export { AsItNarrows, FixedWidths, HostSteps, Interactive, Overview, Playground, Toned };
