/* @layer stories @kind component */
import { TrackTable } from '../../../src/composites';
import type { TrackColumn } from '../../../src/composites';
import { Box, Status, Tag, Text } from '../../../src/primitives';
import { TRACK_AGENTS, TRACK_STATES } from './track-table-agents.constants';
import type { TrackAgent, TrackWidth } from './track-table-agents.type';
import '../TrackTable.stories.css';

const COLUMNS: readonly TrackColumn<TrackAgent>[] = [
  { id: 'name', label: 'Agent', fr: 2, cell: (agent) => <Text>{agent.name}</Text> },
  { id: 'state', label: 'State', fr: 1.2, cell: (agent) => <Status map={TRACK_STATES} value={agent.state} dot dotSize="lg" halo /> },
  { id: 'node', label: 'Node', fr: 1.4, drop: 3, cell: (agent) => <Tag pill dot color="primary">{agent.node}</Tag> },
  { id: 'tasks', label: 'Tasks', fr: 0.8, drop: 2, align: 'end', cell: (agent) => <Text>{agent.tasks}</Text> },
  { id: 'seen', label: 'Last seen', fr: 1.4, drop: 1, cell: (agent) => <Text variant="caption">{agent.seen}</Text> },
];

const TrackTableAgents = ({ width }: { width: TrackWidth }) => (
  <Box className={`track-story track-story--${width}`}>
    <TrackTable label="Agents" rows={TRACK_AGENTS} columns={COLUMNS} rowKey={(agent) => agent.id} />
  </Box>
);

export { TrackTableAgents };
