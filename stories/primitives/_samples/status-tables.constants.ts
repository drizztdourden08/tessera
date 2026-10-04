/* @layer stories @kind data */
import { defineStatuses } from '../../../src/primitives';

const SESSION_STATUSES = defineStatuses({
  draft: { label: 'Draft', tone: 'neutral' },
  generating: { label: 'Generating', tone: 'warning', pulse: true },
  starting: { label: 'Starting', tone: 'warning', pulse: true },
  hosting: { label: 'Hosting', tone: 'success' },
  stopped: { label: 'Stopped', tone: 'neutral' },
  failed: { label: 'Failed', tone: 'danger' },
});

const ENGINE_STATES = defineStatuses({
  ready: { label: 'Ready', tone: 'success', icon: 'circle-check' },
  building: { label: 'Setting up', tone: 'warning', icon: 'loader-circle', pulse: true },
  missing: { label: 'Not set up', tone: 'neutral', icon: 'circle' },
  failed: { label: 'Broken', tone: 'danger', icon: 'circle-x' },
  unknown: { label: 'Checking', tone: 'neutral', icon: 'circle-help' },
});

const PLAYER_STATUSES = defineStatuses({
  offline: { label: 'Offline', tone: 'danger' },
  connected: { label: 'Connected', tone: 'neutral' },
  ready: { label: 'Ready', tone: 'warning' },
  playing: { label: 'Playing', tone: 'success' },
  goal: { label: 'Goal', tone: 'success', icon: 'trophy' },
});

export { ENGINE_STATES, PLAYER_STATUSES, SESSION_STATUSES };
