/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Glyph } from '../../../primitives/Glyph';
import { HIT_AREA_CLASS } from '../../../primitives/dom/hit-area.constants';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { PinMenu } from './PinMenu';
import { PopButton } from './PopButton';
import type { WidgetActionsProps } from './WidgetActions.type';

const WidgetActions = (props: WidgetActionsProps) => {
  const { mode, pin, onPinChange, titleBarActions, onPopOut, canPopOut, options, onClose, name } = props;
  const { widgets } = useTesseraStrings();
  const close = widgets.closeNamed(name);
  const out = mode === 'out';

  return (
    <Box className="widget__titlebar-actions">
      {titleBarActions}
      {out && onPinChange && <PinMenu pin={pin ?? 'off'} onChange={onPinChange} />}
      <PopButton out={out} canPopOut={canPopOut ?? true} onPopOut={onPopOut} name={name} />
      {options}
      <IconButton className={`widget__btn ${HIT_AREA_CLASS}`} label={close} title={close} onClick={onClose}>
        <Glyph name="close" size={14} />
      </IconButton>
    </Box>
  );
};

export { WidgetActions };
