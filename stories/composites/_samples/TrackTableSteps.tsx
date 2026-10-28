/* @layer stories @kind component */
import { TrackTable } from '../../../src/composites';
import type { TrackColumn } from '../../../src/composites';
import { Box, Status, Tag, Text } from '../../../src/primitives';
import { TRACK_AGENTS, TRACK_STATES } from './track-table-agents.constants';
import type { TrackAgent } from './track-table-agents.type';
import type { TrackStepWidth } from './track-table-steps.constants';
import '../TrackTable.stories.css';

const STEP_COLUMNS: readonly TrackColumn<TrackAgent>[] = [
  { id: 'name', label: 'Agent', fr: 2, cell: (agent) => <Text>{agent.name}</Text> },
  { id: 'state', label: 'State', hideBelow: 768, cell: (agent) => <Status map={TRACK_STATES} value={agent.state} dot dotSize="lg" halo /> },
  { id: 'node', label: 'Node', hideBelow: 896, cell: (agent) => <Tag pill dot color="primary">{agent.node}</Tag> },
  { id: 'tasks', label: 'Tasks', hideBelow: 1120, align: 'end', cell: (agent) => <Text>{agent.tasks}</Text> },
  { id: 'seen', label: 'Last seen', hideBelow: 1280, cell: (agent) => <Text variant="caption">{agent.seen}</Text> },
];

const TrackTableSteps = ({ width }: { width: TrackStepWidth }) => (
  <Box className={`track-story track-story--step-${width}`}>
    <TrackTable label="Agents" rows={TRACK_AGENTS} columns={STEP_COLUMNS} rowKey={(agent) => agent.id} />
  </Box>
);

export { TrackTableSteps };
