/* @layer stories @kind data */
import type { SwatchGroup } from '../../../src/composites/ColorPicker';

type TeamColour = { id: string; name: string; hex: string };

const TEAMS: readonly TeamColour[] = [
  { id: 'team-1', name: 'Harbor', hex: '#3f8fd2' },
  { id: 'team-2', name: 'Lanterns', hex: '#e0a13c' },
  { id: 'team-3', name: 'Moss', hex: '#4f9d5b' },
  { id: 'team-4', name: 'Ember', hex: '#d0513f' },
];

const SWATCH_GROUPS: readonly SwatchGroup[] = [
  { label: 'Team defaults', colors: TEAMS.map((team) => team.hex) },
  { label: 'High contrast', colors: ['#ffffff', '#ffd400', '#00d1ff', '#ff4fd8', '#7cff4f', '#000000'] },
];

export { SWATCH_GROUPS, TEAMS };
export type { TeamColour };
