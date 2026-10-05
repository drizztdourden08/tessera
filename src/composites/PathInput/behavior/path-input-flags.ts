/* @layer renderer-components @kind logic */
import type { PathInputProps } from '../PathInput.type';

const pathInputFlags = (props: PathInputProps, outside: { invalid: boolean; problem: boolean; focused: boolean; dropping: boolean }) => ({
  editable: props.readOnly !== true && props.onChange !== undefined,
  disabled: props.disabled === true,
  invalid: props.invalid === true || outside.invalid || outside.problem,
  masked: Boolean(props.value) && !outside.focused && !outside.dropping,
});

export { pathInputFlags };
