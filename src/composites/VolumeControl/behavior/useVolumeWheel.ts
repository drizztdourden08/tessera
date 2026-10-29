/* @layer renderer-components @kind hook */
import { useWheelStep } from '../../wheel-step';
import type { VolumeWheel } from '../VolumeControl.type';

const useVolumeWheel = (params: VolumeWheel): void => {
  const { anchorRef, panelRef, onNudge, active, open } = params;
  useWheelStep({ refs: [anchorRef, ...(open ? [panelRef] : [])], active, onStep: (step) => onNudge(step.direction), watch: open });
};

export { useVolumeWheel };
