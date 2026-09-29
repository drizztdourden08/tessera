/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { MouseEvent } from 'react';
import { blockDoubleClickSelect } from './block-double-click-select';
import { frameProps } from './frame-props';
import { useFullscreen } from './useFullscreen';
import { useIdle } from './useIdle';
import { useMediaState } from './useMediaState';
import { usePictureInPicture } from './usePictureInPicture';
import { useTheater } from './useTheater';
import { useVideoActions } from './useVideoActions';
import { useVideoElement } from './useVideoElement';
import { useVideoKeys } from './useVideoKeys';
import type { UseVideoPlayerParams } from './useVideoPlayer.type';

const useVideoPlayer = (params: UseVideoPlayerParams) => {
  const { ref, controls, className, onClick, ...theaterParams } = params;
  const { video, attach } = useVideoElement(ref);
  const [frame, setFrame] = useState<HTMLDivElement | null>(null);
  const media = useMediaState(video);
  const actions = useVideoActions(video);
  const fullscreen = useFullscreen(frame);
  const pictureInPicture = usePictureInPicture(video);
  const theater = useTheater(theaterParams);
  const interactive = controls && !media.failed;
  const { idle, wake, sleep } = useIdle(interactive && !media.paused);
  const onKeyDown = useVideoKeys({ actions, toggleFullscreen: fullscreen.toggle, toggleTheater: theater.toggle, wake });

  const handleVideoClick = (event: MouseEvent<HTMLVideoElement>) => {
    onClick?.(event);
    if (interactive) actions.togglePlay();
  };

  return {
    media,
    actions,
    fullscreen,
    pictureInPicture,
    theater,
    interactive,
    frame: frameProps({
      interactive,
      idle,
      theater: theater.active,
      filled: fullscreen.filled,
      className,
      attach: setFrame,
      onKeyDown,
      wake,
      sleep,
    }),
    video: {
      ref: attach,
      onClick: handleVideoClick,
      onMouseDown: blockDoubleClickSelect,
      onDoubleClick: interactive ? fullscreen.toggle : undefined,
    },
  };
};

export { useVideoPlayer };
