/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { NumberInput } from '../../../primitives/NumberInput';
import { Tooltip } from '../../../primitives/Tooltip';
import { ToolbarContext } from '../behavior/toolbar-context';
import { STOP_ATTRIBUTE, TIP_SIDE } from '../Toolbar.constants';
import { ToolbarTip } from './ToolbarTip';
import type { ToolbarNumberProps } from './ToolbarItemView.type';

const ToolbarNumber = ({ item }: ToolbarNumberProps) => {
  const { orientation, size, stop, measure } = useContext(ToolbarContext);
  const field = (
    <NumberInput
      size={size === 'md' ? 'md' : 'sm'}
      className="toolbar__number"
      value={item.value}
      min={item.min}
      max={item.max}
      step={item.step}
      disabled={item.disabled}
      aria-label={item.label}
      tabIndex={measure || stop !== item.id ? -1 : 0}
      {...{ [STOP_ATTRIBUTE]: measure ? undefined : item.id }}
      onChange={item.onChange}
    />
  );
  if (measure) return field;
  const tip = <ToolbarTip name={item.label} description={item.description} shortcut={item.shortcut} />;
  return <Tooltip content={tip} placement={TIP_SIDE[orientation]}>{field}</Tooltip>;
};

export { ToolbarNumber };
