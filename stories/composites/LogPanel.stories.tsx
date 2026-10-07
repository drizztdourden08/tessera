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
import { LogArrivalDemo } from './_samples/LogArrivalDemo';
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
    'Each of the `rows` has a gutter, a tag, a `kind` and a message; `indent` nests it under a guide.',
    'The toolbar is a [FilterBar]: search, filters on type, tag or message, a line count and Copy all.',
    '`kinds` gives each type a `tone`; `toneMessage` colours the message too, as for errors.',
    'Only the newest lines are mounted and older ones load on demand, so a long session stays fast.',
    'A Newest button shows once the user scrolls away from the end.',
    '`height="fill"` takes the height of its parent; a number fixes it in pixels.',
  ],
  playground: ServerLog,
  variants: [Filtered, LongSession, Arriving, Bare, Heights],
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
export { Arriving, Bare, Filtered, Heights, LongSession, Overview, ServerLog };
