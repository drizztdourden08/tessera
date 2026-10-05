/* @layer renderer-components @kind types */
interface VideoVolumeProps {
  volume: number;
  muted: boolean;
  onVolume: (volume: number) => void;
  onToggleMute: () => void;
}

export type { VideoVolumeProps };
