/* @layer renderer-components @kind types */
import type { KeyboardEventHandler, Ref } from 'react';
import type { ControlSize } from '../../../primitives/field-control/field-control.type';
import type { HintReport } from '../../../primitives/hint/hint.type';

interface VolumeMuteButtonProps {
  muted: boolean;
  level: number;
  size: ControlSize;
  disabled: boolean;
  onToggle: () => void;
  onHint?: HintReport;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  ref?: Ref<HTMLButtonElement>;
}

export type { VolumeMuteButtonProps };
