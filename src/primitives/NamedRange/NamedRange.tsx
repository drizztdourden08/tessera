/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box } from '../Box';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { FieldControlBoundary } from '../FieldControlBoundary';
import { NumberInput } from '../NumberInput';
import { SegmentedControl } from '../SegmentedControl';
import { Text } from '../Text';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { namedOptions } from './behavior/named-options';
import { CUSTOM } from './NamedRange.constants';
import type { NamedRangeProps } from './NamedRange.type';
import './NamedRange.css';

const NamedRange = (props: NamedRangeProps) => {
  const { value, onChange, names, min, max, disabled, size, className } = props;
  const strings = useTesseraStrings();
  const control = useFieldControl();
  const named = names.some((name) => name.value === value);
  const [customAt, setCustomAt] = useState<number | null>(null);
  const picked = !named || value === customAt ? CUSTOM : String(value);
  const choose = (next: string) => {
    setCustomAt(next === CUSTOM ? value : null);
    if (next !== CUSTOM) onChange(Number(next));
  };
  const step = (next: number) => {
    setCustomAt(next);
    onChange(next);
  };
  return (
    <Box className={['named-range', className].filter(Boolean).join(' ')} role="group" aria-label={props['aria-label']} aria-labelledby={props['aria-label'] ? undefined : control.labelId}>
      <FieldControlBoundary>
        <SegmentedControl value={picked} options={namedOptions(strings, props)} onChange={choose} disabled={disabled} size={size} aria-label={props['aria-label']} />
        {picked === CUSTOM && (
          <Box className="named-range__custom">
            <NumberInput buttons="sides" value={value} min={min} max={max} step={props.step} onChange={step} disabled={disabled} size={size} aria-label={strings.options.customValue} />
            <Text variant="caption" tone="dim">{strings.options.range(min, max)}</Text>
          </Box>
        )}
      </FieldControlBoundary>
    </Box>
  );
};

export { NamedRange };
