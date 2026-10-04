/* @layer renderer-components @kind component */
import { Select } from '../../../primitives/Select';
import { optionHint } from '../behavior/option-hint';
import { useHintSource } from '../behavior/useHintSource';
import type { SettingsSelectProps } from './SettingsSelect.type';

const SettingsSelect = (props: SettingsSelectProps) => {
  const { input, label, disabled } = props;
  const report = useHintSource();
  return (
    <Select
      value={input.value}
      onChange={input.onChange}
      options={input.options.map((option) => ({ value: option.value, label: option.label }))}
      searchable={input.searchable}
      disabled={disabled}
      aria-label={label}
      onActiveChange={(value) => report(optionHint(input.options.find((option) => option.value === value)) ?? null)}
    />
  );
};

export { SettingsSelect };
