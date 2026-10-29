/* @layer stories @kind component */
import { useState } from 'react';
import { TrackTable } from '../../../src/composites';
import type { TrackColumn } from '../../../src/composites';
import { Box, Status, Tag, Text } from '../../../src/primitives';
import { TRACK_AGENTS, TRACK_STATES, TRACK_TONES } from './track-table-agents.constants';
import type { TrackAgent, TrackTableAgentsProps } from './track-table-agents.type';
import '../TrackTable.stories.css';

const COLUMNS: readonly TrackColumn<TrackAgent>[] = [
  { id: 'name', label: 'Agent', fr: 2, cell: (agent) => <Text>{agent.name}</Text> },
  { id: 'state', label: 'State', fr: 1.2, cell: (agent) => <Status map={TRACK_STATES} value={agent.state} dot dotSize="lg" halo /> },
  { id: 'node', label: 'Node', fr: 1.4, drop: 3, cell: (agent) => <Tag pill dot color="primary">{agent.node}</Tag> },
  { id: 'tasks', label: 'Tasks', fr: 0.8, drop: 2, align: 'end', cell: (agent) => <Text>{agent.tasks}</Text> },
  { id: 'seen', label: 'Last seen', fr: 1.4, drop: 1, cell: (agent) => <Text variant="caption">{agent.seen}</Text> },
];

const FIXED_WIDTHS: Readonly<Record<string, string>> = { state: 'size-96', tasks: 'size-64', seen: '8rem' };

const FIXED_COLUMNS: readonly TrackColumn<TrackAgent>[] = COLUMNS.map((column) => ({ ...column, width: FIXED_WIDTHS[column.id] }));

const TrackTableAgents = ({ width, clickable = false, tones = false, details = false, fixed = false }: TrackTableAgentsProps) => {
  const [opened, setOpened] = useState<string | null>(null);
  return (
    <Box className={`track-story track-story--${width}`}>
      <TrackTable
        label="Agents"
        rows={TRACK_AGENTS}
        columns={fixed ? FIXED_COLUMNS : COLUMNS}
        rowKey={(agent) => agent.id}
        onRowClick={clickable ? (agent) => setOpened(opened === agent.id ? null : agent.id) : undefined}
        rowDetail={details ? (agent) => (opened === agent.id ? <Text variant="caption">{`${agent.name} runs ${agent.tasks} tasks on ${agent.node}.`}</Text> : null) : undefined}
        rowTone={tones ? (agent) => TRACK_TONES[agent.age] : undefined}
      />
    </Box>
  );
};

export { TrackTableAgents };
