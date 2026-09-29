/* @layer renderer-components @kind types */
import type { ComponentPropsWithRef, ReactNode } from 'react';

interface VideoProps extends Omit<ComponentPropsWithRef<'video'>, 'controls'> {
  controls?: boolean;
  label?: string;
  errorMessage?: ReactNode;
}

interface MediaSnapshot {
  paused: boolean;
  ended: boolean;
  started: boolean;
  waiting: boolean;
  failed: boolean;
  currentTime: number;
  duration: number;
  buffered: number;
  volume: number;
  muted: boolean;
  rate: number;
}

interface VideoActions {
  togglePlay: () => void;
  seekTo: (time: number) => void;
  seekBy: (delta: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setRate: (rate: number) => void;
}

interface ScreenMode {
  active: boolean;
  supported: boolean;
  toggle: () => void;
}

type VideoKeyAction = 'toggle' | 'back' | 'forward' | 'mute' | 'fullscreen';

interface VideoKeyBinding {
  action: VideoKeyAction;
  frameOnly: boolean;
}

export type { MediaSnapshot, ScreenMode, VideoActions, VideoKeyAction, VideoKeyBinding, VideoProps };
