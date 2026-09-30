/* @layer stories @kind constants */
import type { TypeFeatureGroup } from '../../src/primitives';
import type { DemonstratorAxis } from '../_template/Demonstrator.type';

const FEATURE_GROUP_TITLES: Record<TypeFeatureGroup, string> = {
  numerals: 'Numerals',
  position: 'Position',
  forms: 'Forms and ligatures',
  stylistic: 'Stylistic sets',
  character: 'Character variants',
};

const FEATURE_COLUMNS: readonly DemonstratorAxis<'prop' | 'off' | 'on'>[] = [
  { key: 'prop', label: 'Prop' },
  { key: 'off', label: 'Off' },
  { key: 'on', label: 'On' },
];

export { FEATURE_COLUMNS, FEATURE_GROUP_TITLES };
