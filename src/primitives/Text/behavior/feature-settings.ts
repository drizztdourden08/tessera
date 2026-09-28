/* @layer renderer-components @kind logic */
import { TYPE_FEATURES } from '../../type-features/type-features.constants';
import type { TypeFeature } from '../../type-features/type-features.type';

const featureSettings = (features: readonly TypeFeature[]): string =>
  features.map((feature) => `'${TYPE_FEATURES[feature].tag}' 1`).join(', ');

export { featureSettings };
