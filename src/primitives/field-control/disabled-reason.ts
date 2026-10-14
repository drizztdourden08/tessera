/* @layer renderer-components @kind util */
import type { OptionDisabled } from './option-disabled.type';

const disabledReason = (disabled: OptionDisabled | undefined): string | undefined =>
  (typeof disabled === 'string' && disabled !== '' ? disabled : undefined);

export { disabledReason };
