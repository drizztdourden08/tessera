/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { NumberField } from '../NumberField';
import { DEGREE_SIGN } from './AngleField.constants';
import type { AngleFieldProps } from './AngleField.type';
import { normaliseAngle } from './behavior/normalise-angle';
import { snapLadder } from './behavior/snap-ladder';
import { useDialDrag } from './behavior/useDialDrag';
import { AngleDial } from './sub-components/AngleDial';
import './AngleField.css';

const AngleField = (props: AngleFieldProps) => {
  const { value, onChange, snap, dial = true, disabled = false, mixed = false, className, ...field } = props;
  const ladder = useMemo(() => snapLadder(snap), [snap]);
  const handlers = useDialDrag({ enabled: dial && !disabled, snap, onChange });

  return (
    <Box as="span" className={['angle-field', className].filter(Boolean).join(' ')}>
      {dial && <AngleDial value={value} mixed={mixed} handlers={handlers} />}
      <NumberField
        {...field}
        value={value}
        disabled={disabled}
        mixed={mixed}
        step={1}
        fineStep={1}
        ladder={ladder}
        suffix={DEGREE_SIGN}
        onChange={(next) => onChange(normaliseAngle(next))}
      />
    </Box>
  );
};

export { AngleField };
