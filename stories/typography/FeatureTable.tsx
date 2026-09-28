/* @layer stories @kind component */
import { Box, Text, TYPE_FEATURES } from '../../src/primitives';
import type { TypeFeature, TypeFeatureGroup } from '../../src/primitives';
import './variable-type.css';

interface FeatureTableProps {
  group: TypeFeatureGroup;
}

const GROUP_TITLES: Record<TypeFeatureGroup, string> = {
  numerals: 'Numerals',
  position: 'Position',
  forms: 'Forms and ligatures',
  stylistic: 'Stylistic sets',
  character: 'Character variants',
};

const featuresIn = (group: TypeFeatureGroup): TypeFeature[] =>
  (Object.keys(TYPE_FEATURES) as TypeFeature[]).filter((feature) => TYPE_FEATURES[feature].group === group);

const FeatureTable = ({ group }: FeatureTableProps) => (
  <Box className="feature-table">
    <Text className="feature-table__title">{GROUP_TITLES[group]}</Text>
    <Box className="feature-table__grid">
      <Text className="variable-type__head">Feature</Text>
      <Text className="variable-type__head">Prop</Text>
      <Text className="variable-type__head">Off</Text>
      <Text className="variable-type__head">On</Text>
      {featuresIn(group).map((feature) => (
        <Box key={feature} className="variable-type__row">
          <Text className="feature-table__label">
            {TYPE_FEATURES[feature].label}
            <Text className="variable-type__caption">{` ${TYPE_FEATURES[feature].tag}`}</Text>
          </Text>
          <Text className="variable-type__label">{feature}</Text>
          <Text className="feature-table__sample" style={{ fontFeatureSettings: `'${TYPE_FEATURES[feature].tag}' 0` }}>{TYPE_FEATURES[feature].sample}</Text>
          <Text className="feature-table__sample" features={[feature]}>{TYPE_FEATURES[feature].sample}</Text>
        </Box>
      ))}
    </Box>
  </Box>
);

export { FeatureTable };
