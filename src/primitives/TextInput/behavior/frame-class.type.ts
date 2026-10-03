/* @layer renderer-components @kind types */
import type { ControlSize } from '../../field-control/field-control.type';

interface FrameClassParams {
  size: ControlSize;
  start: boolean;
  end: boolean;
  className: string;
}

export type { FrameClassParams };
