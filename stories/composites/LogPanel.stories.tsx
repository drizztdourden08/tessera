/* @layer stories @kind story */
import { useMemo, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { LogPanel } from '../../src/composites';
import type { LogRow } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { LOG_KINDS, LOG_ROWS, logAsText, longSession } from './_samples/data-log';
import './LogPanel.stories.css';

type LogPanelArgs = {
  showKindFilter: boolean;
  showSearch: boolean;
  showCopy: boolean;
  countLabel: string;
  emptyLabel: string;
};

type LogDemoProps = LogPanelArgs & { rows: LogRow[] };

const LogDemo = (props: LogDemoProps) => {
  const { rows, showKindFilter, showSearch, showCopy, countLabel, emptyLabel } = props;
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set());
  const [search, setSearch] = useState('');
  const shown = useMemo(() => rows.filter((row) => !hidden.has(row.kind)), [rows, hidden]);
  const toggleKind = (kind: string) => setHidden((prev) => {
    const next = new Set(prev);
    if (next.has(kind)) next.delete(kind);
    else next.add(kind);
    return next;
  });

  return (
    <Box className="log-panel-story">
      <LogPanel
        rows={shown}
        className="server-log"
        kinds={showKindFilter ? LOG_KINDS : undefined}
        hidden={hidden}
        onToggleKind={toggleKind}
        search={search}
        onSearchChange={showSearch ? setSearch : undefined}
        copyText={showCopy ? () => logAsText(shown) : undefined}
        countLabel={countLabel}
        emptyLabel={emptyLabel}
      />
    </Box>
  );
};

const LONG_ROWS = longSession(1500);
const NO_ROWS: LogRow[] = [];

const ARGS: Partial<LogPanelArgs> = {
    showKindFilter: true, showSearch: true, showCopy: true, countLabel: 'lines', emptyLabel: 'The server has not said anything yet.',
  };

const ARG_TYPES: StoryLiteArgTypes<LogPanelArgs> = {
    showKindFilter: { control: 'boolean' },
    showSearch: { control: 'boolean' },
    showCopy: { control: 'boolean' },
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

const LongSession = {
  name: 'Long session (1500 lines)',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LogDemo {...args} rows={LONG_ROWS} />,
} satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const Empty = {
  name: 'Empty',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LogDemo {...args} rows={NO_ROWS} />,
} satisfies StoryLiteStoryDefinition<LogPanelArgs>;

const CODE = `import { LogPanel } from '@drizztdourden08/tessera';

const [search, setSearch] = useState('');

<LogPanel
  rows={rows}
  className="server-log"
  search={search}
  onSearchChange={setSearch}
  copyText={() => logAsText(rows)}
  countLabel="lines"
/>`;

const Overview = overviewStory({
  component: 'LogPanel',
  description: 'A log view styled like a code editor: a gutter column, then a type tag and a message on each line, indented for nested lines. Reach for it for a running log, such as a server log or a simulation trace, and colour each type through a class of your own. The toolbar shows a line count, plus a type filter, a search box and a copy button when the caller wires them. Only the newest lines are mounted and older ones load on demand, so a long session stays fast.',
  playground: ServerLog,
  variants: [ServerLog, Empty],
  code: CODE,
});

export default meta;
export { Empty, LongSession, Overview, ServerLog };
