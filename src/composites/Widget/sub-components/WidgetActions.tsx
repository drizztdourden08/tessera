/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Glyph } from '../../../primitives/Glyph';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { PinMenu } from './PinMenu';
import { PopButton } from './PopButton';
import type { WidgetActionsProps } from './WidgetActions.type';

const WidgetActions = (props: WidgetActionsProps) => {
  const { mode, pin, onPinChange, titleBarActions, onPopOut, canPopOut, options, onClose } = props;
  const { common } = useTesseraStrings();
  const out = mode === 'out';

  return (
    <Box className="widget__titlebar-actions">
      {titleBarActions}
      {out && onPinChange && <PinMenu pin={pin ?? 'off'} onChange={onPinChange} />}
      <PopButton out={out} canPopOut={canPopOut ?? true} onPopOut={onPopOut} />
      {options}
      <IconButton className="widget__btn" label={common.close} title={common.close} onClick={onClose}>
        <Glyph name="close" size={14} />
      </IconButton>
    </Box>
  );
};

export { WidgetActions };
