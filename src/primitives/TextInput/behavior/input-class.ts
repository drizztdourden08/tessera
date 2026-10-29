/* @layer renderer-components @kind util */
import type { ControlSize } from '../../field-control/field-control.type';

const inputClass = (framed: boolean, size: ControlSize, className: string, mono: boolean | undefined): string =>
  ['text-input', mono && 'text-input--mono', !framed && `control-size--${size} ${className}`].filter(Boolean).join(' ');

export { inputClass };
