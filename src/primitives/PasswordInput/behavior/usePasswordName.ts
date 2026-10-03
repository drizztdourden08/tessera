/* @layer renderer-components @kind hook */
import { useFieldControl } from '../../Field/behavior/useFieldControl';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { PasswordInputProps } from '../PasswordInput.type';

const usePasswordName = (props: PasswordInputProps): string | undefined => {
  const { password } = useTesseraStrings();
  const { labelId } = useFieldControl();
  const named = props['aria-label'] !== undefined || props['aria-labelledby'] !== undefined || labelId !== undefined;
  return named ? props['aria-label'] : password.password;
};

export { usePasswordName };
