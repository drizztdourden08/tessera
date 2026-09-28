/* @layer renderer-components @kind types */
import type { TYPE_FEATURES } from './type-features.constants';

type TypeFeatureGroup = 'numerals' | 'position' | 'forms' | 'stylistic' | 'character';

interface TypeFeatureInfo {
  tag: string;
  label: string;
  group: TypeFeatureGroup;
  sample: string;
}

type TypeFeature = keyof typeof TYPE_FEATURES;

export type { TypeFeature, TypeFeatureGroup, TypeFeatureInfo };
