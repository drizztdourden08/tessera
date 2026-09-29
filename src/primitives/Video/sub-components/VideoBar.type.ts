/* @layer renderer-components @kind types */
import type { MediaSnapshot, ScreenMode, VideoActions } from '../Video.type';

type TheaterMode = Pick<ScreenMode, 'active' | 'toggle'>;

interface VideoScreenButtonsProps {
  fullscreen: ScreenMode;
  pictureInPicture: ScreenMode;
  theater: TheaterMode;
}

interface VideoBarProps extends VideoScreenButtonsProps {
  media: MediaSnapshot;
  actions: VideoActions;
}

export type { VideoBarProps, VideoScreenButtonsProps };
