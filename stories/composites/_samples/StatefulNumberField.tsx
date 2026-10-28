/* @layer stories @kind component */
import { useState } from 'react';
import { NumberField } from '../../../src/composites';
import { ValueReadout } from '../../_template/ValueReadout';
import type { StatefulNumberFieldProps } from './number-field-story.type';

const StatefulNumberField = (props: StatefulNumberFieldProps) => {
  const { initial, mixed = false, ...rest } = props;
  const [value, setValue] = useState(initial);
  const [differs, setDiffers] = useState(mixed);
  return (
    <ValueReadout value={differs ? 'mixed' : value}>
      <NumberField
        aria-label={rest.label ?? 'Number'}
        {...rest}
        mixed={differs}
        value={value}
        onChange={(next) => {
          setDiffers(false);
          setValue(next);
        }}
      />
    </ValueReadout>
  );
};

export { StatefulNumberField };
