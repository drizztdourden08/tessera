/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { CommandSpecFieldsProps } from '../CommandInput.type';
import { CommandParamField } from './CommandParamField';

const CommandSpecFields = ({ spec, values, size, disabled, onValue }: CommandSpecFieldsProps) => (
  <Box className="command-input__fields">
    {spec.params.map((param) => (
      <CommandParamField key={param.name} param={param} value={values[param.name]} size={size} disabled={disabled} onValue={onValue} />
    ))}
  </Box>
);

export { CommandSpecFields };
