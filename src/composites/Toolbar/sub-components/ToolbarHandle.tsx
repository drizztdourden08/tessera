/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Tooltip } from '../../../primitives/Tooltip';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ToolbarContext } from '../behavior/toolbar-context';
import { HANDLE_STOP, STOP_ATTRIBUTE, TIP_SIDE } from '../Toolbar.constants';
import type { ToolbarHandleViewProps } from './ToolbarHandle.type';

const ToolbarHandle = ({ handleProps }: ToolbarHandleViewProps) => {
  const { toolbar } = useTesseraStrings();
  const { orientation, size, stop, measure } = useContext(ToolbarContext);
  const own = measure
    ? { tabIndex: -1 }
    : { tabIndex: stop === HANDLE_STOP ? 0 : -1, [STOP_ATTRIBUTE]: HANDLE_STOP };
  const button = (
    <IconButton
      variant="ghost"
      size={size}
      label={toolbar.handle}
      {...(measure ? {} : handleProps)}
      {...own}
      className={['toolbar__handle', handleProps?.className].filter(Boolean).join(' ')}
    >
      <Icon name={orientation === 'horizontal' ? 'grip-vertical' : 'grip-horizontal'} size={14} />
    </IconButton>
  );
  if (measure) return button;
  return <Tooltip content={toolbar.handle} placement={TIP_SIDE[orientation]}>{button}</Tooltip>;
};

export { ToolbarHandle };
