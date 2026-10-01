/* @layer renderer-components @kind component */
import { FieldControlBoundary } from '../../../primitives/FieldControlBoundary';
import { Flex } from '../../../primitives/Flex';
import { NumberInput } from '../../../primitives/NumberInput';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { toNumber } from '../to-number';
import { toPair } from '../to-pair';
import type { NumberRangeProps } from './NumberRange.type';
import '../../../theme/field-kits.css';

const inputValue = (bound: unknown): number | string => {
  const parsed = toNumber(bound);
  return Number.isFinite(parsed) ? parsed : '';
};

const asBound = (entered: number): number | null => (Number.isNaN(entered) ? null : entered);

const NumberRange = (props: NumberRangeProps) => {
  const { value, onChange } = props;
  const [low, high] = toPair(value, null);
  const { records } = useTesseraStrings();

  return (
    <FieldControlBoundary>
      <Flex gap="xs" align="center">
        <NumberInput
          value={inputValue(low)}
          placeholder={records.rangeFrom}
          aria-label={records.rangeFromLabel}
          onChange={(entered) => onChange([asBound(entered), high ?? null])}
        />
        <Text className="field-kit__range-sep">-</Text>
        <NumberInput
          value={inputValue(high)}
          placeholder={records.rangeTo}
          aria-label={records.rangeToLabel}
          onChange={(entered) => onChange([low ?? null, asBound(entered)])}
        />
      </Flex>
    </FieldControlBoundary>
  );
};

export { NumberRange };
