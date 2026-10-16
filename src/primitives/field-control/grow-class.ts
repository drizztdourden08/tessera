/* @layer renderer-components @kind util */
import { INLINE_CONTROL_CLASS } from './field-control.constants';

const growClass = (grow: boolean | undefined, className = ''): string =>
  (grow === false ? `${INLINE_CONTROL_CLASS} ${className}`.trim() : className);

export { growClass };
