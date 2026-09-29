/* @layer renderer-components @kind component */
import './Video.css';
import { DEFAULT_ERROR_MESSAGE } from './Video.constants';
import type { VideoProps } from './Video.type';
import { useVideoPlayer } from './behavior/useVideoPlayer';
import { VideoBar } from './sub-components/VideoBar';
import { VideoOverlay } from './sub-components/VideoOverlay';

const Video = (props: VideoProps) => {
  const {
    controls = true,
    label = 'Video player',
    errorMessage = DEFAULT_ERROR_MESSAGE,
    className = '',
    style,
    ref,
    preload = 'metadata',
    theater,
    defaultTheater = false,
    onTheaterChange,
    onClick,
    ...native
  } = props;
  const player = useVideoPlayer({ ref, controls, className, onClick, theater, defaultTheater, onTheaterChange });
  const { media, actions } = player;

  return (
    <div {...player.frame} style={style} aria-label={label}>
      <video className="video__media" preload={preload} {...native} {...player.video} controls={false} />
      <VideoOverlay media={media} controls={controls} errorMessage={errorMessage} onPlay={actions.togglePlay} />
      {player.interactive && (
        <VideoBar
          media={media}
          actions={actions}
          fullscreen={player.fullscreen}
          pictureInPicture={player.pictureInPicture}
          theater={player.theater}
        />
      )}
    </div>
  );
};

export { Video };
