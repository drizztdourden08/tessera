/* @layer renderer-components @kind types */
import type { ControlSize } from '../../field-control/field-control.type';

interface PasswordClassParams {
  size: ControlSize;
  monospace: boolean;
  masked: boolean;
  start: boolean;
  className: string | undefined;
}

export type { PasswordClassParams };
