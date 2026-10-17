/* @layer renderer-components @kind types */
import type { ScaleOrientation } from '../../../primitives/ScaleLabels/ScaleLabels.type';
import type { VolumeButtonPart, VolumeRange, VolumeSliderPart } from '../VolumeControl.type';

interface VolumePopoverProps {
  button: VolumeButtonPart;
  slider: VolumeSliderPart;
  orientation: ScaleOrientation;
  range: VolumeRange;
}

export type { VolumePopoverProps };
