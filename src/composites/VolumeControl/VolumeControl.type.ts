/* @layer renderer-components @kind types */
import type { ControlSize } from '../../primitives/field-control/field-control.type';
import type { HintReport } from '../../primitives/hint/hint.type';
import type { ScaleLabelSource } from '../../primitives/ScaleLabels/ScaleLabels.type';

interface VolumeControlProps {
  value: number;
  onChange: (value: number) => void;
  muted?: boolean;
  onMutedChange?: (muted: boolean) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  description?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  labels?: ScaleLabelSource;
  size?: ControlSize;
  disabled?: boolean;
  onHint?: HintReport;
  className?: string;
}

type MuteSource = Pick<VolumeControlProps, 'value' | 'onChange' | 'muted' | 'onMutedChange' | 'min' | 'max'>;

interface VolumeMute {
  muted: boolean;
  level: number;
  setLevel: (value: number) => void;
  toggle: () => void;
}

export type { MuteSource, VolumeControlProps, VolumeMute };
