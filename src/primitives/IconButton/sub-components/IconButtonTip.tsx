/* @layer renderer-components @kind component */
import type { ReactNode } from 'react';
import { Tooltip } from '../../Tooltip';
import type { TooltipPlacement } from '../../Tooltip/Tooltip.type';

interface IconButtonTipProps {
  tooltip?: ReactNode;
  placement?: TooltipPlacement;
  children: ReactNode;
}

const IconButtonTip = (props: IconButtonTipProps) => {
  const { tooltip, placement, children } = props;
  if (tooltip == null) return <>{children}</>;
  return <Tooltip content={tooltip} placement={placement}>{children}</Tooltip>;
};

export {
  IconButtonTip,
};
