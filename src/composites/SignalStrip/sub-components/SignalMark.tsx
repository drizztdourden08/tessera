/* @layer renderer-components @kind component */
import { Avatar } from '../../../primitives/Avatar';
import { Icon } from '../../../primitives/Icon';
import type { SignalMark as SignalMarkValue } from '../SignalStrip.type';

const SignalMark = ({ mark }: { mark: SignalMarkValue }) =>
  mark.avatar === undefined ? <Icon name={mark.icon} size={12} aria-hidden /> : <Avatar size="xs" {...mark.avatar} />;

export { SignalMark };
