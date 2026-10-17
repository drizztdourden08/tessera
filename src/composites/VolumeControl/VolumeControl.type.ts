/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { ControlSize } from '../../primitives/field-control/field-control.type';
import type { HintReport } from '../../primitives/hint/hint.type';
import type { ScaleLabelSource, ScaleOrientation } from '../../primitives/ScaleLabels/ScaleLabels.type';
import type { SliderSingleProps } from '../../primitives/Slider/Slider.type';
import type { VolumeMuteButtonProps } from './sub-components/VolumeMuteButton.type';

type VolumeSlider = 'inline' | 'popover';

interface VolumeControlProps {
  value: number;
  onChange: (value: number) => void;
  muted?: boolean;
  onMutedChange?: (muted: boolean) => void;
  slider?: VolumeSlider;
  orientation?: ScaleOrientation;
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

interface VolumeRange {
  min: number;
  max: number;
  step: number;
}

interface VolumeWheel {
  anchorRef: RefObject<HTMLElement | null>;
  panelRef: RefObject<HTMLElement | null>;
  onNudge: (direction: 1 | -1) => void;
  active: boolean;
  open: boolean;
}

type VolumeButtonPart = Omit<VolumeMuteButtonProps, 'ref' | 'onKeyDown'>;

type VolumeSliderPart = SliderSingleProps & { value: number; onChange: (value: number) => void };

interface VolumeParts {
  range: VolumeRange;
  size: ControlSize;
  button: VolumeButtonPart;
  slider: VolumeSliderPart;
}

interface FocusWatch {
  onFocus: () => void;
  onBlur: () => void;
}

export type {
  FocusWatch, MuteSource, VolumeButtonPart, VolumeControlProps, VolumeMute, VolumeParts, VolumeRange, VolumeSlider, VolumeSliderPart, VolumeWheel,
};
