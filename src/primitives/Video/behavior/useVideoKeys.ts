/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';
import { SEEK_STEP } from '../Video.constants';
import type { VideoKeyAction } from '../Video.type';
import type { UseVideoKeysParams } from './useVideoKeys.type';
import { videoKeyAction } from './video-key-action';

const useVideoKeys = (params: UseVideoKeysParams) => {
  const { actions, toggleFullscreen, toggleTheater, wake } = params;

  return useCallback((event: KeyboardEvent<HTMLElement>) => {
    wake();
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const action = videoKeyAction(event.key, event.target === event.currentTarget);
    if (!action) return;
    event.preventDefault();
    const handlers: Record<VideoKeyAction, () => void> = {
      toggle: actions.togglePlay,
      back: () => actions.seekBy(-SEEK_STEP),
      forward: () => actions.seekBy(SEEK_STEP),
      mute: actions.toggleMute,
      fullscreen: toggleFullscreen,
      theater: toggleTheater,
    };
    handlers[action]();
  }, [actions, toggleFullscreen, toggleTheater, wake]);
};

export { useVideoKeys };
