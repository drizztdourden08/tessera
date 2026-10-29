/* @layer stories @kind data */
import { defineStatuses } from '../../../src/primitives';
import type { TrackRowTone } from '../../../src/composites';
import type { TrackAgent, TrackWidth } from './track-table-agents.type';

const TRACK_AGENTS: readonly TrackAgent[] = [
  { id: 'a1', name: 'Seed roller', state: 'up', node: 'node-east', tasks: 12, seen: '2 min ago', age: 'fresh' },
  { id: 'a2', name: 'Tracker sync', state: 'busy', node: 'node-east', tasks: 41, seen: 'just now', age: 'fresh' },
  { id: 'a3', name: 'Patch builder', state: 'up', node: 'node-west', tasks: 3, seen: '8 min ago', age: 'stale' },
  { id: 'a4', name: 'Rom checker', state: 'down', node: 'node-west', tasks: 0, seen: '3 h ago', age: 'stalled' },
];

const TRACK_STATES = defineStatuses({
  up: { label: 'Online', tone: 'success' },
  busy: { label: 'Working', tone: 'warning', pulse: true },
  down: { label: 'Offline', tone: 'danger' },
});

const TRACK_WIDTHS: readonly TrackWidth[] = ['wide', 'medium', 'narrow', 'tiny'];

const TRACK_TONES: Readonly<Record<TrackAgent['age'], TrackRowTone | undefined>> = {
  fresh: undefined,
  stale: 'muted',
  stalled: 'warning',
};

export { TRACK_AGENTS, TRACK_STATES, TRACK_TONES, TRACK_WIDTHS };
