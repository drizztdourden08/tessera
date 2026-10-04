/* @layer renderer-components @kind logic */
import type { PathFieldProps } from '../PathField.type';

const pathFieldFlags = (props: PathFieldProps, outside: { invalid: boolean; problem: boolean; focused: boolean; dropping: boolean }) => ({
  editable: props.readOnly !== true && props.onChange !== undefined,
  disabled: props.disabled === true,
  invalid: props.invalid === true || outside.invalid || outside.problem,
  masked: Boolean(props.value) && !outside.focused && !outside.dropping,
});

export { pathFieldFlags };
