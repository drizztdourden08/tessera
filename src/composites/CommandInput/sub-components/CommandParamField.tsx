/* @layer renderer-components @kind component */
import { Field } from '../../../primitives/Field';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { PARAM_WIDTH } from '../CommandInput.constants';
import type { CommandSpecParamProps } from '../CommandInput.type';
import { CommandParamControl } from './CommandParamControl';

const CommandParamField = (props: CommandSpecParamProps) => {
  const { param, size } = props;
  const { commandInput } = useTesseraStrings();
  const label = param.optional === true ? commandInput.optionalLabel(param.label, commandInput.optional) : param.label;
  return (
    <Field label={label} size={size} width={PARAM_WIDTH[param.kind]}>
      <CommandParamControl {...props} />
    </Field>
  );
};

export { CommandParamField };
