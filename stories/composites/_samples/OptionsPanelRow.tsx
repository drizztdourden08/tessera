/* @layer stories @kind component */
import { OptionRow, Toggle, ValueTag } from '../../../src/composites';
import type { SampleOption } from './options-panel-samples.type';

interface OptionsPanelRowProps {
  option: SampleOption;
  value: boolean;
  onChange: (value: boolean) => void;
}

const OptionsPanelRow = ({ option, value, onChange }: OptionsPanelRowProps) => {
  const { label, description, tag, note, locked, forced, readOnly, aside, on } = option;
  const control = readOnly
    ? <ValueTag value={value} />
    : <Toggle checked={value} onChange={onChange} disabled={locked} aria-label={label} />;
  return (
    <OptionRow
      label={label} description={description} tag={tag} note={note} locked={locked} forced={forced} aside={aside}
      changed={value !== on} onReset={() => onChange(on)} control={control}
    />
  );
};

export { OptionsPanelRow };
