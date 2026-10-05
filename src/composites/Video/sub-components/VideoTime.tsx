/* @layer renderer-components @kind component */
import { formatTime } from '../behavior/format-time';
import { hasTimeline } from '../behavior/has-timeline';
import { Span } from '../../../primitives/text-elements';
import './VideoTime.css';
import type { VideoTimeProps } from './VideoTime.type';

const VideoTime = (props: VideoTimeProps) => {
  const { currentTime, duration } = props;
  return (
    <Span className="video-time">
      <Span className="video-time__current">{formatTime(currentTime)}</Span>
      {hasTimeline(duration) && <Span className="video-time__total">{` / ${formatTime(duration)}`}</Span>}
    </Span>
  );
};

export { VideoTime };
