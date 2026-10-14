/* @layer renderer-components @kind component */
import { Tooltip } from '../Tooltip';
import type { ReasonTipProps } from './ReasonTip.type';
import './ReasonTip.css';

const ReasonTip = (props: ReasonTipProps) => {
  const { reason, children } = props;
  if (reason === undefined) return <>{children}</>;
  return <Tooltip content={reason} follow="pointer" className="reason-tip">{children}</Tooltip>;
};

export { ReasonTip };
