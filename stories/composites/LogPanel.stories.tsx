/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { LogPanel } from '../../src/composites';
import type { LogRow } from '../../src/composites';
import { createClause } from '../../src/data';
import type { FilterClause } from '../../src/data';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { LOG_KINDS, LOG_ROWS, longSession } from './_samples/data-log';
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

const ARG_TYPES: StoryLiteArgTypes<LogPanelArgs> = {
    toolbar: { control: 'boolean', description: 'Search, filters, the line count and Copy all' },
    countLabel: { control: 'text' },
    emptyLabel: { control: 'text' },
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
} satisfies StoryLiteStoryDefinition<LogPanelArgs>;

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

const Bare = {
  name: 'Without a toolbar',
  render: () => <LogDemo {...(ARGS as LogPanelArgs)} toolbar={false} rows={LOG_ROWS} />,
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
  description: 'A log view styled like a code editor, in one framed box: a toolbar on top, then a gutter column, a type tag and a message on each line, indented under a guide for nested lines. Reach for it for a running log, such as a server log or a simulation trace. The toolbar is a FilterBar: a search box, a + that adds filters on the type, the tag or the message, then the line count and Copy all, which copies the lines in view. Give each type a tone: the tag takes the tone, and toneMessage colours the message too, as for errors. Only the newest lines are mounted and older ones load on demand, so a long session stays fast, and a Newest button shows once you scroll away from the end.',
  playground: ServerLog,
  variants: [Filtered, LongSession, Bare],
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
export { Bare, Filtered, LongSession, Overview, ServerLog };
