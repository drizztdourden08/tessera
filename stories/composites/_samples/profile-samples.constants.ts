/* @layer stories @kind data */
import type { SampleProfile } from './profile-samples.type';

const PROFILE_GAMES = [
  { value: 'alttp', label: 'A Link to the Past' },
  { value: 'ts', label: 'Timespinner' },
  { value: 'oot', label: 'Ocarina of Time' },
];

const PROFILE_TEMPLATES = [
  { value: 'blank', label: 'Blank' },
  { value: 'race', label: 'Race settings' },
  { value: 'casual', label: 'Casual' },
];

const PROFILES: readonly SampleProfile[] = [
  { id: 'pr1', name: 'Weekly async', game: 'alttp', template: 'race' },
  { id: 'pr2', name: 'Casual run', game: 'alttp', template: 'casual' },
  { id: 'pr3', name: 'First clear', game: 'ts', template: 'blank' },
];

export { PROFILE_GAMES, PROFILE_TEMPLATES, PROFILES };
