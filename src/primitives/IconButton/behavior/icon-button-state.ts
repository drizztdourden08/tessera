/* @layer renderer-components @kind util */
import { mixedOr } from '../../field-control/mixed-or';
import type { IconButtonState, IconButtonStateInput } from './icon-button-state.type';

const iconButtonState = (input: IconButtonStateInput): IconButtonState => {
  const { mixed, active, loading, disabled } = input;
  return {
    'aria-pressed': mixedOr(mixed, active || undefined),
    'aria-busy': loading || undefined,
    disabled: loading || disabled,
  };
};

export { iconButtonState };
