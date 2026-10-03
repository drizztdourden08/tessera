/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Glyph } from '../../../primitives/Glyph';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { PinButton } from './PinButton';
import { PopButton } from './PopButton';
import type { WidgetActionsProps } from './WidgetActions.type';

const WidgetActions = (props: WidgetActionsProps) => {
  const { mode, pin, onTop, onPinChange, onPopOut, canPopOut, optionsOpen, onOpenOptions, onClose } = props;
  const { common } = useTesseraStrings();
  const out = mode === 'out';

  return (
    <Box className="widget__titlebar-actions">
      {out && onPinChange && <PinButton pin={pin ?? 'off'} onTop={onTop ?? false} onChange={onPinChange} />}
      <PopButton out={out} canPopOut={canPopOut ?? true} onPopOut={onPopOut} />
      <IconButton
        className="widget__btn"
        label={common.options}
        title={common.options}
        active={optionsOpen ?? false}
        onClick={(e) => onOpenOptions(e.currentTarget)}
      >
        <Icon name="settings" size={14} />
      </IconButton>
      <IconButton className="widget__btn" label={common.close} title={common.close} onClick={onClose}>
        <Glyph name="close" size={14} />
      </IconButton>
    </Box>
  );
};

export { WidgetActions };
