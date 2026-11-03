/* @layer renderer-components @kind component */
import { NumberInput } from '../../../primitives/NumberInput';
import { TextInput } from '../../../primitives/TextInput';
import { Toggle } from '../../../primitives/Toggle';
import { paramLocked } from '../behavior/param-locked';
import type { CommandSpecParamProps } from '../CommandInput.type';
import { CommandChoiceControl } from './CommandChoiceControl';

const CommandParamControl = (props: CommandSpecParamProps) => {
  const { param, values, value, size, onValue } = props;
  const { name, label, kind, placeholder } = param;
  const disabled = props.disabled || paramLocked(param, values);
  if (kind === 'number') {
    return (
      <NumberInput
        size={size}
        disabled={disabled}
        placeholder={placeholder}
        value={typeof value === 'number' ? value : ''}
        onChange={(next) => onValue(name, Number.isNaN(next) ? undefined : next)}
      />
    );
  }
  if (kind === 'boolean') {
    return <Toggle size={size} disabled={disabled} aria-label={label} checked={value === true} onChange={(next) => onValue(name, next)} />;
  }
  if (kind === 'choice') return <CommandChoiceControl {...props} disabled={disabled} />;
  return (
    <TextInput
      size={size}
      disabled={disabled}
      mono
      placeholder={placeholder}
      value={typeof value === 'string' ? value : ''}
      onChange={(event) => onValue(name, event.target.value)}
    />
  );
};

export { CommandParamControl };
