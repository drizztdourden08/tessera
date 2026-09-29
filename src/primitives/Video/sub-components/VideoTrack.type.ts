/* @layer renderer-components @kind types */
import type { RangeInputProps } from '../../RangeInput';

interface VideoTrackProps extends RangeInputProps {
  fill: string;
  buffer?: string;
}

export type { VideoTrackProps };
