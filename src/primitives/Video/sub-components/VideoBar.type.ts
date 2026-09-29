/* @layer renderer-components @kind types */
import type { MediaSnapshot, ScreenMode, VideoActions } from '../Video.type';

interface VideoBarProps {
  media: MediaSnapshot;
  actions: VideoActions;
  fullscreen: ScreenMode;
  pictureInPicture: ScreenMode;
}

export type { VideoBarProps };
