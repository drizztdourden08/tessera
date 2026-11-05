/* @layer renderer-components @kind component */
import type { AvatarStatusDotProps } from './AvatarStatusDot.type';

const AvatarStatusDot = (props: AvatarStatusDotProps) => {
  const { status = 'none' } = props;
  return status === 'none' ? null : <span className={`avatar__status avatar__status--${status}`} aria-hidden="true" />;
};

export { AvatarStatusDot };
