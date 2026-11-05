/* @layer renderer-components @kind component */
import { BrandMark } from '../../../brand';
import { Avatar } from '../../../primitives/Avatar';
import { Icon } from '../../../primitives/Icon';
import type { SignalMark as SignalMarkValue } from '../SignalStrip.type';

const SignalMark = ({ mark }: { mark: SignalMarkValue }) => {
  if (mark.brand !== undefined) return <BrandMark app={mark.brand} size="sm" className="signal-mark-brand" />;
  if (mark.avatar !== undefined) return <Avatar size="xs" {...mark.avatar} className="signal-mark-avatar" />;
  return <Icon name={mark.icon} size={12} aria-hidden />;
};

export { SignalMark };
