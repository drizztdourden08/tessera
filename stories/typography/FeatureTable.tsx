/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Text, TYPE_FEATURES } from '../../src/primitives';
import type { TypeFeature, TypeFeatureGroup } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { FEATURE_COLUMNS, FEATURE_GROUP_TITLES } from './FeatureTable.constants';
import type { FeatureTableProps } from './FeatureTable.type';
import './variable-type.css';

const featuresIn = (group: TypeFeatureGroup): TypeFeature[] =>
  (Object.keys(TYPE_FEATURES) as TypeFeature[]).filter((feature) => TYPE_FEATURES[feature].group === group);

const featureCell = (feature: TypeFeature, column: (typeof FEATURE_COLUMNS)[number]['key']): ReactNode => {
  const { sample, tag } = TYPE_FEATURES[feature];
  if (column === 'prop') return <Text className="variable-type__label">{feature}</Text>;
  if (column === 'off') return <Text className="feature-table__sample" style={{ fontFeatureSettings: `'${tag}' 0` }}>{sample}</Text>;
  return <Text className="feature-table__sample" features={[feature]}>{sample}</Text>;
};

const FeatureTable = ({ group }: FeatureTableProps) => (
  <Box className="feature-table">
    <Text className="feature-table__title">{FEATURE_GROUP_TITLES[group]}</Text>
    <Demonstrator
      corner="Feature"
      rows={featuresIn(group).map((feature) => ({ key: feature, label: `${TYPE_FEATURES[feature].label} ${TYPE_FEATURES[feature].tag}` }))}
      columns={FEATURE_COLUMNS}
      align="start"
      cell={featureCell}
    />
  </Box>
);

export { FeatureTable };
