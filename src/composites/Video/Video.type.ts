/* @layer renderer-components @kind types */
import type { ComponentPropsWithRef, ReactNode } from 'react';

interface VideoProps extends Omit<ComponentPropsWithRef<'video'>, 'controls'> {
  controls?: boolean;
  label?: string;
  errorMessage?: ReactNode;
  theater?: boolean;
  defaultTheater?: boolean;
  onTheaterChange?: (theater: boolean) => void;
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
  reload: () => void;
}

interface ScreenMode {
  active: boolean;
  supported: boolean;
  toggle: () => void;
}

interface FullscreenMode extends ScreenMode {
  filled: boolean;
}

interface TheaterParams {
  theater: boolean | undefined;
  defaultTheater: boolean;
  onTheaterChange: ((theater: boolean) => void) | undefined;
}

interface PrefixedDocument extends Document {
  webkitFullscreenEnabled?: boolean;
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => void;
}

interface PrefixedElement extends HTMLElement {
  webkitRequestFullscreen?: () => void;
}

type VideoKeyAction = 'toggle' | 'back' | 'forward' | 'mute' | 'fullscreen' | 'theater';

interface VideoKeyBinding {
  action: VideoKeyAction;
  frameOnly: boolean;
}

export type {
  FullscreenMode,
  MediaSnapshot,
  PrefixedDocument,
  PrefixedElement,
  ScreenMode,
  TheaterParams,
  VideoActions,
  VideoKeyAction,
  VideoKeyBinding,
  VideoProps,
};
