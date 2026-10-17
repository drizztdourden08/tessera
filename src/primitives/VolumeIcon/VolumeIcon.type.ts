/* @layer renderer-components @kind types */
type VolumeStep = 0 | 1 | 2 | 3 | 4;

interface VolumeIconProps {
  level: number;
  muted?: boolean;
  size?: number;
  className?: string;
}

interface VolumeWave {
  up: string;
  down: string;
}

export type { VolumeIconProps, VolumeStep, VolumeWave };
