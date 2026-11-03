/* @layer renderer-components @kind util */
import type { ToggleClassInput } from './toggle-class.type';

const toggleClass = (input: ToggleClassInput): string => {
  const { controlSize, labelSize, mixed, disabled } = input;
  return ['toggle', `control-size--${controlSize}`, labelSize && `label-size--${labelSize}`, mixed && 'toggle--mixed', disabled && 'toggle--disabled'].filter(Boolean).join(' ');
};

export { toggleClass };
