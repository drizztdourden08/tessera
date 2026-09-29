/* @layer renderer-components @kind component */
import { formatTime } from '../behavior/format-time';
import { hasTimeline } from '../behavior/has-timeline';
import './VideoTime.css';
import type { VideoTimeProps } from './VideoTime.type';

const VideoTime = (props: VideoTimeProps) => {
  const { currentTime, duration } = props;
  return (
    <span className="video-time">
      <span className="video-time__current">{formatTime(currentTime)}</span>
      {hasTimeline(duration) && <span className="video-time__total">{` / ${formatTime(duration)}`}</span>}
    </span>
  );
};

export { VideoTime };
