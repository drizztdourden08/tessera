/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Box } from '../../../primitives/Box';
import { NumberInput } from '../../../primitives/NumberInput';
import { Tooltip, TooltipContent } from '../../../primitives/Tooltip';
import { isContextKey } from '../behavior/is-context-key';
import { ToolbarContext } from '../behavior/toolbar-context';
import { STOP_ATTRIBUTE, TIP_SIDE } from '../Toolbar.constants';
import { ToolbarRowKeys } from './ToolbarRowKeys';
import { ToolbarRowText } from './ToolbarRowText';
import type { ToolbarNumberProps } from './ToolbarItemView.type';

const ToolbarNumber = ({ item, onContext }: ToolbarNumberProps) => {
  const { orientation, layout, size, stop, measure } = useContext(ToolbarContext);
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
      onContextMenu={onContext}
      onKeyDown={onContext && ((event) => { if (isContextKey(event)) onContext(event); })}
    />
  );
  if (measure) return field;
  if (layout === 'list') {
    return (
      <Box className="toolbar__field-row">
        <ToolbarRowText label={item.label} description={item.description} />
        <ToolbarRowKeys shortcut={item.shortcut} />
        {field}
      </Box>
    );
  }
  const tip = <TooltipContent name={item.label} description={item.description} shortcut={item.shortcut} />;
  return <Tooltip content={tip} placement={TIP_SIDE[orientation]}>{field}</Tooltip>;
};

export { ToolbarNumber };
