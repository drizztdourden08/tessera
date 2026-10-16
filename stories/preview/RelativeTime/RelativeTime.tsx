/* @layer stories @kind component */
import { Time, Tooltip } from '../../../src/primitives';
import { relativeTimeText } from './behavior/relative-time-text';
import { useMinute } from './behavior/useMinute';
import { TIME_STRINGS } from './relative-time.constants';
import type { RelativeTimeProps } from './RelativeTime.type';

const RelativeTime = (props: RelativeTimeProps) => {
  const { value, format = 'long', strings, focusable, className } = props;
  const now = useMinute();
  const time = relativeTimeText(value, now, format, { ...TIME_STRINGS, ...strings });
  return (
    <Tooltip content={time.full} focusable={focusable} className={className}>
      <Time dateTime={time.iso}>{time.text}</Time>
    </Tooltip>
  );
};

export { RelativeTime };
