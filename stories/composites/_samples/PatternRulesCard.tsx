/* @layer stories @kind component */
import { useState } from 'react';
import { DynamicInput } from '../../../src/composites';
import { Box, Field, Text } from '../../../src/primitives';
import type { PatternValue } from '../../../src/composites';
import type { PatternRulesCase } from './PatternRulesDemo.type';

const PatternRulesCard = (props: { rule: PatternRulesCase }) => {
  const { rule } = props;
  const [value, setValue] = useState<PatternValue>(rule.initial);
  return (
    <Box className="pattern-story__card">
      <Field label={rule.label} hint={rule.hint}>
        <DynamicInput pattern={rule.pattern} value={value} onChange={setValue} slots={rule.slots} validate={rule.validate} />
      </Field>
      <Text className="pattern-story__value">{JSON.stringify(value)}</Text>
    </Box>
  );
};

export { PatternRulesCard };
