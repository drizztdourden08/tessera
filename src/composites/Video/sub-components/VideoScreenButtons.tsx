/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { VideoScreenButtonsProps } from './VideoBar.type';

const VideoScreenButtons = (props: VideoScreenButtonsProps) => {
  const { fullscreen, pictureInPicture, theater } = props;
  const { video } = useTesseraStrings();
  return (
    <>
      {pictureInPicture.supported && (
        <IconButton
          className="video-bar__button"
          label={pictureInPicture.active ? video.exitPictureInPicture : video.pictureInPicture}
          active={pictureInPicture.active}
          onClick={pictureInPicture.toggle}
        >
          <Icon name="picture-in-picture-2" size={18} />
        </IconButton>
      )}
      <IconButton
        className="video-bar__button"
        label={theater.active ? video.exitTheaterMode : video.theaterMode}
        active={theater.active}
        onClick={theater.toggle}
      >
        <Icon name="rectangle-horizontal" size={18} />
      </IconButton>
      {fullscreen.supported && (
        <IconButton className="video-bar__button" label={fullscreen.active ? video.exitFullScreen : video.fullScreen} onClick={fullscreen.toggle}>
          <Icon name={fullscreen.active ? 'minimize-2' : 'maximize-2'} size={18} />
        </IconButton>
      )}
    </>
  );
};

export { VideoScreenButtons };
