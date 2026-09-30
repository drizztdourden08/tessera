/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Glyph } from '../../../primitives/Glyph';
import { IconButton } from '../../../primitives/IconButton';
import { PinButton } from './PinButton';
import { PopButton } from './PopButton';
import type { WidgetActionsProps } from './WidgetActions.type';

const WidgetActions = (props: WidgetActionsProps) => {
  const { mode, pin, onTop, onPinChange, onPopOut, canPopOut, optionsOpen, onOpenOptions, onClose } = props;
  const out = mode === 'out';

  return (
    <Box className="widget__titlebar-actions">
      {out && onPinChange && <PinButton pin={pin ?? 'off'} onTop={onTop ?? false} onChange={onPinChange} />}
      <PopButton out={out} canPopOut={canPopOut ?? true} onPopOut={onPopOut} />
      <IconButton
        className="widget__btn"
        label="Options"
        title="Options"
        active={optionsOpen ?? false}
        onClick={(e) => onOpenOptions(e.currentTarget)}
      >
        <Glyph name="gear" size={14} />
      </IconButton>
      <IconButton className="widget__btn" label="Close" title="Close" onClick={onClose}>
        <Glyph name="close" size={14} />
      </IconButton>
    </Box>
  );
};

export { WidgetActions };
