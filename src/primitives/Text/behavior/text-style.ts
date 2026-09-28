/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';
import { featureSettings } from './feature-settings';
import { OPSZ_TOKENS } from './text-style.constants';
import type { OpticalSize, Typesetting } from './text-style.type';

const opszValue = (opticalSize: Exclude<OpticalSize, 'auto'>): string =>
  typeof opticalSize === 'number' ? String(opticalSize) : OPSZ_TOKENS[opticalSize];

const typesettingStyle = (setting: Typesetting): CSSProperties | undefined => {
  const { weight, italic, opticalSize = 'auto', features = [] } = setting;
  const style: CSSProperties = {};
  if (weight !== undefined) style.fontWeight = weight;
  if (italic !== undefined) style.fontStyle = italic ? 'italic' : 'normal';
  if (opticalSize !== 'auto') style.fontVariationSettings = `'opsz' ${opszValue(opticalSize)}`;
  if (features.length > 0) style.fontFeatureSettings = featureSettings(features);
  return Object.keys(style).length > 0 ? style : undefined;
};

export { typesettingStyle };
