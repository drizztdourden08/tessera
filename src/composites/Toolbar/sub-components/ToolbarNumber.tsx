/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Box } from '../../../primitives/Box';
import { Tooltip, TooltipContent } from '../../../primitives/Tooltip';
import { NumberField } from '../../NumberField';
import { isContextKey } from '../behavior/is-context-key';
import { numberClass } from '../behavior/number-class';
import { ToolbarContext } from '../behavior/toolbar-context';
import { STOP_ATTRIBUTE, TIP_SIDE } from '../Toolbar.constants';
import { ToolbarRowKeys } from './ToolbarRowKeys';
import { ToolbarRowText } from './ToolbarRowText';
import type { ToolbarNumberProps } from './ToolbarItemView.type';

const ToolbarNumber = ({ item, onContext }: ToolbarNumberProps) => {
  const { orientation, layout, size, stop, measure } = useContext(ToolbarContext);
  const field = (
    <NumberField
      size={size === 'md' ? 'md' : 'sm'}
      className={numberClass(item)}
      value={item.value}
      min={item.min}
      max={item.max}
      step={item.step}
      fineStep={item.fineStep}
      ladder={item.ladder}
      presets={item.presets}
      suffix={item.suffix}
      scrub={item.scrub}
      label={item.showLabel === true ? item.label : undefined}
      mixed={item.mixed}
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
