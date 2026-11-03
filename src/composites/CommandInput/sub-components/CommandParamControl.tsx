/* @layer renderer-components @kind component */
import { Combobox } from '../../../primitives/Combobox';
import { NumberInput } from '../../../primitives/NumberInput';
import { TextInput } from '../../../primitives/TextInput';
import { Toggle } from '../../../primitives/Toggle';
import { NO_OPTIONS } from '../CommandInput.constants';
import type { CommandSpecParamProps } from '../CommandInput.type';

const CommandParamControl = ({ param, value, size, disabled, onValue }: CommandSpecParamProps) => {
  const { name, label, kind, options = NO_OPTIONS } = param;
  if (kind === 'number') {
    return (
      <NumberInput
        size={size}
        disabled={disabled}
        value={typeof value === 'number' ? value : ''}
        onChange={(next) => onValue(name, Number.isNaN(next) ? undefined : next)}
      />
    );
  }
  if (kind === 'boolean') {
    return <Toggle size={size} disabled={disabled} aria-label={label} checked={value === true} onChange={(next) => onValue(name, next)} />;
  }
  if (kind === 'choice') {
    return (
      <Combobox
        size={size}
        disabled={disabled}
        aria-label={label}
        items={options}
        value={typeof value === 'string' && value !== '' ? value : null}
        onChange={(next) => onValue(name, next ?? undefined)}
      />
    );
  }
  return <TextInput size={size} disabled={disabled} mono value={typeof value === 'string' ? value : ''} onChange={(event) => onValue(name, event.target.value)} />;
};

export { CommandParamControl };
