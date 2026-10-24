/* @layer renderer-components @kind component */
import { Tooltip, TooltipContent } from '../../Tooltip';
import type { CheckboxTipProps } from './CheckboxTip.type';

const CheckboxTip = (props: CheckboxTipProps) => {
  const { tooltip, name, children } = props;
  if (tooltip === undefined) return <>{children}</>;
  const content = typeof tooltip === 'string' ? tooltip : <TooltipContent name={name} description={tooltip.description} shortcut={tooltip.shortcut} />;
  return <Tooltip content={content}>{children}</Tooltip>;
};

export { CheckboxTip };
