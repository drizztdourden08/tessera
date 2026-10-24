/* @layer renderer-components @kind component */
import { Tooltip, TooltipContent } from '../Tooltip';
import './OptionTip.css';
import { ReasonTip } from './ReasonTip';
import type { OptionTipProps } from './OptionTip.type';

const OptionTip = (props: OptionTipProps) => {
  const { reason, name, tooltip, placement, children } = props;
  if (reason !== undefined || tooltip === undefined) return <ReasonTip reason={reason}>{children}</ReasonTip>;
  return (
    <Tooltip content={<TooltipContent name={name} description={tooltip.description} shortcut={tooltip.shortcut} />} placement={placement} className="option-tip">
      {children}
    </Tooltip>
  );
};

export { OptionTip };
