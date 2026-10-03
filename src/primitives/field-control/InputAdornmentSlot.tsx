/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { InputAdornmentView } from './InputAdornmentView';
import type { InputAdornmentSlotProps } from './input-adornment-slot.type';

const InputAdornmentSlot = (props: InputAdornmentSlotProps) => {
  const { adornment, size, disabled, className } = props;
  if (adornment === undefined) return null;
  return (
    <Box as="span" className={className}>
      <InputAdornmentView adornment={adornment} size={size} disabled={disabled} />
    </Box>
  );
};

export { InputAdornmentSlot };
