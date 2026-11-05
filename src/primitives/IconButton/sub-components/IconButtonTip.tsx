/* @layer renderer-components @kind component */
import { Tooltip } from '../../Tooltip';
import type { IconButtonTipProps } from './IconButtonTip.type';

const IconButtonTip = (props: IconButtonTipProps) => {
  const { tooltip, placement, children } = props;
  if (tooltip == null) return <>{children}</>;
  return <Tooltip content={tooltip} placement={placement}>{children}</Tooltip>;
};

export {
  IconButtonTip,
};
