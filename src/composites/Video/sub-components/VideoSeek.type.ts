/* @layer renderer-components @kind types */
interface VideoSeekProps {
  currentTime: number;
  duration: number;
  buffered: number;
  onSeek: (time: number) => void;
}

export type { VideoSeekProps };
