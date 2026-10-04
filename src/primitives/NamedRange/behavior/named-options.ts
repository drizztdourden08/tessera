/* @layer renderer-components @kind logic */
import type { SegmentOption } from '../../SegmentedControl/SegmentedControl.type';
import type { TesseraStrings } from '../../strings/tessera-strings.type';
import { CUSTOM } from '../NamedRange.constants';
import type { NamedRangeProps } from '../NamedRange.type';

const namedOptions = ({ options }: TesseraStrings, props: NamedRangeProps): SegmentOption[] => [
  ...props.names.map((name) => ({
    value: String(name.value),
    label: props.showValues === false ? name.label : options.namedValue(name.label, name.value),
  })),
  { value: CUSTOM, label: props.customLabel ?? options.custom },
];

export { namedOptions };
