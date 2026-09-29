/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { IconButton } from '../../IconButton';
import type { VideoScreenButtonsProps } from './VideoBar.type';

const VideoScreenButtons = (props: VideoScreenButtonsProps) => {
  const { fullscreen, pictureInPicture, theater } = props;
  return (
    <>
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
      <IconButton
        className="video-bar__button"
        label={theater.active ? 'Exit theater mode' : 'Theater mode'}
        active={theater.active}
        onClick={theater.toggle}
      >
        <Icon name="rectangle-horizontal" size={18} />
      </IconButton>
      {fullscreen.supported && (
        <IconButton className="video-bar__button" label={fullscreen.active ? 'Exit full screen' : 'Full screen'} onClick={fullscreen.toggle}>
          <Icon name={fullscreen.active ? 'minimize-2' : 'maximize-2'} size={18} />
        </IconButton>
      )}
    </>
  );
};

export { VideoScreenButtons };
