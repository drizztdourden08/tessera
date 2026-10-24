/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Icon } from '../../primitives/Icon';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../primitives/text-elements';
import type { DropPopZoneProps } from './DropPopZone.type';
import './DropPopZone.css';

const DropPopZone = (props: DropPopZoneProps) => {
  const { stays = false, label, icon, tone = 'pop' } = props;
  const { widgets } = useTesseraStrings();
  const classes = `dock-layout__popzone${stays ? ' dock-layout__popzone--stays' : ''}${tone === 'basket' ? ' dock-layout__popzone--basket' : ''}`;
  return (
    <Box className={classes} aria-hidden="true">
      {icon && <Icon name={icon} size={20} className="dock-layout__popzone-icon" />}
      <Span className="dock-layout__popzone-label">{label ?? (stays ? widgets.hintStays : widgets.hintPopOut)}</Span>
    </Box>
  );
};

export { DropPopZone };
