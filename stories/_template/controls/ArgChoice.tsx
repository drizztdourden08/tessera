/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Flex, SegmentedControl, Select, Text } from '../../../src/primitives';
import type { SelectOption } from '../../../src/primitives';
import { SEARCHABLE_FROM } from './arg-controls.constants';
import { optionLabel } from './option-label';
import type { ControlKind } from './playground.type';

interface ArgChoiceProps {
  id: string;
  name: string;
  kind: ControlKind;
  value: unknown;
  options: readonly unknown[];
  optionView?: (option: unknown) => ReactNode;
  onChange: (value: unknown) => void;
}

const indexOf = (options: readonly unknown[], value: unknown): string => String(options.indexOf(value));

const ArgChoice = (props: ArgChoiceProps) => {
  const { id, name, kind, value, options, optionView, onChange } = props;
  const choices: SelectOption[] = options.map((option, index) => ({ value: String(index), label: optionLabel(option) }));
  const pick = (index: string) => onChange(options[Number(index)]);
  if (kind === 'segmented') {
    return <SegmentedControl aria-label={name} size="sm" value={indexOf(options, value)} options={choices} onChange={pick} />;
  }
  const drawOption = optionView && ((option: SelectOption) => (
    <Flex gap="sm" align="center">
      {optionView(options[Number(option.value)])}
      <Text as="span">{option.label}</Text>
    </Flex>
  ));
  const look = { id, size: 'sm' as const, options: choices, searchable: options.length > SEARCHABLE_FROM, renderOption: drawOption };
  if (kind === 'multiselect') {
    const picked = Array.isArray(value) ? value.map((item) => indexOf(options, item)) : [];
    return <Select {...look} min={0} max={Math.max(options.length, 2)} multiDisplay="tags" values={picked} onValuesChange={(indexes) => onChange(indexes.map((index) => options[Number(index)]))} />;
  }
  return <Select {...look} value={indexOf(options, value)} onChange={pick} />;
};

export { ArgChoice };
