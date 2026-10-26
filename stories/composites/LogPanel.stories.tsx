/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { LogPanel } from '../../src/composites';
import type { LogRow } from '../../src/composites';
import { createClause } from '../../src/data';
import type { FilterClause } from '../../src/data';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { LOG_KINDS, LOG_ROWS, longSession } from './_samples/data-log';
import { CHANNEL_KINDS, CHANNEL_ROWS } from './_samples/data-log-channels';
import { SIM_KINDS, SIM_ROWS } from './_samples/data-log-kinds';
import { LogArrivalDemo } from './_samples/LogArrivalDemo';
import { LogInputStatesDemo } from './_samples/LogInputStatesDemo';
import { LogSelectionDemo } from './_samples/LogSelectionDemo';
import { LogShellDemo } from './_samples/LogShellDemo';
import { LogTerminalDemo } from './_samples/LogTerminalDemo';
import './LogPanel.stories.css';

type LogPanelArgs = {
  toolbar: boolean;
  countLabel: string;
  emptyLabel: string;
};

type LogDemoProps = LogPanelArgs & { rows: readonly LogRow[]; startWith?: readonly FilterClause[] };

const NO_FILTERS: readonly FilterClause[] = [];

const LogDemo = (props: LogDemoProps) => {
  const { rows, toolbar, countLabel, emptyLabel, startWith = NO_FILTERS } = props;
  const [filters, setFilters] = useState<readonly FilterClause[]>(startWith);
  return (
    <Box className="log-panel-story">
      <LogPanel
        rows={rows}
        className="server-log"
        kinds={LOG_KINDS}
        filters={filters}
        onFiltersChange={setFilters}
        toolbar={toolbar}
        countLabel={countLabel}
        emptyLabel={emptyLabel}
      />
    </Box>
  );
};

const LONG_ROWS = longSession(1500);
const NO_ROWS: LogRow[] = [];
const PROBLEMS: readonly FilterClause[] = [createClause('kind', 'anyOf', ['Errors', 'Hints'])];

const TONED_ROWS: readonly LogRow[] = [
  { id: 'tone-1', gutter: '19:30:01', tag: 'JOIN', kind: 'join', message: 'Wren joined slot 1' },
  { id: 'tone-2', gutter: '19:30:09', tag: 'ITEM', kind: 'item', message: 'Disk usage is above 80 percent', tone: 'warning' },
  { id: 'tone-3', gutter: '19:30:15', tag: 'JOIN', kind: 'join', message: 'Tavi joined slot 3, the connection is unstable', tone: 'danger' },
  { id: 'tone-4', gutter: '19:30:20', tag: 'ITEM', kind: 'item', message: 'Backup finished', tone: 'success' },
];

const ARGS: Partial<LogPanelArgs> = { toolbar: true, countLabel: 'lines', emptyLabel: 'The server has not said anything yet.' };

const ARG_TYPES: PlaygroundArgTypes<LogPanelArgs> = {
    toolbar: { group: 'Content', control: 'boolean', description: 'Search, filters, the line count and Copy all' },
    countLabel: { group: 'Content', control: 'text' },
    emptyLabel: { group: 'Content', control: 'text' },
  };

const meta = {
  title: 'Composites · Content/LogPanel',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<LogPanelArgs>;

const ServerLog = {
  name: 'Server log',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LogDemo {...args} rows={LOG_ROWS} />,
} satisfies PlaygroundStory<LogPanelArgs>;

const Filtered = {
  name: 'Filtered to errors and hints',
  render: () => <LogDemo {...(ARGS as LogPanelArgs)} rows={LOG_ROWS} startWith={PROBLEMS} />,
} satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const LongSession = {
  name: 'Long session (1500 lines)',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">The newest 400 lines are mounted; scroll up to load older ones.</Text>
      <LogDemo {...(ARGS as LogPanelArgs)} rows={LONG_ROWS} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const Arriving = {
  name: 'Starts empty, rows arrive',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">A line arrives every 0.7 s; each one shows below the last, and past 400 the oldest go behind Load older.</Text>
      <LogArrivalDemo />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const NewestFirst = {
  name: 'Newest first, following the top',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">A line arrives every 0.7 s and lands at the top; scroll down to stop following, and Jump to top to follow again.</Text>
      <LogArrivalDemo order="newest-first" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const LineTones = {
  name: 'A tone on a single line, with or without a kind',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">The warning line has no kind tone of its own; the danger line overrides the tone of its kind.</Text>
      <LogPanel rows={TONED_ROWS} kinds={LOG_KINDS} height={200} toolbar={false} className="server-log" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const Selecting = {
  name: 'Rows you select and copy',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Click a row, Shift click another for the rows between, or use Up and Down with Shift.</Text>
      <LogSelectionDemo />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const BuildLog = { name: 'Coloured build log, streaming', render: () => <LogTerminalDemo /> } satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const Shell = { name: 'Terminal with an input row', render: () => <LogShellDemo /> } satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const InputStates = { name: 'Input kept on failure, and a disabled row', render: () => <LogInputStatesDemo /> } satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const Bare = {
  name: 'Without a toolbar',
  render: () => <LogDemo {...(ARGS as LogPanelArgs)} toolbar={false} rows={LOG_ROWS} />,
} satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const Heights = {
  name: 'A fixed height, and filling a box',
  render: () => (
    <Box className="story-row log-panel-story__heights">
      <Box className="story-column">
        <Text className="story-label">height={'{160}'}</Text>
        <LogPanel rows={LOG_ROWS} kinds={LOG_KINDS} height={160} toolbar={false} />
      </Box>
      <Box className="story-column">
        <Text className="story-label">height="fill" in a 224 px box</Text>
        <Box className="log-panel-story__box">
          <LogPanel rows={LOG_ROWS} kinds={LOG_KINDS} height="fill" toolbar={false} />
        </Box>
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const Kinds = {
  name: 'Fifteen kinds, as a simulator trace',
  render: () => <LogPanel rows={SIM_ROWS} kinds={SIM_KINDS} height={440} className="sim-log" />,
} satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const Channels = {
  name: 'A colour per channel',
  render: () => <LogPanel rows={CHANNEL_ROWS} kinds={CHANNEL_KINDS} height={200} toolbar={false} className="channel-log" />,
} satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const ONE_ROW = LOG_ROWS.slice(0, 3);

const renderState = (props: StateProps) => (
  <Box className="log-panel-story log-panel-story--state">
    <LogPanel
      rows={props.empty === true ? NO_ROWS : ONE_ROW}
      kinds={LOG_KINDS}
      className="server-log"
      countLabel="lines"
      emptyLabel="The server has not said anything yet."
    />
  </Box>
);

const CODE = `import { LogPanel } from '@drizztdourden08/tessera';

<LogPanel
  rows={rows}
  kinds={[
    { id: 'join', label: 'Joins', tone: 'info' },
    { id: 'error', label: 'Errors', tone: 'danger', toneMessage: true },
  ]}
  className="server-log"
  countLabel="lines"
/>`;

const Overview = overviewStory({
  component: 'LogPanel',
  description: 'A running log, such as a server log or a simulation trace, in one framed box with a filter toolbar.',
  points: [
    'Each row has a gutter, a tag, a `kind` and a message; `indent` nests it and `tone` colours one line.',
    'The toolbar is a [FilterBar]: search, filters on type, tag or message, a line count and Copy all.',
    '`kinds` give each type a `tone`, tint or hex colour; `toneMessage`, `strong` and `uppercase` set the message.',
    'Only the newest lines are mounted; `order` picks the end that stays in view, and a button returns to it.',
    '`selectedIds` with `onSelectionChange` picks rows: a click, [[Shift]] and a click, [[Up]] and [[Down]].',
    '`ansi` colours escape codes with tokens; `onInput` adds a prompt row, and [[Up]] and [[Down]] walk its history.',
  ],
  playground: ServerLog,
  variants: [Filtered, LongSession, Arriving, NewestFirst, LineTones, Selecting, BuildLog, Shell, InputStates, Bare, Heights, Kinds, Channels],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.log-panel__row' },
      { name: 'Empty', props: { empty: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { Arriving, Bare, BuildLog, Channels, Filtered, Heights, InputStates, Kinds, LineTones, LongSession, NewestFirst, Overview, Selecting, ServerLog, Shell };
