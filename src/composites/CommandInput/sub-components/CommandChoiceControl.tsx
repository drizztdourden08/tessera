/* @layer renderer-components @kind component */
import { Combobox } from '../../../primitives/Combobox';
import { paramOptions } from '../behavior/param-options';
import type { CommandSpecParamProps } from '../CommandInput.type';

const CommandChoiceControl = ({ param, values, value, size, disabled, onValue }: CommandSpecParamProps) => (
  <Combobox
    size={size}
    disabled={disabled}
    aria-label={param.label}
    placeholder={param.placeholder}
    items={paramOptions(param, values)}
    value={typeof value === 'string' && value !== '' ? value : null}
    onChange={(next) => onValue(param.name, next ?? undefined)}
  />
);

export { CommandChoiceControl };
