/* @layer stories @kind data */
import type { ReferencedByHit, WizardStep } from '../../../src/composites';
import type { FieldDescriptor, SchemaConfig } from '../../../src/data';

const PRESET_HITS: readonly ReferencedByHit[] = [
  { kind: 'Session', id: 'ses-0412', field: 'preset', label: 'Friday async' },
  { kind: 'Session', id: 'ses-0420', field: 'preset', label: 'Community night' },
  { kind: 'Session', id: 'ses-0398', field: 'preset', label: 'Practice room' },
  { kind: 'Schedule', id: 'sch-0007', field: 'defaultPreset', label: 'Weekly league slot' },
];

const SESSION_SCHEMA: readonly FieldDescriptor[] = [
  { path: 'name', label: 'Session name', kind: 'string', optional: false, group: 'basics' },
  { path: 'preset', label: 'Game preset', kind: 'enum', optional: false, options: ['Casual', 'Short', 'Tournament'], group: 'basics' },
  { path: 'maxPlayers', label: 'Player limit', kind: 'number', optional: false, group: 'hosting' },
  { path: 'port', label: 'Port', kind: 'number', optional: true, group: 'hosting' },
  { path: 'password', label: 'Room password', kind: 'string', optional: true, group: 'hosting' },
  { path: 'allowSpectators', label: 'Allow spectators', kind: 'boolean', optional: true, group: 'hosting' },
];

const SESSION_CONFIG: SchemaConfig = {
  groups: [
    { id: 'basics', label: 'Basics', paths: ['name', 'preset'] },
    { id: 'hosting', label: 'Hosting', paths: ['maxPlayers', 'port', 'password', 'allowSpectators'] },
  ],
};

const INITIAL_SESSION: Record<string, unknown> = { name: '', preset: 'Casual', maxPlayers: 8 };
const REQUIRED_PATHS: readonly string[] = ['name', 'preset', 'maxPlayers'];

const WIZARD_STEPS: WizardStep[] = [
  { label: 'Game preset' },
  { label: 'Players' },
  { label: 'Server' },
  { label: 'Review' },
];

export { INITIAL_SESSION, PRESET_HITS, REQUIRED_PATHS, SESSION_CONFIG, SESSION_SCHEMA, WIZARD_STEPS };
