/* @layer renderer-components @kind util */
import type { OptionDisabled } from './option-disabled.type';

const isDisabled = (disabled: OptionDisabled | undefined): boolean => disabled === true || typeof disabled === 'string';

export { isDisabled };
