/* @layer renderer-components @kind types */
import type { InputHTMLAttributes } from 'react';

interface VideoTrackProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  fill: string;
  buffer?: string;
}

export type { VideoTrackProps };
