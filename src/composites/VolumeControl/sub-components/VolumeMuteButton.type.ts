/* @layer renderer-components @kind types */
import type { ControlSize } from '../../../primitives/field-control/field-control.type';
import type { HintReport } from '../../../primitives/hint/hint.type';
import type { IconName } from '../../../primitives/Icon/Icon.type';

interface VolumeMuteButtonProps {
  muted: boolean;
  icon: IconName;
  size: ControlSize;
  disabled: boolean;
  onToggle: () => void;
  onHint?: HintReport;
}

export type { VolumeMuteButtonProps };
