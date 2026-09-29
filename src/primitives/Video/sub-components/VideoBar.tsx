/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { IconButton } from '../../IconButton';
import './VideoBar.css';
import type { VideoBarProps } from './VideoBar.type';
import { VideoRateMenu } from './VideoRateMenu';
import { VideoSeek } from './VideoSeek';
import { VideoTime } from './VideoTime';
import { VideoVolume } from './VideoVolume';

const VideoBar = (props: VideoBarProps) => {
  const { media, actions, fullscreen, pictureInPicture } = props;
  const playing = !media.paused;

  return (
    <div className="video-bar">
      <VideoSeek currentTime={media.currentTime} duration={media.duration} buffered={media.buffered} onSeek={actions.seekTo} />
      <div className="video-bar__row">
        <IconButton className="video-bar__button" label={playing ? 'Pause' : 'Play'} onClick={actions.togglePlay}>
          <Icon name={playing ? 'pause' : 'play'} size={18} />
        </IconButton>
        <VideoVolume volume={media.volume} muted={media.muted} onVolume={actions.setVolume} onToggleMute={actions.toggleMute} />
        <VideoTime currentTime={media.currentTime} duration={media.duration} />
        <span className="video-bar__spacer" />
        <VideoRateMenu rate={media.rate} onRate={actions.setRate} />
        {pictureInPicture.supported && (
          <IconButton
            className="video-bar__button"
            label={pictureInPicture.active ? 'Exit picture in picture' : 'Picture in picture'}
            active={pictureInPicture.active}
            onClick={pictureInPicture.toggle}
          >
            <Icon name="picture-in-picture-2" size={18} />
          </IconButton>
        )}
        {fullscreen.supported && (
          <IconButton className="video-bar__button" label={fullscreen.active ? 'Exit full screen' : 'Full screen'} onClick={fullscreen.toggle}>
            <Icon name={fullscreen.active ? 'minimize-2' : 'maximize-2'} size={18} />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export { VideoBar };
